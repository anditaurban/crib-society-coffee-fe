/**
 * Product Service
 * Source of Truth: docs/API-INTEGRATION.md Section 4
 * 
 * Endpoints:
 * - GET    /products
 * - GET    /products/:id
 * - POST   /products     (Owner Only)
 * - PUT    /products/:id (Owner Only)
 * - DELETE /products/:id (Owner Only)
 */

import { apiRequest } from './api';

export const productService = {
  /**
   * Get products with filtering, search, and pagination
   */
  async getProducts({ search = '', category = '', status = '', page = 1, limit = 50 } = {}) {
    const params = { page, limit };

    if (search && search.trim()) {
      params.search = search.trim();
    }

    if (category && category !== 'all') {
      params.category = category;
    }

    if (status && status !== 'all') {
      params.status = status;
    }

    const response = await apiRequest('/products', { params });

    // Normalize products data
    const products = (response.data || []).map((p) => ({
      ...p,
      image: p.image || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
      price: Number(p.price) || 0,
      stock: Number(p.stock) || 0,
      categoryId: p.categoryId,
    }));

    return {
      data: products,
      meta: response.meta || {
        total: products.length,
        page,
        limit,
        totalPages: Math.ceil(products.length / limit) || 1,
      },
    };
  },

  /**
   * Get product detail by ID
   */
  async getProductById(id) {
    const response = await apiRequest(`/products/${id}`);
    const product = response.data;
    if (product) {
      product.price = Number(product.price) || 0;
      product.stock = Number(product.stock) || 0;
    }
    return { product };
  },

  /**
   * Create a new product (Owner Only)
   */
  async createProduct(productData) {
    const payload = {
      name: productData.name,
      categoryId: Number(productData.categoryId) || 1,
      price: Number(productData.price) || 0,
      costPrice: productData.costPrice !== undefined ? Number(productData.costPrice) : Math.round((Number(productData.price) || 0) * 0.4),
      stock: Number(productData.stock) || 0,
      lowStockThreshold: Number(productData.lowStockThreshold) || 5,
      description: productData.description || '',
      image: productData.image || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
      status: productData.status || 'active',
    };

    const response = await apiRequest('/products', {
      method: 'POST',
      body: payload,
    });

    return response.data || response;
  },

  /**
   * Update existing product by ID (Owner Only)
   */
  async updateProduct(id, updates) {
    const payload = { ...updates };
    if (payload.price !== undefined) payload.price = Number(payload.price);
    if (payload.stock !== undefined) payload.stock = Number(payload.stock);
    if (payload.categoryId !== undefined) payload.categoryId = Number(payload.categoryId);
    if (payload.costPrice !== undefined) payload.costPrice = Number(payload.costPrice);
    if (payload.lowStockThreshold !== undefined) payload.lowStockThreshold = Number(payload.lowStockThreshold);

    const response = await apiRequest(`/products/${id}`, {
      method: 'PUT',
      body: payload,
    });

    return response.data || response;
  },

  /**
   * Soft-delete / Archive product by ID (Owner Only)
   */
  async deleteProduct(id) {
    const response = await apiRequest(`/products/${id}`, {
      method: 'DELETE',
    });
    return response;
  },
};
