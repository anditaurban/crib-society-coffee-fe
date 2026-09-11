/**
 * Category Service
 * Source of Truth: docs/API-INTEGRATION.md Section 5
 * 
 * Endpoints:
 * - GET    /categories
 * - POST   /categories     (Owner Only)
 * - PUT    /categories/:id (Owner Only)
 * - DELETE /categories/:id (Owner Only)
 */

import { apiRequest } from './api';

export const categoryService = {
  /**
   * Get all active categories with their visual assets and metadata
   */
  async getCategories() {
    const response = await apiRequest('/categories');
    return response.data || [];
  },

  /**
   * Create a new category
   */
  async createCategory(data) {
    const response = await apiRequest('/categories', {
      method: 'POST',
      body: data,
    });
    return response.data || response;
  },

  /**
   * Update category by ID
   */
  async updateCategory(id, data) {
    const response = await apiRequest(`/categories/${id}`, {
      method: 'PUT',
      body: data,
    });
    return response;
  },

  /**
   * Delete category by ID
   */
  async deleteCategory(id) {
    const response = await apiRequest(`/categories/${id}`, {
      method: 'DELETE',
    });
    return response;
  },
};
