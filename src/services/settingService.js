/**
 * Store Settings Service
 * Source of Truth: docs/API-INTEGRATION.md Section 9
 * 
 * Endpoints:
 * - GET /settings
 * - PUT /settings (Owner Only)
 */

import { apiRequest } from './api';

export const settingService = {
  /**
   * Fetch current store & operational settings
   */
  async getSettings() {
    const response = await apiRequest('/settings');
    return response.data || {};
  },

  /**
   * Update store settings
   */
  async updateSettings(settingsData) {
    const response = await apiRequest('/settings', {
      method: 'PUT',
      body: settingsData,
    });
    return response;
  },
};
