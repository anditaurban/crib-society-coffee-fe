import React, { useState, useEffect, useCallback } from 'react';
import {
  Search,
  X,
  Receipt,
  RotateCcw,
  Eye,
  Filter,
  CheckCircle2,
  Clock,
  Flame,
  XCircle,
  Package,
  Utensils,
} from 'lucide-react';
import { orderService } from '../services/orderService';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { OrderStatusBadge } from '../components/orders/OrderStatusBadge';
import { OrderDetailModal } from '../components/orders/OrderDetailModal';
import { LoadingState } from '../components/feedback/LoadingState';
import { EmptyState } from '../components/feedback/EmptyState';
import { ErrorState } from '../components/feedback/ErrorState';
import { useToast } from '../context/ToastContext';
import { formatIDR, formatDateTime } from '../utils/format';
import { cn } from '../utils/cn';

const STATUS_TABS = [
  { id: 'all', label: 'All Orders' },
  { id: 'pending', label: 'Pending' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'completed', label: 'Completed' },
  { id: 'cancelled', label: 'Cancelled' },
];

export function StaffOrdersPage() {
  const { showToast } = useToast();

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected order for detail modal
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Load orders
  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await orderService.getOrders({
        status: selectedStatus === 'all' ? '' : selectedStatus,
        limit: 50,
      });
      setOrders(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to retrieve orders queue.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedStatus]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Handle status update
  const handleUpdateStatus = async (orderId, newStatus) => {
    setIsUpdatingStatus(true);
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      showToast(`Order ${orderId} updated to ${newStatus.replace('_', ' ')}.`, 'success');
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      showToast(err.message || 'Failed to update order status', 'danger');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Client-side search filtering
  const filteredOrders = orders.filter((order) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchesId =
      String(order.id || '').toLowerCase().includes(q) ||
      String(order.orderNumber || '').toLowerCase().includes(q);
    const matchesCustomer = order.customerName?.toLowerCase().includes(q);
    const matchesItem = order.items?.some((item) =>
      (item.name || item.productName || '').toLowerCase().includes(q)
    );
    return matchesId || matchesCustomer || matchesItem;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-crib-border/60">
        <div>
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-crib-red" />
            <h1 className="text-xl sm:text-2xl font-black font-display text-crib-cream tracking-tight uppercase">
              Today's Orders
            </h1>
            <Badge variant="neutral" size="sm">
              {orders.length} Records
            </Badge>
          </div>
          <p className="text-xs text-crib-warm-gray mt-0.5">
            Monitor incoming tickets, update preparation status, and reprint receipts.
          </p>
        </div>

        <Button
          variant="outline"
          size="md"
          onClick={fetchOrders}
          leftIcon={RotateCcw}
          className="text-xs font-mono self-start sm:self-auto"
        >
          Refresh Queue
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {STATUS_TABS.map((tab) => {
            const isActive = selectedStatus === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedStatus(tab.id)}
                className={cn(
                  'px-3.5 py-2 rounded-xl text-xs font-semibold font-display uppercase tracking-wider whitespace-nowrap transition-all duration-150 select-none',
                  isActive
                    ? 'bg-crib-red text-white shadow-md font-bold'
                    : 'bg-crib-charcoal text-crib-warm-gray hover:text-crib-cream border border-crib-border/80'
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-crib-warm-gray absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by order ID, customer, item..."
            className="w-full bg-crib-charcoal border border-crib-border rounded-xl pl-9 pr-8 py-2 text-xs text-crib-cream placeholder:text-crib-warm-gray/60 focus:outline-none focus:border-crib-red transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-crib-warm-gray hover:text-crib-cream"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Orders Content Area */}
      {isLoading ? (
        <div className="py-20 flex items-center justify-center">
          <LoadingState message="Loading order queue..." />
        </div>
      ) : error ? (
        <div className="py-20 flex items-center justify-center">
          <ErrorState
            title="Failed to load orders"
            description={error}
            actionLabel="Retry"
            onAction={fetchOrders}
          />
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="py-20 flex items-center justify-center">
          <EmptyState
            title="No orders found"
            description={
              searchQuery
                ? `No orders matching "${searchQuery}".`
                : `No orders in "${selectedStatus}" status.`
            }
            actionLabel="Reset Filter"
            onAction={() => {
              setSelectedStatus('all');
              setSearchQuery('');
            }}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Desktop Table View */}
          <div className="hidden md:block rounded-2xl border border-crib-border bg-crib-charcoal overflow-hidden shadow-elevated">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-crib-ink/80 text-crib-warm-gray uppercase tracking-wider text-[10px] border-b border-crib-border">
                <tr>
                  <th className="py-3.5 px-4 font-bold">Order ID</th>
                  <th className="py-3.5 px-4 font-bold">Customer / Type</th>
                  <th className="py-3.5 px-4 font-bold">Items Summary</th>
                  <th className="py-3.5 px-4 font-bold">Total</th>
                  <th className="py-3.5 px-4 font-bold">Payment</th>
                  <th className="py-3.5 px-4 font-bold">Status</th>
                  <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-crib-border/50 text-crib-cream">
                {filteredOrders.map((order) => {
                  const itemCount = order.items?.reduce((acc, i) => acc + i.quantity, 0) || 0;
                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-crib-ink/40 transition-colors cursor-pointer group"
                      onClick={() => setSelectedOrder(order)}
                    >
                      {/* Order ID & Time */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-crib-cream group-hover:text-crib-red transition-colors">
                          {order.id}
                        </span>
                        <div className="text-[10px] text-crib-warm-gray mt-0.5">
                          {formatDateTime(order.createdAt)}
                        </div>
                      </td>

                      {/* Customer & Type */}
                      <td className="py-3.5 px-4">
                        <div className="font-sans font-semibold text-crib-cream">
                          {order.customerName || 'Guest'}
                        </div>
                        <div className="text-[10px] text-crib-warm-gray mt-0.5 flex items-center gap-1">
                          {order.orderType === 'takeaway' ? (
                            <span className="text-amber-400 flex items-center gap-1">
                              <Package className="w-2.5 h-2.5" /> Takeaway
                            </span>
                          ) : (
                            <span className="text-sky-400 flex items-center gap-1">
                              <Utensils className="w-2.5 h-2.5" /> Dine In
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Items */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="truncate text-crib-cream">
                          {order.items?.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                        </div>
                        <div className="text-[10px] text-crib-warm-gray mt-0.5">
                          {itemCount} {itemCount === 1 ? 'item' : 'items'} total
                        </div>
                      </td>

                      {/* Total */}
                      <td className="py-3.5 px-4 font-bold text-crib-cream">
                        {formatIDR(order.total)}
                      </td>

                      {/* Payment */}
                      <td className="py-3.5 px-4">
                        <span className="uppercase text-[11px] font-bold text-crib-warm-gray bg-crib-ink px-2 py-0.5 rounded border border-crib-border/60">
                          {order.paymentMethod}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <OrderStatusBadge status={order.status} size="sm" />
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedOrder(order);
                          }}
                          className="px-3 py-1 rounded-lg bg-crib-ink border border-crib-border hover:border-crib-warm-gray text-crib-cream text-xs font-medium inline-flex items-center gap-1 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards View */}
          <div className="md:hidden space-y-3">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className="p-4 rounded-xl bg-crib-charcoal border border-crib-border space-y-2.5 active:bg-crib-ink/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono font-bold text-xs text-crib-cream">
                      {order.id}
                    </span>
                    <h3 className="font-semibold text-sm text-crib-cream">
                      {order.customerName || 'Guest'}
                    </h3>
                  </div>
                  <OrderStatusBadge status={order.status} size="sm" />
                </div>

                <div className="text-xs font-mono text-crib-warm-gray">
                  {order.items?.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-crib-border/40 text-xs font-mono">
                  <span className="font-bold text-crib-cream">
                    {formatIDR(order.total)}
                  </span>
                  <span className="text-[10px] text-crib-warm-gray uppercase">
                    {order.paymentMethod} • {formatDateTime(order.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      <OrderDetailModal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
        onUpdateStatus={handleUpdateStatus}
        isUpdating={isUpdatingStatus}
      />
    </div>
  );
}
