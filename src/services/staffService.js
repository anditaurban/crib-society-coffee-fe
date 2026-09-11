/**
 * Staff Management Service
 * Source of Truth: docs/API-INTEGRATION.md Section 8
 * 
 * Endpoints:
 * - GET   /staff           (Owner Only)
 * - POST  /staff           (Owner Only)
 * - PUT   /staff/:id       (Owner Only)
 * - PATCH /staff/:id/status (Owner Only)
 */

import { apiRequest } from './api';

export const staffService = {
  /**
   * Get all staff members
   */
  async getStaff() {
    const response = await apiRequest('/staff');
    const staff = (response.data || []).map((s) => ({
      ...s,
      roleTitle: s.role === 'owner' ? 'Owner / General Manager' : 'Barista / Cashier',
      shift: 'Morning (07:00 - 15:00)',
    }));
    return { data: staff };
  },

  /**
   * Register a new staff member
   */
  async createStaff(staffData) {
    const payload = {
      name: staffData.name,
      email: staffData.email,
      password: staffData.password || 'password123',
      role: staffData.role || 'staff',
      status: staffData.status || 'active',
    };

    const response = await apiRequest('/staff', {
      method: 'POST',
      body: payload,
    });

    return response.data || response;
  },

  /**
   * Update staff details
   */
  async updateStaff(id, updates) {
    const payload = {
      name: updates.name,
      role: updates.role,
    };

    const response = await apiRequest(`/staff/${id}`, {
      method: 'PUT',
      body: payload,
    });

    return response.data || response;
  },

  /**
   * Toggle staff active/inactive status
   */
  async updateStaffStatus(id, status) {
    const response = await apiRequest(`/staff/${id}/status`, {
      method: 'PATCH',
      body: { status },
    });

    return response.data || response;
  },
};
