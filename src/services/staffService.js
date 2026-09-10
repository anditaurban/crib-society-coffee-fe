/**
 * Staff Service
 * Source of Truth: docs/API-SPEC.md Section 6 & 7
 */

import { MOCK_STAFF } from '../data/mockStaff';
import { mockNetworkDelay, createApiError } from './api';

let staffStore = [...MOCK_STAFF];

export const staffService = {
  async getStaff() {
    return mockNetworkDelay({
      data: staffStore,
    });
  },

  async createStaff(staffData) {
    const newStaff = {
      id: `stf_${Date.now()}`,
      name: staffData.name || 'New Staff',
      email: staffData.email || '',
      role: 'staff',
      roleTitle: staffData.roleTitle || 'Barista',
      status: staffData.status || 'active',
      shift: staffData.shift || 'Morning (07:00 - 15:00)',
    };
    staffStore.push(newStaff);
    return mockNetworkDelay(newStaff);
  },

  async updateStaff(id, updates) {
    const index = staffStore.findIndex((s) => s.id === id);
    if (index === -1) throw createApiError('Staff member not found', 404);

    staffStore[index] = {
      ...staffStore[index],
      ...updates,
    };
    return mockNetworkDelay(staffStore[index]);
  },

  async updateStaffStatus(id, status) {
    return this.updateStaff(id, { status });
  },
};
