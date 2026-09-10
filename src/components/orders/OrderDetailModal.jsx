import React from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { OrderStatusBadge } from './OrderStatusBadge';
import { formatIDR, formatDateTime } from '../../utils/format';
import {
  Clock,
  User,
  Coffee,
  CheckCircle2,
  Play,
  XCircle,
  Printer,
  FileText,
  AlertTriangle,
} from 'lucide-react';
import { cn } from '../../utils/cn';

export function OrderDetailModal({
  isOpen,
  onClose,
  order,
  onUpdateStatus,
  isUpdating = false,
}) {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Order ${order.id}`}
      description={`Created on ${formatDateTime(order.createdAt)}`}
      maxWidth="max-w-xl"
    >
      <div className="space-y-5 pt-2">
        {/* Status & Customer Summary Banner */}
        <div className="p-3.5 rounded-xl bg-crib-ink border border-crib-border/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-crib-charcoal border border-crib-border flex items-center justify-center text-crib-cream">
              <User className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-crib-cream">
                {order.customerName || 'Guest Customer'}
              </div>
              <div className="text-[11px] text-crib-warm-gray capitalize font-mono">
                {order.orderType === 'takeaway' ? 'Takeaway Order' : 'Dine In Order'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-crib-warm-gray uppercase font-mono">Status:</span>
            <OrderStatusBadge status={order.status} size="md" />
          </div>
        </div>

        {/* Itemized List */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold font-display uppercase tracking-wider text-crib-warm-gray">
            Order Items ({order.items?.length || 0})
          </h4>
          <div className="rounded-xl border border-crib-border/70 overflow-hidden divide-y divide-crib-border/40 bg-crib-ink/40">
            {order.items?.map((item, idx) => (
              <div key={idx} className="p-3 flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-crib-charcoal border border-crib-border flex items-center justify-center font-mono font-bold text-xs text-crib-cream shrink-0">
                    {item.quantity}x
                  </span>
                  <div>
                    <div className="text-xs font-semibold text-crib-cream">
                      {item.name}
                    </div>
                    {item.note && (
                      <div className="text-[11px] text-crib-red italic mt-0.5">
                        Note: {item.note}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-mono font-bold text-crib-cream">
                    {formatIDR(item.price * item.quantity)}
                  </div>
                  <div className="text-[10px] font-mono text-crib-warm-gray">
                    {formatIDR(item.price)} each
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notes and Payment Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-crib-ink/60 border border-crib-border/60 text-xs space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-wider text-crib-warm-gray block">
              Payment Details
            </span>
            <div className="flex justify-between text-crib-cream">
              <span>Method:</span>
              <span className="font-bold uppercase">{order.paymentMethod}</span>
            </div>
            {order.notes && (
              <div className="pt-1 text-crib-warm-gray border-t border-crib-border/40">
                <span className="text-[10px] text-crib-warm-gray/70 block">Kitchen Memo:</span>
                "{order.notes}"
              </div>
            )}
          </div>

          <div className="p-3 rounded-xl bg-crib-ink/60 border border-crib-border/60 text-xs space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-wider text-crib-warm-gray block">
              Financial Summary
            </span>
            <div className="flex justify-between text-crib-warm-gray">
              <span>Subtotal:</span>
              <span className="font-mono text-crib-cream">{formatIDR(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-crib-warm-gray">
              <span>PB1 Tax (10%):</span>
              <span className="font-mono text-crib-cream">{formatIDR(order.tax)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Discount:</span>
                <span className="font-mono">-{formatIDR(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-crib-cream font-bold pt-1 border-t border-crib-border/40 text-sm">
              <span>Total:</span>
              <span className="font-mono text-crib-cream">{formatIDR(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Operational Status Action Bar */}
        <div className="p-3.5 rounded-xl bg-crib-charcoal border border-crib-border flex flex-wrap items-center justify-between gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            leftIcon={Printer}
            className="text-xs font-mono"
          >
            Reprint Slip
          </Button>

          <div className="flex items-center gap-2">
            {order.status === 'pending' && (
              <>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onUpdateStatus(order.id, 'cancelled')}
                  isLoading={isUpdating}
                  leftIcon={XCircle}
                  className="text-xs"
                >
                  Cancel Order
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onUpdateStatus(order.id, 'in_progress')}
                  isLoading={isUpdating}
                  leftIcon={Play}
                  className="text-xs"
                >
                  Start Brewing
                </Button>
              </>
            )}

            {order.status === 'in_progress' && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => onUpdateStatus(order.id, 'completed')}
                isLoading={isUpdating}
                leftIcon={CheckCircle2}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs"
              >
                Mark Order Fulfilled
              </Button>
            )}

            {order.status === 'completed' && (
              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Fulfilled
              </span>
            )}

            {order.status === 'cancelled' && (
              <span className="text-xs text-rose-400 font-mono flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5" /> Cancelled
              </span>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
