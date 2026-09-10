/**
 * Mock Orders Data
 * Source of Truth: docs/API-SPEC.md Section 4 & 7
 * Order: id, items, subtotal, discount, tax, total, paymentMethod, status, createdAt
 */

export const MOCK_ORDERS = [
  {
    id: 'ORD-2024-001',
    items: [
      { productId: 'prod_001', name: 'Crib Velvet Americano', price: 32000, quantity: 2 },
      { productId: 'prod_006', name: 'Artisan Sourdough Croissant', price: 35000, quantity: 1 },
    ],
    subtotal: 99000,
    discount: 0,
    tax: 9900,
    total: 108900,
    paymentMethod: 'qris',
    status: 'in_progress',
    createdAt: '2026-09-09T08:15:00Z',
    customerName: 'Rayhan M.',
  },
  {
    id: 'ORD-2024-002',
    items: [
      { productId: 'prod_003', name: 'Red Velvet Nitro Cold Brew', price: 48000, quantity: 1 },
    ],
    subtotal: 48000,
    discount: 5000,
    tax: 4300,
    total: 47300,
    paymentMethod: 'card',
    status: 'completed',
    createdAt: '2026-09-09T08:30:00Z',
    customerName: 'Natasha W.',
  },
  {
    id: 'ORD-2024-003',
    items: [
      { productId: 'prod_002', name: 'Smoked Oat Flat White', price: 42000, quantity: 3 },
      { productId: 'prod_005', name: 'Uji Matcha Cloud', price: 40000, quantity: 1 },
    ],
    subtotal: 166000,
    discount: 0,
    tax: 16600,
    total: 182600,
    paymentMethod: 'cash',
    status: 'pending',
    createdAt: '2026-09-09T09:05:00Z',
    customerName: 'David K.',
  },
  {
    id: 'ORD-2024-004',
    items: [
      { productId: 'prod_004', name: 'Kyoto Drip Rebellion', price: 45000, quantity: 1 },
    ],
    subtotal: 45000,
    discount: 0,
    tax: 4500,
    total: 49500,
    paymentMethod: 'qris',
    status: 'cancelled',
    createdAt: '2026-09-09T09:20:00Z',
    customerName: 'Devina T.',
  },
];
