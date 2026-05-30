/**
 * Decision Engine - Semáforo de Decisão Logística
 * Analisa pedidos e retorna recomendações de despacho por marketplace
 */

import type { OrderWithTransmission } from './anymarket';
import { loadSlaConfig } from './sla-store';

export type DecisionStatus = 'SAFE_REFUND' | 'BLOCKED' | 'WARNING';
export type BadgeColor = 'success' | 'destructive' | 'warning';

export interface OrderDecision {
  orderId: string;
  status: DecisionStatus;
  color: BadgeColor;
  label: string;
  recommendation: string;
  description: string;
  dispatchDeadline: string;
  canRefund: boolean;
}

export function getSlaHours(mp?: string | null, type?: string | null, ful?: boolean): number {
  const config = loadSlaConfig();
  const marketplace = (mp ?? '').toString();
  const orderType = type ?? null;
  const fulfillment = Boolean(ful);

  if (marketplace === 'MERCADO_LIVRE') {
    if (fulfillment || orderType === 'FULL') return config.MERCADO_LIVRE_FULL;
    return config.MERCADO_LIVRE_CROSS_DOCKING;
  }
  if (marketplace === 'SHOPEE') return config.SHOPEE;
  if (marketplace === 'AMAZON_GLOBAL_API') return config.AMAZON_GLOBAL_API;
  if (marketplace === 'NETSHOES') return config.NETSHOES;
  if (marketplace === 'RENNER') return config.RENNER;
  if (marketplace === 'TIKTOK_SHOP') return config.TIKTOK_SHOP;
  return config.DEFAULT;
}

export function analyzeOrder(order: OrderWithTransmission): OrderDecision {
  const mp = (order.marketPlace ?? order.marketPlaceUrl ?? '').toString();
  const type = order.orderTypeName ?? null;
  const shipment = order.shipmentStatusInMarketPlace ?? null;
  const isReadyToShip = shipment === 'ready_to_ship' || shipment === 'READY_TO_SHIP';
  const isPending = shipment === 'pending' || shipment === 'PENDING' || !shipment;

  const sla = getSlaHours(mp, type, Boolean(order.fulfillment));
  const createdTs = order.createdAt ? new Date(order.createdAt).getTime() : null;

  if (!createdTs) {
    return {
      orderId: order.id,
      status: 'WARNING',
      color: 'warning',
      label: 'Sem data',
      recommendation: 'Verificar pedido',
      description: 'Data de criação não encontrada — verificar no marketplace',
      dispatchDeadline: '—',
      canRefund: false,
    };
  }

  const now = Date.now();
  const hoursElapsed = (now - createdTs) / 3600000;
  const dispatchDeadline = new Date(createdTs + sla * 3600000).toLocaleString('pt-BR');

  // PEDIDOS READY_TO_SHIP — coleta pendente, ainda verifica SLA
  if (isReadyToShip) {
    if (hoursElapsed > sla) {
      const overdueHours = Math.round(hoursElapsed - sla);
      return {
        orderId: order.id,
        status: 'BLOCKED',
        color: 'destructive',
        label: `Coleta não realizada — ${overdueHours}h`,
        recommendation: 'Contatar Transportadora',
        description: `Pronto para despacho mas coleta não ocorreu — ${overdueHours}h acima do SLA`,
        dispatchDeadline,
        canRefund: false,
      };
    }

    if (hoursElapsed >= sla * 0.75) {
      const remainingHours = Math.round(sla - hoursElapsed);
      return {
        orderId: order.id,
        status: 'WARNING',
        color: 'warning',
        label: `Coleta em ${remainingHours}h`,
        recommendation: 'Verificar Coleta',
        description: `Pronto para despacho — coleta deve ocorrer em ${remainingHours}h`,
        dispatchDeadline,
        canRefund: false,
      };
    }

    return {
      orderId: order.id,
      status: 'SAFE_REFUND',
      color: 'success',
      label: 'Aguardando Coleta',
      recommendation: 'Aguardando Coleta',
      description: `Pronto para despacho — dentro do SLA (${Math.floor(hoursElapsed)}h de ${sla}h)`,
      dispatchDeadline,
      canRefund: false,
    };
  }

  // PEDIDOS PENDING — ainda não preparados para despacho
  if (isPending) {
    if (hoursElapsed > sla) {
      const overdueHours = Math.round(hoursElapsed - sla);
      return {
        orderId: order.id,
        status: 'BLOCKED',
        color: 'destructive',
        label: `Atrasado ${overdueHours}h`,
        recommendation: 'Despachar Agora',
        description: `Pedido não despachado — ${overdueHours}h acima do SLA de ${sla}h`,
        dispatchDeadline,
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
        description: `Pedido pendente — ${remainingHours}h restantes para o prazo de despacho`,
        dispatchDeadline,
        canRefund: false,
      };
    }

    const remainingHours = Math.round(sla - hoursElapsed);
    return {
      orderId: order.id,
      status: 'SAFE_REFUND',
      color: 'success',
      label: 'No Prazo',
      recommendation: 'Sem ação necessária',
      description: `Pedido dentro do SLA — ${Math.floor(hoursElapsed)}h de ${sla}h decorridas`,
      dispatchDeadline,
      canRefund: false,
    };
  }

  // Fallback para status desconhecido
  return {
    orderId: order.id,
    status: 'WARNING',
    color: 'warning',
    label: 'Status desconhecido',
    recommendation: 'Verificar pedido',
    description: `Status de envio desconhecido: ${shipment}`,
    dispatchDeadline,
    canRefund: false,
  };
}

export function categorizeOrders(orders: OrderWithTransmission[]) {
  const decisions = orders.map((order) => analyzeOrder(order));

  return {
    safeRefunds: decisions.filter((d) => d.status === 'SAFE_REFUND').length,
    blocked: decisions.filter((d) => d.status === 'BLOCKED').length,
    warnings: decisions.filter((d) => d.status === 'WARNING').length,
    total: decisions.length,
    refundableTotal: 0,
  };
}
