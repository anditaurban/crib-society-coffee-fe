import React, { useState, useEffect, useCallback } from 'react';
import {
  Receipt,
  Search,
  X,
  RotateCcw,
  Download,
  Filter,
  DollarSign,
  TrendingUp,
  CreditCard,
  QrCode,
  Banknote,
  Eye,
} from 'lucide-react';
import { orderService } from '../../services/orderService';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { OrderStatusBadge } from '../../components/orders/OrderStatusBadge';
import { OrderDetailModal } from '../../components/orders/OrderDetailModal';
import { LoadingState } from '../../components/feedback/LoadingState';
import { EmptyState } from '../../components/feedback/EmptyState';
import { useToast } from '../../context/ToastContext';
import { formatIDR, formatDateTime } from '../../utils/format';
import { cn } from '../../utils/cn';

export function OwnerOrdersPage() {
  const { showToast } = useToast();

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await orderService.getOrders({
        status: statusFilter === 'all' ? '' : statusFilter,
        limit: 100,
      });
      setOrders(res.data || []);
    } catch (err) {
      showToast('Failed to load orders for auditing.', 'danger');
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter, showToast]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Client-side filtering
  const filtered = orders.filter((o) => {
    const matchesPayment =
      paymentFilter === 'all' || o.paymentMethod?.toLowerCase() === paymentFilter.toLowerCase();
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      String(o.id || '').toLowerCase().includes(q) ||
      String(o.orderNumber || '').toLowerCase().includes(q) ||
      o.customerName?.toLowerCase().includes(q) ||
      o.items?.some((i) => (i.name || i.productName || '').toLowerCase().includes(q));

    return matchesPayment && matchesSearch;
  });

  // Financial aggregates
  const totalRevenue = filtered.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.total : 0), 0);
  const totalTax = filtered.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.tax : 0), 0);
  const validOrdersCount = filtered.filter((o) => o.status !== 'cancelled').length;
  const avgOrderValue = validOrdersCount ? Math.round(totalRevenue / validOrdersCount) : 0;

  const handleExportCsv = () => {
    showToast('Exporting audit trail to CSV file...', 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-crib-border/60">
        <div>
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-crib-red" />
            <h1 className="text-xl sm:text-2xl font-black font-display text-crib-cream tracking-tight uppercase">
              Order Auditing &amp; Reconciliation
            </h1>
            <Badge variant="neutral" size="sm">
              Ledger
            </Badge>
          </div>
          <p className="text-xs text-crib-warm-gray mt-0.5">
            Full transaction history, tax ledger (PB1), and payment reconciliation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="md"
            onClick={fetchOrders}
            leftIcon={RotateCcw}
            className="text-xs font-mono"
          >
            Refresh
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={handleExportCsv}
            leftIcon={Download}
            className="text-xs font-mono"
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-crib-charcoal border border-crib-border">
          <span className="text-xs uppercase font-mono tracking-wider text-crib-warm-gray block">
            Audited Gross Revenue
          </span>
          <div className="text-2xl font-black font-mono text-crib-cream mt-1">
            {formatIDR(totalRevenue)}
          </div>
          <span className="text-[11px] text-emerald-400 font-mono">
            {validOrdersCount} settled tickets
          </span>
        </div>

        <div className="p-4 rounded-xl bg-crib-charcoal border border-crib-border">
          <span className="text-xs uppercase font-mono tracking-wider text-crib-warm-gray block">
            PB1 Restaurant Tax (10%)
          </span>
          <div className="text-2xl font-black font-mono text-crib-cream mt-1">
            {formatIDR(totalTax)}
          </div>
          <span className="text-[11px] text-crib-warm-gray font-mono">
            Payable to local revenue office
          </span>
        </div>

        <div className="p-4 rounded-xl bg-crib-charcoal border border-crib-border">
          <span className="text-xs uppercase font-mono tracking-wider text-crib-warm-gray block">
            Average Spend Per Ticket
          </span>
          <div className="text-2xl font-black font-mono text-crib-cream mt-1">
            {formatIDR(avgOrderValue)}
          </div>
          <span className="text-[11px] text-crib-warm-gray font-mono">
            Across active filters
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {['all', 'completed', 'in_progress', 'pending', 'cancelled'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={cn(
                'px-3 py-1.5 rounded-xl text-xs font-semibold font-display uppercase tracking-wider whitespace-nowrap transition-all',
                statusFilter === st
                  ? 'bg-crib-red text-white font-bold shadow'
                  : 'bg-crib-charcoal text-crib-warm-gray border border-crib-border hover:text-crib-cream'
              )}
            >
              {st === 'all' ? 'All Status' : st.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Payment and Search */}
        <div className="flex items-center gap-2">
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="bg-crib-charcoal border border-crib-border rounded-xl px-3 py-2 text-xs text-crib-cream focus:outline-none focus:border-crib-red"
          >
            <option value="all">All Payments</option>
            <option value="qris">QRIS</option>
            <option value="cash">Cash</option>
            <option value="card">Debit / Card</option>
          </select>

          <div className="relative w-48 sm:w-60">
            <Search className="w-3.5 h-3.5 text-crib-warm-gray absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ID, customer..."
              className="w-full bg-crib-charcoal border border-crib-border rounded-xl pl-8 pr-8 py-2 text-xs text-crib-cream placeholder:text-crib-warm-gray/60 focus:outline-none focus:border-crib-red"
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
      </div>

      {/* Orders Audit Table */}
      {isLoading ? (
        <div className="py-20 flex items-center justify-center">
          <LoadingState message="Loading audit ledger..." />
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 flex items-center justify-center">
          <EmptyState
            title="No orders found"
            description="No transaction records match the specified audit filters."
            actionLabel="Clear Filters"
            onAction={() => {
              setStatusFilter('all');
              setPaymentFilter('all');
              setSearchQuery('');
            }}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Desktop Table View */}
          <div className="hidden md:block rounded-2xl border border-crib-border bg-crib-charcoal overflow-hidden shadow-elevated">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-crib-ink/90 text-crib-warm-gray uppercase tracking-wider text-[10px] border-b border-crib-border">
                  <tr>
                    <th className="py-3.5 px-4 font-bold">Transaction ID</th>
                    <th className="py-3.5 px-4 font-bold">Time</th>
                    <th className="py-3.5 px-4 font-bold">Customer</th>
                    <th className="py-3.5 px-4 font-bold">Payment</th>
                    <th className="py-3.5 px-4 font-bold">Subtotal</th>
                    <th className="py-3.5 px-4 font-bold">PB1 Tax</th>
                    <th className="py-3.5 px-4 font-bold">Grand Total</th>
                    <th className="py-3.5 px-4 font-bold">Status</th>
                    <th className="py-3.5 px-4 font-bold text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-crib-border/50 text-crib-cream">
                  {filtered.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-crib-ink/40 transition-colors cursor-pointer"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <td className="py-3 px-4 font-bold text-crib-cream">{order.id}</td>
                      <td className="py-3 px-4 text-crib-warm-gray">
                        {formatDateTime(order.createdAt)}
                      </td>
                      <td className="py-3 px-4 font-sans font-medium text-crib-cream">
                        {order.customerName || 'Guest'}
                      </td>
                      <td className="py-3 px-4 uppercase text-[11px] font-bold text-crib-warm-gray">
                        {order.paymentMethod}
                      </td>
                      <td className="py-3 px-4 text-crib-warm-gray">{formatIDR(order.subtotal)}</td>
                      <td className="py-3 px-4 text-crib-warm-gray">{formatIDR(order.tax)}</td>
                      <td className="py-3 px-4 font-bold text-crib-cream">{formatIDR(order.total)}</td>
                      <td className="py-3 px-4">
                        <OrderStatusBadge status={order.status} size="sm" />
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          aria-label={`View details for ${order.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedOrder(order);
                          }}
                          className="p-1.5 rounded-lg bg-crib-ink border border-crib-border hover:border-crib-warm-gray text-crib-cream"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards View (< md) */}
          <div className="md:hidden space-y-3">
            {filtered.map((order) => (
              <div
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className="p-4 rounded-xl bg-crib-charcoal border border-crib-border space-y-2 active:bg-crib-ink/50 transition-colors"
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

      {/* Inspection Modal */}
      <OrderDetailModal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
        onUpdateStatus={async (id, newStatus) => {
          await orderService.updateOrderStatus(id, newStatus);
          fetchOrders();
          setSelectedOrder((prev) => prev ? { ...prev, status: newStatus } : null);
        }}
      />
    </div>
  );
}
