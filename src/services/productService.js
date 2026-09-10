/**
 * Product Service
 * Source of Truth: docs/API-SPEC.md Section 3
 */

import { MOCK_PRODUCTS } from '../data/mockProducts';
import { mockNetworkDelay, createApiError } from './api';

let productsStore = [...MOCK_PRODUCTS];

export const productService = {
  async getProducts({ search = '', category = '', status = '', page = 1, limit = 20 } = {}) {
    let filtered = [...productsStore];

    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(q));
    }

    if (category && category !== 'all') {
      filtered = filtered.filter((p) => p.categoryId === category);
    }

    if (status && status !== 'all') {
      filtered = filtered.filter((p) => p.status === status);
    }

    const total = filtered.length;
    const startIndex = (page - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + limit);

    return mockNetworkDelay({
      data: paginated,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    });
  },

  async getProductById(id) {
    const product = productsStore.find((p) => p.id === id);
    if (!product) throw createApiError('Product not found', 404);
    return mockNetworkDelay({ product });
  },

  async createProduct(productData) {
    const newProduct = {
      id: `prod_${Date.now()}`,
      name: productData.name || 'Untitled Coffee',
      categoryId: productData.categoryId || 'espresso',
      price: Number(productData.price) || 0,
      stock: Number(productData.stock) || 0,
      image: productData.image || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
      status: productData.status || 'active',
    };

    productsStore.unshift(newProduct);
    return mockNetworkDelay(newProduct);
  },

  async updateProduct(id, updates) {
    const index = productsStore.findIndex((p) => p.id === id);
    if (index === -1) throw createApiError('Product not found', 404);

    productsStore[index] = {
      ...productsStore[index],
      ...updates,
      price: updates.price !== undefined ? Number(updates.price) : productsStore[index].price,
      stock: updates.stock !== undefined ? Number(updates.stock) : productsStore[index].stock,
    };

    return mockNetworkDelay(productsStore[index]);
  },

  async deleteProduct(id) {
    const index = productsStore.findIndex((p) => p.id === id);
    if (index === -1) throw createApiError('Product not found', 404);

    productsStore.splice(index, 1);
    return mockNetworkDelay({ success: true });
  },
};
