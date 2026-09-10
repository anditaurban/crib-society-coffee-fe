import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  ArrowRight,
  Flame,
  Coffee,
  Package,
  Utensils,
  ChevronRight,
  Layers,
  Sparkles,
} from 'lucide-react';
import { dashboardService } from '../services/dashboardService';
import { orderService } from '../services/orderService';
import { productService } from '../services/productService';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { OrderStatusBadge } from '../components/orders/OrderStatusBadge';
import { OrderDetailModal } from '../components/orders/OrderDetailModal';
import { LoadingState } from '../components/feedback/LoadingState';
import { useToast } from '../context/ToastContext';
import { formatIDR, formatDateTime } from '../utils/format';

export function StaffDashboardPage() {
  const { showToast } = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Load dashboard overview data
  const loadDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [ordersRes, productsRes] = await Promise.all([
        orderService.getOrders({ limit: 50 }),
        productService.getProducts({ limit: 50 }),
      ]);

      const allOrders = ordersRes.data || [];
      setOrders(allOrders);

      // Filter low stock (< 10)
      const allProducts = productsRes.data || [];
      const lowStock = allProducts.filter((p) => p.stock <= 5);
      setLowStockItems(lowStock);
    } catch (err) {
      showToast('Failed to sync staff operations data.', 'danger');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  // Operational metrics
  const pendingOrders = orders.filter((o) => o.status === 'pending');
  const inProgressOrders = orders.filter((o) => o.status === 'in_progress');
  const completedOrders = orders.filter((o) => o.status === 'completed');
  const activeQueue = [...pendingOrders, ...inProgressOrders];

  // Quick Status Transition
  const handleQuickStatusChange = async (orderId, newStatus) => {
    setIsUpdatingStatus(true);
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      showToast(`Order ${orderId} updated to ${newStatus.replace('_', ' ')}.`, 'success');
      // Update local state
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

  if (isLoading) {
    return (
      <div className="py-20 flex items-center justify-center">
        <LoadingState message="Loading staff operational dashboard..." />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Shift Overview Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-crib-charcoal via-crib-charcoal to-crib-ink border border-crib-border shadow-elevated">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-crib-red">
              Active Shift • Station 01
            </span>
            <Badge variant="neutral" size="sm">
              07:00 – 15:00 WIB
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-crib-cream tracking-tight uppercase">
            Staff Operations Hub
          </h1>
          <p className="text-xs text-crib-warm-gray">
            Fulfill live barista orders, track counter speed, and manage today's queues.
          </p>
        </div>

        {/* Quick Station Navigation */}
        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="outline"
            size="md"
            onClick={loadDashboardData}
            leftIcon={RotateCcw}
            className="text-xs font-mono"
          >
            Sync Data
          </Button>

          <Link to="/staff/pos">
            <Button
              variant="primary"
              size="md"
              leftIcon={ShoppingBag}
              className="text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-950/50"
            >
              Launch POS Terminal
            </Button>
          </Link>
        </div>
      </div>

      {/* Operational KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1: Pending Queue */}
        <div className="p-4 rounded-xl bg-crib-charcoal border border-amber-800/40 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider font-display">
              Pending Brew
            </span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-crib-cream mt-2">
            {pendingOrders.length}
          </div>
          <p className="text-[11px] text-crib-warm-gray mt-1">Awaiting barista acceptance</p>
        </div>

        {/* Metric 2: In Progress */}
        <div className="p-4 rounded-xl bg-crib-charcoal border border-sky-800/40 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-sky-300 uppercase tracking-wider font-display">
              On Bar
            </span>
            <Flame className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-crib-cream mt-2">
            {inProgressOrders.length}
          </div>
          <p className="text-[11px] text-crib-warm-gray mt-1">Currently extracting / prepping</p>
        </div>

        {/* Metric 3: Completed Today */}
        <div className="p-4 rounded-xl bg-crib-charcoal border border-emerald-800/40 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider font-display">
              Fulfilled
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-crib-cream mt-2">
            {completedOrders.length}
          </div>
          <p className="text-[11px] text-crib-warm-gray mt-1">Orders delivered to customers</p>
        </div>

        {/* Metric 4: Low Stock Warnings */}
        <div className="p-4 rounded-xl bg-crib-charcoal border border-crib-border shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-crib-warm-gray uppercase tracking-wider font-display">
              Low Stock Alert
            </span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-rose-400 mt-2">
            {lowStockItems.length}
          </div>
          <p className="text-[11px] text-crib-warm-gray mt-1">Products needing restock</p>
        </div>
      </div>

      {/* Main Section: Live Barista Order Queue & Stock Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Active Live Orders Queue (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Coffee className="w-4 h-4 text-crib-red" />
              <h2 className="text-base font-bold font-display uppercase tracking-wider text-crib-cream">
                Live Kitchen &amp; Barista Queue ({activeQueue.length})
              </h2>
            </div>
            <Link
              to="/staff/orders"
              className="text-xs font-mono text-crib-red hover:underline flex items-center gap-1 font-semibold"
            >
              <span>View All Orders</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {activeQueue.length === 0 ? (
            <div className="p-10 rounded-2xl bg-crib-charcoal border border-crib-border/80 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold font-display text-crib-cream">
                Order Queue is Clear
              </h3>
              <p className="text-xs text-crib-warm-gray max-w-sm mx-auto">
                All customer tickets have been prepared. New orders placed at the POS will appear here instantly.
              </p>
              <Link to="/staff/pos">
                <Button variant="primary" size="sm" className="mt-2 text-xs">
                  Create New Order at POS
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {activeQueue.map((order) => {
                const isPending = order.status === 'pending';
                return (
                  <div
                    key={order.id}
                    className="p-4 rounded-xl bg-crib-charcoal border border-crib-border/80 flex flex-col justify-between space-y-3 hover:border-crib-warm-gray/60 transition-colors shadow-card"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-xs text-crib-cream">
                            {order.id}
                          </span>
                          <span className="text-[10px] font-mono text-crib-warm-gray">
                            {order.orderType === 'takeaway' ? (
                              <span className="flex items-center gap-1 text-amber-400">
                                <Package className="w-3 h-3" /> Takeaway
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-sky-400">
                                <Utensils className="w-3 h-3" /> Dine In
                              </span>
                            )}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold font-display text-crib-cream mt-0.5">
                          {order.customerName || 'Guest'}
                        </h4>
                      </div>
                      <OrderStatusBadge status={order.status} size="sm" />
                    </div>

                    {/* Items preview list */}
                    <div className="rounded-lg bg-crib-ink/60 p-2.5 space-y-1.5 text-xs font-mono divide-y divide-crib-border/30">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="pt-1 first:pt-0 flex justify-between">
                          <span className="text-crib-cream truncate pr-2">
                            {item.quantity}x {item.name}
                          </span>
                          {item.note && (
                            <span className="text-crib-red text-[10px] shrink-0 italic">
                              "{item.note}"
                            </span>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between pt-2 border-t border-crib-border/40">
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(order)}
                        className="text-xs text-crib-warm-gray hover:text-crib-cream font-mono underline"
                      >
                        Inspect Slip
                      </button>

                      {isPending ? (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleQuickStatusChange(order.id, 'in_progress')}
                          isLoading={isUpdatingStatus}
                          leftIcon={Play}
                          className="text-xs px-3 py-1"
                        >
                          Start Brewing
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleQuickStatusChange(order.id, 'completed')}
                          isLoading={isUpdatingStatus}
                          leftIcon={CheckCircle2}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-3 py-1"
                        >
                          Mark Ready
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Low Stock & Bar Operational Notes (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <h2 className="text-base font-bold font-display uppercase tracking-wider text-crib-cream">
              Restock &amp; Bar Alerts
            </h2>
          </div>

          <div className="p-4 rounded-2xl bg-crib-charcoal border border-crib-border/80 space-y-3">
            <span className="text-[11px] font-mono text-crib-warm-gray uppercase tracking-wider block">
              Items at or below critical threshold (5 units):
            </span>

            {lowStockItems.length === 0 ? (
              <p className="text-xs text-emerald-400 font-mono py-2">
                ✓ All inventory levels healthy.
              </p>
            ) : (
              <div className="divide-y divide-crib-border/40">
                {lowStockItems.map((item) => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-crib-cream">
                        {item.name}
                      </div>
                      <div className="text-[10px] text-crib-warm-gray font-mono">
                        {item.categoryId}
                      </div>
                    </div>
                    <div>
                      {item.stock === 0 ? (
                        <Badge variant="danger" size="sm" dot>
                          Empty
                        </Badge>
                      ) : (
                        <Badge variant="warning" size="sm" dot>
                          {item.stock} left
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Operational Checklist */}
          <div className="p-4 rounded-2xl bg-crib-ink border border-crib-border/80 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider font-display text-crib-cream">
              Barista Station Guidelines
            </h3>
            <ul className="text-xs text-crib-warm-gray space-y-2 list-disc list-inside">
              <li>Espresso extraction target: 28-32 seconds.</li>
              <li>Always verify customer names before handing over takeaway drinks.</li>
              <li>Mark tickets as <strong>Completed</strong> immediately upon delivery.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <OrderDetailModal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
        onUpdateStatus={handleQuickStatusChange}
        isUpdating={isUpdatingStatus}
      />
    </div>
  );
}
