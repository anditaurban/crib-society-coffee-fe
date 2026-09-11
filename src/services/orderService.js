/**
 * Order Service
 * Source of Truth: docs/API-INTEGRATION.md Section 6
 * 
 * Endpoints:
 * - POST  /orders
 * - GET   /orders
 * - GET   /orders/:id
 * - PATCH /orders/:id/status
 */

import { apiRequest } from './api';

function normalizeOrder(order) {
  if (!order) return order;

  // Map backend orderStatus to status, bridging 'processing' <-> 'in_progress'
  const rawStatus = order.orderStatus || order.status || 'pending';
  const displayStatus = rawStatus === 'processing' ? 'in_progress' : rawStatus;

  return {
    ...order,
    id: order.id,
    orderNumber: order.orderNumber || `ORD-${order.id}`,
    status: displayStatus,
    orderStatus: rawStatus,
    total: Number(order.total || order.totalAmount) || 0,
    subtotal: Number(order.subtotal) || 0,
    tax: Number(order.tax || order.taxAmount) || 0,
    discount: Number(order.discount || order.discountAmount) || 0,
    customerName: order.customerName || 'Guest',
    items: (order.items || []).map((item) => ({
      ...item,
      id: item.id || item.productId,
      name: item.name || item.productName,
      price: Number(item.price || item.unitPrice) || 0,
      quantity: Number(item.quantity) || 1,
      subtotal: Number(item.subtotal || item.subtotalPrice) || 0,
    })),
  };
}

export const orderService = {
  /**
   * Get orders list with filters & pagination
   */
  async getOrders({ status = '', search = '', page = 1, limit = 50 } = {}) {
    const params = { page, limit };

    if (status && status !== 'all') {
      // Map frontend 'in_progress' to backend 'processing'
      params.status = status === 'in_progress' ? 'processing' : status;
    }

    if (search && search.trim()) {
      params.search = search.trim();
    }

    const response = await apiRequest('/orders', { params });
    const orders = (response.data || []).map(normalizeOrder);

    return {
      data: orders,
      meta: response.meta || {
        total: orders.length,
        page,
        limit,
        totalPages: Math.ceil(orders.length / limit) || 1,
      },
    };
  },

  /**
   * Get complete order detail by ID
   */
  async getOrderById(id) {
    const response = await apiRequest(`/orders/${id}`);
    const order = normalizeOrder(response.order || response.data);
    return { order };
  },

  /**
   * Create a new POS checkout order
   */
  async createOrder({
    items = [],
    paymentMethod = 'cash',
    customerName = 'Guest',
    customerPhone = '',
    cashReceived = 0,
    cashTendered = 0,
    notes = '',
    orderType = 'dine_in',
  }) {
    // Format items for backend API
    const formattedItems = items.map((item) => ({
      productId: Number(item.id || item.productId),
      quantity: Number(item.quantity) || 1,
      notes: item.notes || '',
    }));

    const finalCashReceived = Number(cashReceived || cashTendered) || 0;

    const payload = {
      items: formattedItems,
      paymentMethod,
      customerName: customerName.trim() || 'Guest',
      customerPhone: customerPhone ? customerPhone.trim() : undefined,
      cashReceived: paymentMethod === 'cash' ? finalCashReceived : undefined,
      notes: notes ? `${notes} (${orderType === 'takeaway' ? 'Takeaway' : 'Dine In'})` : (orderType === 'takeaway' ? 'Takeaway' : 'Dine In'),
    };

    const response = await apiRequest('/orders', {
      method: 'POST',
      body: payload,
    });

    const createdOrder = normalizeOrder(response.data);
    // Attach client details for thermal receipt printing
    createdOrder.orderType = orderType;
    createdOrder.cashTendered = finalCashReceived;
    createdOrder.changeAmount = response.data?.changeAmount || 0;
    createdOrder.items = items.map((i) => ({
      name: i.name,
      price: i.price,
      quantity: i.quantity,
    }));

    return { order: createdOrder };
  },

  /**
   * Update order status (complete or cancel)
   */
  async updateOrderStatus(id, newStatus, reason = '') {
    // Map 'in_progress' to backend 'completed' or target
    let backendStatus = newStatus;
    if (newStatus === 'in_progress') backendStatus = 'processing';

    const response = await apiRequest(`/orders/${id}/status`, {
      method: 'PATCH',
      body: {
        status: backendStatus,
        reason: reason || (backendStatus === 'completed' ? 'Order served to customer' : 'Order cancelled'),
      },
    });

    return { success: true, data: response.data };
  },
};
