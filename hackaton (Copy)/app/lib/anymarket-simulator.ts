/**
 * Simulador da API da Anymarket para o MVP do Dashboard de Despacho Crocs
 */

import type { OrderWithTransmission } from "./anymarket";

const marketplaces = [
  "Mercado Livre",
  "TikTok Shop",
  "Shopee",
  "Amazon",
  "AliExpress",
];

const buyerNames = [
  "João Silva",
  "Maria Santos",
  "Pedro Costa",
  "Ana Pereira",
  "Lucas Rocha",
  "Beatriz Lima",
  "Mariana Sousa",
  "Rafael Alves",
  "Clara Ferreira",
  "Mateus Gonçalves",
  "Fernanda Carvalho",
  "Bruno Lima",
  "Larissa Oliveira",
  "Gustavo Almeida",
  "Carla Mendes",
  "Vitor Souza",
  "Patrícia Araújo",
  "Eduardo Fernandes",
  "Juliana Gomes",
  "Marcos Pinto",
];

const crocsSkus = [
  { partnerId: "CROCS-CLASSIC-CLOG", name: "Crocs Classic Clog" },
  { partnerId: "CROCS-LITERIDE", name: "Crocs LiteRide" },
  { partnerId: "CROCS-BAYA", name: "Crocs Baya" },
  { partnerId: "CROCS-KIDS-HANDLE", name: "Crocs Kids Handle" },
];

const sizes = ["35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];

const orderStatuses = [
  "PAID",
  "PAID",
  "PAID",
  "INVOICED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
] as const;

type OrderStatus = (typeof orderStatuses)[number];

interface AnyMarketOrder {
  id: number;
  marketPlaceId: string;
  marketPlaceNumber: string;
  createdAt: string;
  status: OrderStatus;
  invoice: {
    number: string;
    issueDate: string;
    series: string;
  } | null;
  items: Array<{
    sku: {
      id: string;
      name: string;
      partnerId: string;
    };
    amount: number;
    unit: string;
    total: number;
  }>;
  buyer: {
    name: string;
    email: string;
  };
  marketPlaceUrl: string;
}

function randomFrom<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function randomCreatedAt(base: number) {
  const offsetHours = Math.floor(Math.random() * 90 * 24);
  return new Date(base - offsetHours * 60 * 60 * 1000).toISOString();
}

function createInvoice(index: number, now: number) {
  return {
    number: `NF-${1000 + index}`,
    issueDate: randomCreatedAt(now),
    series: "1",
  };
}

export function generateMockOrders(count = 30): AnyMarketOrder[] {
  const now = Date.now();
  const orders: AnyMarketOrder[] = [];

  for (let index = 0; index < count; index += 1) {
    const marketplace = randomFrom(marketplaces);
    const buyerName = randomFrom(buyerNames);
    const skuTemplate = randomFrom(crocsSkus);
    const size = randomFrom(sizes);
    const status = randomFrom(orderStatuses);
    const amount = 1 + Math.floor(Math.random() * 3);
    const basePrice = 40 + Math.floor(Math.random() * 5) * 5 + Math.random() * 4;
    const price = Number(basePrice.toFixed(2));

    const invoice = status === "SHIPPED" || status === "INVOICED" || status === "DELIVERED"
      ? createInvoice(index, now)
      : null;

    orders.push({
      id: 1000 + index,
      marketPlaceId: `ORD-${1000 + index}-${marketplace.replace(/\s+/g, "").toUpperCase()}`,
      marketPlaceNumber: `MP${1000 + index}`,
      createdAt: randomCreatedAt(now),
      status,
      invoice,
      items: [
        {
          sku: {
            id: `${skuTemplate.partnerId}-${size}`,
            name: `${skuTemplate.name} - Size ${size}`,
            partnerId: skuTemplate.partnerId,
          },
          amount,
          unit: "UN",
          total: Number((price * amount).toFixed(2)),
        },
      ],
      buyer: {
        name: buyerName,
        email: `${buyerName.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      },
      marketPlaceUrl: marketplace,
    });
  }

  return orders;
}

export interface MockTransmissionStatusResponse {
  success: boolean;
  errorMessage: string | null;
  marketPlaceStatus: string;
  transmissionStatus?: string | null;
}

export function getMockTransmissionStatus(
  _marketPlaceId: string,
  status: OrderStatus,
): MockTransmissionStatusResponse {
  const roll = Math.random();

  if (roll < 0.3) {
    return {
      success: false,
      errorMessage: "Configuração da Tray não encontrada",
      marketPlaceStatus: status,
      transmissionStatus: "ERROR",
    };
  }

  if (roll < 0.7) {
    return {
      success: true,
      errorMessage: null,
      marketPlaceStatus: randomFrom(["SHIPPED", "INVOICED"]),
      transmissionStatus: "SUCCESS",
    };
  }

  return {
    success: true,
    errorMessage: null,
    marketPlaceStatus: "PAID",
    transmissionStatus: "WAITING_SYNC",
  };
}

export async function fetchOrdersDashboard(): Promise<OrderWithTransmission[]> {
  try {
    const appId = import.meta.env.VITE_ANYMARKET_APP_ID || "COLOQUE_SEU_APP_ID_AQUI"; // Fornecido pela AnyMarket
    const token = import.meta.env.VITE_ANYMARKET_TOKEN || "COLOQUE_SEU_TOKEN_AQUI"; // Token do lojista Crocs
    const baseUrl = "https://api.anymarket.com.br/marketplace/api";

    const headers = {
      appId,
      token,
      "Content-Type": "application/json",
    };

    if (!import.meta.env.VITE_ANYMARKET_APP_ID || !import.meta.env.VITE_ANYMARKET_TOKEN) {
      console.warn(
        "AnyMarket credentials are not set in environment variables. Using placeholder values.",
      );
    }

    const response = await fetch(`${baseUrl}/orders?status=PAID`, { headers });
    if (!response.ok) {
      console.error("AnyMarket orders fetch failed", response.status, response.statusText);
      return [];
    }

    const data = await response.json();
    const orders: AnyMarketOrder[] = Array.isArray(data?.content) ? data.content : [];

    if (!orders.length) {
      console.warn("AnyMarket orders response returned no content or invalid structure", data);
      return [];
    }

    const ordersWithTransmission = await Promise.all(
      orders.map(async (order) => {
        try {
          const transResponse = await fetch(
            `${baseUrl}/orders/${order.marketPlaceId}/transmissionStatus`,
            { headers },
          );

          if (!transResponse.ok) {
            console.error(
              "AnyMarket transmission status fetch failed for order",
              order.marketPlaceId,
              transResponse.status,
              transResponse.statusText,
            );
            return {
              ...order,
              transmissionStatus: {
                orderId: order.marketPlaceId,
                transmissionStatus: null,
                errorMessage: "Falha ao buscar diagnóstico de transmissão",
                lastAttempt: new Date().toISOString(),
              },
            } as OrderWithTransmission;
          }

          const transData = await transResponse.json();

          return {
            ...order,
            transmissionStatus: {
              orderId: order.marketPlaceId,
              transmissionStatus: transData?.transmissionStatus ?? null,
              errorMessage: transData?.errorMessage ?? null,
              lastAttempt: new Date().toISOString(),
            },
          } as OrderWithTransmission;
        } catch (error) {
          console.error("Error fetching transmission status for order", order.marketPlaceId, error);
          return {
            ...order,
            transmissionStatus: {
              orderId: order.marketPlaceId,
              transmissionStatus: null,
              errorMessage: "Erro de comunicação com AnyMarket",
              lastAttempt: new Date().toISOString(),
            },
          } as OrderWithTransmission;
        }
      }),
    );

    return ordersWithTransmission;
  } catch (error) {
    console.error("Anymarket dashboard fetch failed", error);
    return [];
  }
}
