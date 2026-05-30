/**
 * Tipos simplificados e alinhados para integração com o endpoint
 * `POST https://app.anymarket.com.br/rest/api/orders/new`
 */

export interface OrderItem {
  sku: {
    id: string;
    name?: string;
    partnerId?: string;
  };
  quantity?: number;
  price?: number;
}

export interface OrderInvoice {
  number: string;
  issueDate?: string;
  series?: string;
}

export interface Order {
  id: string;
  marketPlaceId?: string;
  marketPlaceNumber?: string;
  marketPlaceUrl?: string;
  value?: number;
  status?: string;
  invoice?: OrderInvoice | null;
  items: OrderItem[];
  createdAt?: string;
  createdDate?: string;
  buyer?: {
    name?: string;
    email?: string;
  };
}

export interface TransmissionStatus {
  orderId: string;
  transmissionStatus: string | null;
  errorMessage?: string | null;
  lastAttempt?: string;
}

export interface OrderWithTransmission extends Order {
  transmissionStatus: TransmissionStatus;
  shipmentStatusInMarketPlace?: string | null;
  orderTypeName?: string | null;
  fulfillment?: boolean;
  marketPlace?: string | null;
}

export interface DateFilter {
  dateStart: Date;
  dateEnd: Date;
}

export async function fetchOrdersDashboard(filter?: DateFilter): Promise<OrderWithTransmission[]> {
  const gumgaToken = (typeof process !== 'undefined' && process.env && process.env.VITE_ANYMARKET_GUMGA_TOKEN)
    ? process.env.VITE_ANYMARKET_GUMGA_TOKEN
    : (typeof import.meta !== 'undefined' ? (import.meta as any).env?.VITE_ANYMARKET_GUMGA_TOKEN : undefined);

  if (!gumgaToken) {
    console.warn('VITE_ANYMARKET_GUMGA_TOKEN não definido — retornando lista vazia');
    return [];
  }

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const dateEnd = filter?.dateEnd ?? now;
  const dateStart = filter?.dateStart ?? thirtyDaysAgo;

  // API expects dateEnd with time 02:59:59.999 (UTC-3 midnight) and
  // dateStart with time 03:00:00.000 — we preserve exact ms from user input
  const url = 'https://app.anymarket.com.br/rest/api/orders/new';
  const bodyPayload = {
    dateEnd: dateEnd.toISOString(),
    dateStart: dateStart.toISOString(),
    marketplaces: [],
    orderStatus: ['PENDING', 'PAID_WAITING_SHIP'],
    transmissionStatus: ['OK', 'WAITING'],
    accounts: [],
    idInMarketPlace: '',
    orderNumberInMarketPlace: '',
    buyerInMarketPlace: '',
    idInClient: '',
    clientSalesOrderId: '',
    documentNumber: '',
    invoiceNumber: '',
    invoiceKey: '',
    carrier: '',
    trackingNumber: '',
    fulfillment: [],
    fieldsMetaData: [],
    deliveryStatus: [],
    returnTypes: [],
    buyerDocumentTypes: [],
    discountTypes: [],
    orderTypeName: [],
    pageStart: 0,
    pageSize: 200,
    sortDir: 'desc',
  };

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        gumgaToken: String(gumgaToken),
      },
      body: JSON.stringify(bodyPayload),
    });

    if (!resp.ok) {
      console.error('Transmissions API returned non-ok status', resp.status);
      return [];
    }

    const data = await resp.json();
    const values: any[] = Array.isArray(data?.values) ? data.values : [];

    if (!values.length) return [];

    const mapped: OrderWithTransmission[] = values.map((item: any) => ({
      id: String(item.id),
      marketPlaceId: item.idInMarketPlace ?? item.marketPlace ?? undefined,
      marketPlaceNumber: item.orderNumberInMarketPlace ?? undefined,
      marketPlaceUrl: item.marketPlace ?? undefined,
      marketPlace: item.marketPlace ?? undefined,
      shipmentStatusInMarketPlace: item.shipmentStatusInMarketPlace ?? null,
      orderTypeName: item.orderTypeName ?? null,
      fulfillment: typeof item.fulfillment === 'boolean' ? item.fulfillment : Boolean(item.fulfillment),
      status: item.status ?? item.statusInMarketPlace ?? undefined,
      value: typeof item.value === 'number' ? item.value : item.value ? Number(item.value) : undefined,
      items: [],
      createdAt: item.creation ?? item.createdAt ?? undefined,
      buyer: { name: item.buyerName ?? item.buyer?.name ?? undefined },
      transmissionStatus: {
        orderId: String(item.id),
        transmissionStatus: item.transmissionStatus ?? null,
        errorMessage: item.error?.message ?? null,
        lastAttempt: new Date().toISOString(),
      },
    }));

    return mapped;
  } catch (error) {
    console.error('Erro ao buscar transmissions advanced', error);
    return [];
  }
}

export const fetchOrdersWithTransmission = fetchOrdersDashboard;