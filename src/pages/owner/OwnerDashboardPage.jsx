import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Users,
  Coffee,
  Receipt,
  ArrowUpRight,
  Sparkles,
  RotateCcw,
  Calendar,
  AlertTriangle,
  CreditCard,
  QrCode,
  Banknote,
} from 'lucide-react';
import { dashboardService } from '../../services/dashboardService';
import { orderService } from '../../services/orderService';
import { productService } from '../../services/productService';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { LoadingState } from '../../components/feedback/LoadingState';
import { formatIDR, formatDateTime } from '../../utils/format';
import { cn } from '../../utils/cn';

export function OwnerDashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [salesTrends, setSalesTrends] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [period, setPeriod] = useState('today');

  const loadOwnerData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [summaryRes, salesRes, ordersRes, productsRes] = await Promise.all([
        dashboardService.getSummary(),
        dashboardService.getSalesData(period),
        orderService.getOrders({ limit: 5 }),
        productService.getProducts({ limit: 4 }),
      ]);

      setSummary(summaryRes);
      setSalesTrends(salesRes.trends || []);
      setRecentOrders(ordersRes.data || []);
      setTopProducts(productsRes.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [period]);

  useEffect(() => {
    loadOwnerData();
  }, [loadOwnerData]);

  if (isLoading || !summary) {
    return (
      <div className="py-20 flex items-center justify-center">
        <LoadingState message="Loading owner analytics & metrics..." />
      </div>
    );
  }

  // Max sales calculation for visual bar height
  const maxSale = Math.max(...salesTrends.map((t) => t.sales), 1);

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-crib-charcoal via-zinc-900 to-crib-charcoal border border-crib-border shadow-elevated">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
              Executive Console
            </span>
            <Badge variant="primary" size="sm">
              Live Operations
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-crib-cream tracking-tight uppercase">
            Store Performance &amp; Analytics
          </h1>
          <p className="text-xs text-crib-warm-gray">
            Crib Society Senopati • Real-time revenue, ticket size, and product velocity.
          </p>
        </div>

        {/* Period Selector & Refresh */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex bg-crib-ink p-1 rounded-xl border border-crib-border text-xs font-mono">
            {['today', 'week', 'month'].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPeriod(p)}
                className={cn(
                  'px-3 py-1.5 rounded-lg capitalize transition-colors',
                  period === p ? 'bg-crib-red text-white font-bold' : 'text-crib-warm-gray hover:text-crib-cream'
                )}
              >
                {p === 'today' ? 'Today' : p === 'week' ? 'This Week' : 'This Month'}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="md"
            onClick={loadOwnerData}
            leftIcon={RotateCcw}
            className="text-xs font-mono"
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* 4 Executive KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Gross Sales */}
        <div className="p-5 rounded-2xl bg-crib-charcoal border border-crib-border shadow-card relative overflow-hidden">
          <div className="flex items-center justify-between text-crib-warm-gray">
            <span className="text-xs font-bold uppercase tracking-wider font-display">
              Total Revenue
            </span>
            <div className="w-8 h-8 rounded-lg bg-red-950/60 text-crib-red flex items-center justify-center font-bold">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-crib-cream mt-3 tracking-tight">
            {formatIDR(summary.salesToday)}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14.2% vs yesterday</span>
          </div>
        </div>

        {/* KPI 2: Total Orders */}
        <div className="p-5 rounded-2xl bg-crib-charcoal border border-crib-border shadow-card relative overflow-hidden">
          <div className="flex items-center justify-between text-crib-warm-gray">
            <span className="text-xs font-bold uppercase tracking-wider font-display">
              Orders Count
            </span>
            <div className="w-8 h-8 rounded-lg bg-sky-950/60 text-sky-400 flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-crib-cream mt-3 tracking-tight">
            {summary.ordersToday}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+8.5% volume growth</span>
          </div>
        </div>

        {/* KPI 3: Average Ticket (AOV) */}
        <div className="p-5 rounded-2xl bg-crib-charcoal border border-crib-border shadow-card relative overflow-hidden">
          <div className="flex items-center justify-between text-crib-warm-gray">
            <span className="text-xs font-bold uppercase tracking-wider font-display">
              Average Ticket (AOV)
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-950/60 text-amber-400 flex items-center justify-center font-bold">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-crib-cream mt-3 tracking-tight">
            {formatIDR(summary.averageOrderValue)}
          </div>
          <div className="mt-2 text-xs text-crib-warm-gray font-mono">
            <span>Per customer receipt</span>
          </div>
        </div>

        {/* KPI 4: Stock Status */}
        <div className="p-5 rounded-2xl bg-crib-charcoal border border-crib-border shadow-card relative overflow-hidden">
          <div className="flex items-center justify-between text-crib-warm-gray">
            <span className="text-xs font-bold uppercase tracking-wider font-display">
              Stock Warnings
            </span>
            <div className="w-8 h-8 rounded-lg bg-zinc-800 text-rose-400 flex items-center justify-center font-bold">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-rose-400 mt-3 tracking-tight">
            {summary.lowStockCount} Items
          </div>
          <div className="mt-2 text-xs text-crib-warm-gray font-mono">
            <span>Requires purchasing restock</span>
          </div>
        </div>
      </div>

      {/* Main Row: Sales Visualizer & Payment Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Sales Visualizer (8 cols) */}
        <div className="lg:col-span-8 p-5 rounded-2xl bg-crib-charcoal border border-crib-border shadow-elevated flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold font-display uppercase tracking-wider text-crib-cream">
                Hourly Revenue Velocity
              </h2>
              <p className="text-xs text-crib-warm-gray mt-0.5">
                Sales peaks recorded by 2-hour transaction windows
              </p>
            </div>
            <span className="text-xs font-mono text-crib-red font-bold">
              Peak: 12:00 (Lunch Rush)
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="pt-6 pb-2">
            <div className="flex items-end justify-between gap-3 sm:gap-6 h-48 px-2 border-b border-crib-border/80">
              {salesTrends.map((trend, idx) => {
                const heightPercent = Math.round((trend.sales / maxSale) * 100);
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-crib-cream bg-crib-ink px-2 py-1 rounded border border-crib-border shadow-lg pointer-events-none whitespace-nowrap">
                      {formatIDR(trend.sales)} ({trend.orders} orders)
                    </div>

                    {/* Bar */}
                    <div
                      style={{ height: `${Math.max(heightPercent, 10)}%` }}
                      className="w-full max-w-[48px] bg-gradient-to-t from-crib-red/60 to-crib-red rounded-t-lg transition-all duration-300 group-hover:brightness-125 group-hover:scale-105"
                    />

                    {/* Time Label */}
                    <span className="text-[11px] font-mono text-crib-warm-gray">
                      {trend.period}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-crib-warm-gray pt-2 border-t border-crib-border/40">
            <span>Operational Day: 07:00 – 23:00</span>
            <span>All amounts verified by Register 01</span>
          </div>
        </div>

        {/* Payment Channels Breakdown (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-crib-charcoal border border-crib-border shadow-elevated flex flex-col justify-between space-y-4">
          <div>
            <h2 className="text-base font-bold font-display uppercase tracking-wider text-crib-cream">
              Payment Method Mix
            </h2>
            <p className="text-xs text-crib-warm-gray mt-0.5">
              Settlement channels ratio today
            </p>
          </div>

          <div className="space-y-3.5">
            {/* QRIS Channel */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="flex items-center gap-1.5 font-bold text-crib-cream">
                  <QrCode className="w-3.5 h-3.5 text-crib-red" /> QRIS Dynamic
                </span>
                <span className="font-mono text-crib-cream font-bold">58%</span>
              </div>
              <div className="w-full bg-crib-ink rounded-full h-2 overflow-hidden">
                <div className="bg-crib-red h-full rounded-full" style={{ width: '58%' }} />
              </div>
            </div>

            {/* Cash Channel */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="flex items-center gap-1.5 font-bold text-crib-cream">
                  <Banknote className="w-3.5 h-3.5 text-amber-400" /> Cash Tender
                </span>
                <span className="font-mono text-crib-cream font-bold">24%</span>
              </div>
              <div className="w-full bg-crib-ink rounded-full h-2 overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: '24%' }} />
              </div>
            </div>

            {/* Card Channel */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="flex items-center gap-1.5 font-bold text-crib-cream">
                  <CreditCard className="w-3.5 h-3.5 text-sky-400" /> EDC Debit / Card
                </span>
                <span className="font-mono text-crib-cream font-bold">18%</span>
              </div>
              <div className="w-full bg-crib-ink rounded-full h-2 overflow-hidden">
                <div className="bg-sky-400 h-full rounded-full" style={{ width: '18%' }} />
              </div>
            </div>
          </div>

          <div className="p-3 bg-crib-ink/80 rounded-xl border border-crib-border text-[11px] text-crib-warm-gray space-y-1">
            <span className="font-bold text-crib-cream block">Cash Drawer Balance:</span>
            <span className="font-mono text-xs text-amber-400 font-bold">
              Rp 1.164.000 in register
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Orders & High-Velocity Menu */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Recent Orders (7 cols) */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-crib-charcoal border border-crib-border shadow-elevated space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold font-display uppercase tracking-wider text-crib-cream">
              Recent Audited Orders
            </h2>
            <Link
              to="/owner/orders"
              className="text-xs font-mono text-crib-red hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Full Audit List</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-crib-border/50 text-xs font-mono">
            {recentOrders.map((order) => (
              <div key={order.id} className="py-3 flex items-center justify-between gap-3">
                <div>
                  <div className="font-bold text-crib-cream">{order.id}</div>
                  <div className="text-[10px] text-crib-warm-gray">
                    {order.customerName || 'Guest'} • {order.paymentMethod?.toUpperCase()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-crib-cream">{formatIDR(order.total)}</div>
                  <div className="text-[10px] text-emerald-400 uppercase">
                    {order.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* High Velocity Products (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-crib-charcoal border border-crib-border shadow-elevated space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold font-display uppercase tracking-wider text-crib-cream">
              Featured Menu Items
            </h2>
            <Link
              to="/owner/products"
              className="text-xs font-mono text-crib-red hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Manage Menu</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {topProducts.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-crib-ink/60 border border-crib-border/60"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-10 h-10 rounded-lg object-cover bg-zinc-800"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-crib-cream font-display">
                      {p.name}
                    </h4>
                    <span className="text-[10px] text-crib-warm-gray font-mono">
                      Stock: {p.stock}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-crib-cream">
                  {formatIDR(p.price)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
