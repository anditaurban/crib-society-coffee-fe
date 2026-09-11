/**
 * Dashboard & Analytics Service
 * Source of Truth: docs/API-INTEGRATION.md Section 7
 * 
 * Endpoints:
 * - GET /dashboard/summary (Owner Only)
 * - GET /dashboard/sales   (Owner Only)
 */

import { apiRequest } from './api';

export const dashboardService = {
  /**
   * Get real-time KPI summary (salesToday, ordersToday, averageOrderValue, lowStockCount)
   */
  async getSummary() {
    const response = await apiRequest('/dashboard/summary');
    return response.data || {
      salesToday: 0,
      ordersToday: 0,
      averageOrderValue: 0,
      lowStockCount: 0,
    };
  },

  /**
   * Get sales analytics & trend data
   */
  async getSalesData(period = 'today') {
    // Map frontend period keys to backend query options
    let backendPeriod = period;
    if (period === 'week') backendPeriod = '7days';
    if (period === 'month') backendPeriod = '30days';

    const response = await apiRequest('/dashboard/sales', {
      params: { period: backendPeriod },
    });

    const rawData = response.data || [];

    // Format trends for frontend visualization
    const trends = rawData.map((item) => ({
      label: item.date || item.label || 'Day',
      sales: Number(item.totalSales || item.sales || 0),
      orders: Number(item.totalOrders || item.orders || 0),
    }));

    return {
      period: response.period || period,
      trends: trends.length > 0 ? trends : [
        { label: 'Today', sales: 0, orders: 0 },
      ],
    };
  },
};
