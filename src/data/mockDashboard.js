/**
 * Mock Dashboard Data
 * Source of Truth: docs/API-SPEC.md Section 5
 * Response: { salesToday, ordersToday, averageOrderValue, lowStockCount }
 */

export const MOCK_DASHBOARD_SUMMARY = {
  salesToday: 4850000,
  ordersToday: 128,
  averageOrderValue: 37890,
  lowStockCount: 3,
};

export const MOCK_SALES_TRENDS = [
  { period: '08:00', sales: 420000, orders: 12 },
  { period: '10:00', sales: 980000, orders: 28 },
  { period: '12:00', sales: 1450000, orders: 38 },
  { period: '14:00', sales: 860000, orders: 22 },
  { period: '16:00', sales: 640000, orders: 16 },
  { period: '18:00', sales: 500000, orders: 12 },
];
