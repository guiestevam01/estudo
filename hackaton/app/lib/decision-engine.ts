/**
 * Decision Engine - Semáforo de Decisão Logística
 * Analisa pedidos e retorna recomendações de ação para SAC
 */

import type { OrderWithTransmission } from './anymarket';

export type DecisionStatus = 'SAFE_REFUND' | 'BLOCKED' | 'WARNING';
export type BadgeColor = 'success' | 'destructive' | 'warning';

export interface OrderDecision {
  orderId: string;
  status: DecisionStatus;
  color: BadgeColor;
  label: string;
  recommendation: string;
  description: string;
  canRefund: boolean;
}

/**
 * Analisa um pedido e retorna a decisão visual e recomendação de ação
 *
 * LÓGICA:
 * - VERDE (Safe Refund): PAID + sem invoice + transmissionStatus === 'ERROR'
 *   → Ação: "Reembolso Imediato"
 *
 * - VERMELHO (Bloqueado): invoice existe OU status === 'SHIPPED'
 *   → Ação: "Produto Faturado/Despachado - Não Reembolsar"
 *
 * - LARANJA (Aviso): PAID mas sem erro de transmissão, apenas pendente
 *   → Ação: "Aguardar Logística"
 */
export function getSlaHours(mp?: string | null, type?: string | null, ful?: boolean) {
  const marketplace = (mp ?? '').toString();
  const orderType = type ?? null;
  const fullfillment = Boolean(ful);

  if (marketplace === 'MERCADO_LIVRE') {
    if (fullfillment || orderType === 'FULL') return 24;
    return 48;
  }
  if (marketplace === 'SHOPEE') return 48;
  if (marketplace === 'AMAZON_GLOBAL_API') return 24;
  if (marketplace === 'NETSHOES') return 72;
  if (marketplace === 'RENNER') return 72;
  if (marketplace === 'TIKTOK_SHOP') return 48;
  return 48; // default
}

export function analyzeOrder(order: OrderWithTransmission): OrderDecision {
  // New SLA-based decision logic based on shipmentStatusInMarketPlace,
  // marketPlace, orderTypeName and fulfillment. Ignore any `error` field.
  const mp = (order.marketPlace ?? order.marketPlaceUrl ?? '').toString();
  const type = order.orderTypeName ?? null;
  const shipment = order.shipmentStatusInMarketPlace ?? order.transmissionStatus?.transmissionStatus ?? null;

  // If marketplace already marked ready_to_ship -> pronto para despacho
  if (shipment === 'ready_to_ship' || shipment === 'READY_TO_SHIP') {
    return {
      orderId: order.id,
      status: 'SAFE_REFUND',
      color: 'success',
      label: 'Pronto',
      recommendation: 'Aguardando Coleta',
      description: 'Marketplace sinalizou ready_to_ship',
      canRefund: false,
    };
  }

  // compute SLA hours using exported helper
  const sla = getSlaHours(mp, type, Boolean(order.fulfillment));
  const created = order.createdAt;
  const createdTs = created ? new Date(created).getTime() : null;
  const now = Date.now();
  const hoursElapsed = createdTs ? (now - createdTs) / (1000 * 60 * 60) : 0;

  if (hoursElapsed > sla) {
    const overduHours = Math.round(hoursElapsed - sla);
    return {
      orderId: order.id,
      status: 'BLOCKED',
      color: 'destructive',
      label: `Atrasado ${overduHours}h`,
      recommendation: 'Despachar Agora',
      description: `Atraso de ${overduHours}h (SLA ${sla}h)`,
      canRefund: false,
    };
  }

  if (hoursElapsed >= sla * 0.75) {
    const remainingHours = Math.round(sla - hoursElapsed);
    return {
      orderId: order.id,
      status: 'WARNING',
      color: 'warning',
      label: `${remainingHours}h restantes`,
      recommendation: 'Preparar Envio',
      description: `Tempo decorrido ${Math.floor(hoursElapsed)}h de ${sla}h (75%)`,
      canRefund: false,
    };
  }

  const remainingHours = Math.round(sla - hoursElapsed);
  return {
    orderId: order.id,
    status: 'SAFE_REFUND',
    color: 'success',
    label: 'No Prazo',
    recommendation: `${remainingHours}h para despachar`,
    description: `Tempo decorrido ${Math.floor(hoursElapsed)}h de ${sla}h`,
    canRefund: false,
  };
}

/**
 * Agrupa pedidos por categoria de decisão
 * Útil para métricas e resumos
 */
export function categorizeOrders(orders: OrderWithTransmission[]) {
  const decisions = orders.map((order) => analyzeOrder(order));

  return {
    safeRefunds: decisions.filter((d) => d.status === 'SAFE_REFUND').length,
    blocked: decisions.filter((d) => d.status === 'BLOCKED').length,
    warnings: decisions.filter((d) => d.status === 'WARNING').length,
    total: decisions.length,
    refundableTotal: orders
      .filter((order) => analyzeOrder(order).canRefund)
      .reduce((sum, order) => {
        const firstItem = order.items[0];
        const price = typeof firstItem?.price === 'number' ? firstItem.price : 0;
        const qty = typeof firstItem?.quantity === 'number' ? firstItem.quantity : 0;
        return sum + price * qty;
      }, 0),
  };
}
