/**
 * Dashboard Service
 * Source of Truth: docs/API-SPEC.md Section 5
 */

import { MOCK_DASHBOARD_SUMMARY, MOCK_SALES_TRENDS } from '../data/mockDashboard';
import { mockNetworkDelay } from './api';

export const dashboardService = {
  async getSummary() {
    return mockNetworkDelay(MOCK_DASHBOARD_SUMMARY);
  },

  async getSalesData(period = 'today') {
    return mockNetworkDelay({
      period,
      trends: MOCK_SALES_TRENDS,
    });
  },
};
