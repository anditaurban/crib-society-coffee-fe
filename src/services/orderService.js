/**
 * Order Service
 * Source of Truth: docs/API-SPEC.md Section 4
 */

import { MOCK_ORDERS } from '../data/mockOrders';
import { mockNetworkDelay, createApiError } from './api';

let ordersStore = [...MOCK_ORDERS];

export const orderService = {
  async getOrders({ status = '', page = 1, limit = 20 } = {}) {
    let filtered = [...ordersStore];

    if (status && status !== 'all') {
      filtered = filtered.filter((o) => o.status === status);
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

  async getOrderById(id) {
    const order = ordersStore.find((o) => o.id === id);
    if (!order) throw createApiError('Order not found', 404);
    return mockNetworkDelay({ order });
  },

  async createOrder({ items = [], paymentMethod = 'qris', notes = '', customerName = 'Guest' }) {
    if (!items.length) {
      throw createApiError('Order must contain at least one item', 400);
    }

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = Math.round(subtotal * 0.1); // 10% tax placeholder
    const discount = 0;
    const total = subtotal + tax - discount;

    const newOrder = {
      id: `ORD-2024-${String(ordersStore.length + 1).padStart(3, '0')}`,
      items,
      subtotal,
      discount,
      tax,
      total,
      paymentMethod,
      notes,
      customerName,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    ordersStore.unshift(newOrder);
    return mockNetworkDelay({ order: newOrder });
  },

  async updateOrderStatus(id, newStatus) {
    const index = ordersStore.findIndex((o) => o.id === id);
    if (index === -1) throw createApiError('Order not found', 404);

    ordersStore[index] = {
      ...ordersStore[index],
      status: newStatus,
    };

    return mockNetworkDelay({ order: ordersStore[index] });
  },
};
