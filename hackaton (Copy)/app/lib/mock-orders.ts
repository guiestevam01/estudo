import type { OrderWithTransmission } from './anymarket';

const now = Date.now();

export const MOCK_ORDERS: OrderWithTransmission[] = [
  {
    id: 'ORD-001-ML',
    marketPlaceId: 'ORD-001-ML',
    marketPlaceNumber: 'ML001',
    marketPlaceUrl: 'MERCADO_LIVRE',
    marketPlace: 'MERCADO_LIVRE',
    shipmentStatusInMarketPlace: 'ready_to_ship',
    orderTypeName: 'CROSS_DOCKING',
    fulfillment: false,
    status: 'PAID_WAITING_SHIP',
    value: 199.9,
    items: [],
    createdAt: new Date(now - 2 * 60 * 60 * 1000).toISOString(), // 2h ago
    buyer: { name: 'João Silva' },
    transmissionStatus: { orderId: 'ORD-001-ML', transmissionStatus: 'OK', errorMessage: null, lastAttempt: new Date().toISOString() },
  },
  {
    id: 'ORD-002-SH',
    marketPlaceId: 'ORD-002-SH',
    marketPlaceNumber: 'SH002',
    marketPlaceUrl: 'TIKTOK_SHOP',
    marketPlace: 'TIKTOK_SHOP',
    shipmentStatusInMarketPlace: 'pending',
    orderTypeName: null,
    fulfillment: false,
    status: 'PAID_WAITING_SHIP',
    value: 79.5,
    items: [],
    createdAt: new Date(now - 26 * 60 * 60 * 1000).toISOString(), // 26h ago
    buyer: { name: 'Maria Santos' },
    transmissionStatus: { orderId: 'ORD-002-SH', transmissionStatus: 'OK', errorMessage: 'Falha ao sincronizar', lastAttempt: new Date().toISOString() },
  },
  {
    id: 'ORD-003-SP',
    marketPlaceId: 'ORD-003-SP',
    marketPlaceNumber: 'SP003',
    marketPlaceUrl: 'SHOPEE',
    marketPlace: 'SHOPEE',
    shipmentStatusInMarketPlace: 'pending',
    orderTypeName: null,
    fulfillment: false,
    status: 'PAID_WAITING_SHIP',
    value: 45.0,
    items: [],
    createdAt: new Date(now - 50 * 60 * 60 * 1000).toISOString(), // 50h ago
    buyer: { name: 'Pedro Costa' },
    transmissionStatus: { orderId: 'ORD-003-SP', transmissionStatus: 'OK', errorMessage: null, lastAttempt: new Date().toISOString() },
  },
  // Amazon sample
  {
    id: 'ORD-004-AMZ',
    marketPlaceId: 'ORD-004-AMZ',
    marketPlaceNumber: 'AMZ004',
    marketPlaceUrl: 'AMAZON_GLOBAL_API',
    marketPlace: 'AMAZON_GLOBAL_API',
    shipmentStatusInMarketPlace: 'pending',
    orderTypeName: 'DBA',
    fulfillment: false,
    status: 'PAID_WAITING_SHIP',
    value: 129.99,
    items: [],
    createdAt: new Date(now - 5 * 60 * 60 * 1000).toISOString(), // 5h ago
    buyer: { name: 'Eloizo Mendes' },
    transmissionStatus: { orderId: 'ORD-004-AMZ', transmissionStatus: 'OK', errorMessage: null, lastAttempt: new Date().toISOString() },
  },
  // Netshoes sample
  {
    id: 'ORD-005-NS',
    marketPlaceId: 'ORD-005-NS',
    marketPlaceNumber: 'NS005',
    marketPlaceUrl: 'NETSHOES',
    marketPlace: 'NETSHOES',
    shipmentStatusInMarketPlace: 'pending',
    orderTypeName: null,
    fulfillment: false,
    status: 'PAID_WAITING_SHIP',
    value: 59.9,
    items: [],
    createdAt: new Date(now - 30 * 60 * 60 * 1000).toISOString(), // 30h ago
    buyer: { name: 'Fabio Lins' },
    transmissionStatus: { orderId: 'ORD-005-NS', transmissionStatus: 'OK', errorMessage: null, lastAttempt: new Date().toISOString() },
  },
];
