import React from 'react';
import { Printer, CheckCircle2, RotateCcw, Copy, Share2 } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { formatIDR, formatDateTime } from '../../utils/format';

export function ReceiptModal({
  isOpen,
  onClose,
  order,
  onStartNewOrder,
}) {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Transaction Successful"
      description="Order has been saved and queued for barista preparation."
      maxWidth="max-w-md"
    >
      <div className="space-y-4 pt-2">
        {/* Success Icon Callout */}
        <div className="flex items-center gap-3 p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl text-emerald-300">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <div className="text-xs">
            <span className="font-bold">Payment Verified</span> — Order status is active in queue.
          </div>
        </div>

        {/* Thermal Slip Receipt Container */}
        <div
          id="receipt-print-area"
          className="bg-white text-zinc-900 rounded-xl p-5 shadow-inner font-mono text-xs border border-zinc-200 select-text"
        >
          {/* Header */}
          <div className="text-center pb-4 border-b border-dashed border-zinc-400 space-y-1">
            <h3 className="text-base font-black tracking-tighter uppercase font-display">
              CRIB SOCIETY
            </h3>
            <p className="text-[10px] text-zinc-600">
              Coffee Roasters & Society Hub
            </p>
            <p className="text-[10px] text-zinc-500">
              Jl. Senopati No. 42, Jakarta Selatan
            </p>
            <div className="pt-2 text-[10px] text-zinc-700 flex justify-between">
              <span>{formatDateTime(order.createdAt)}</span>
              <span className="font-bold uppercase">{order.orderType === 'takeaway' ? 'Takeaway' : 'Dine In'}</span>
            </div>
            <div className="text-[10px] text-zinc-700 flex justify-between">
              <span>Order: <span className="font-bold">{order.id}</span></span>
              <span>Cust: <span className="font-bold">{order.customerName || 'Guest'}</span></span>
            </div>
          </div>

          {/* Items List */}
          <div className="py-3 border-b border-dashed border-zinc-400 space-y-2">
            {order.items?.map((item, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex justify-between font-medium">
                  <span className="truncate pr-2">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="shrink-0 font-bold">
                    {formatIDR(item.price * item.quantity)}
                  </span>
                </div>
                {item.note && (
                  <div className="text-[10px] text-zinc-500 pl-4 italic">
                    Note: {item.note}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Breakdown */}
          <div className="py-3 border-b border-dashed border-zinc-400 space-y-1.5 text-[11px]">
            <div className="flex justify-between text-zinc-600">
              <span>Subtotal</span>
              <span>{formatIDR(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-zinc-600">
              <span>PB1 Tax (10%)</span>
              <span>{formatIDR(order.tax)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Discount</span>
                <span>-{formatIDR(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-black pt-1 border-t border-zinc-300">
              <span>TOTAL</span>
              <span>{formatIDR(order.total)}</span>
            </div>
          </div>

          {/* Payment Details */}
          <div className="pt-3 text-[10px] text-zinc-600 space-y-1">
            <div className="flex justify-between">
              <span>Payment Method:</span>
              <span className="font-bold uppercase text-zinc-900">{order.paymentMethod}</span>
            </div>
            {order.paymentMethod === 'cash' && order.cashTendered && (
              <>
                <div className="flex justify-between">
                  <span>Cash Tendered:</span>
                  <span>{formatIDR(order.cashTendered)}</span>
                </div>
                <div className="flex justify-between font-bold text-zinc-900">
                  <span>Change:</span>
                  <span>{formatIDR(order.changeAmount || 0)}</span>
                </div>
              </>
            )}
            {order.notes && (
              <div className="pt-1 text-[10px] text-zinc-500">
                Memo: {order.notes}
              </div>
            )}
          </div>

          {/* Receipt Footer */}
          <div className="pt-4 mt-3 border-t border-dashed border-zinc-300 text-center text-[10px] text-zinc-500 space-y-0.5">
            <p>Thank you for stopping by!</p>
            <p className="font-mono text-[9px]">wifi: crib_society / rebelcoffee</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-2 pt-2">
          <Button
            variant="outline"
            size="md"
            onClick={handlePrint}
            leftIcon={Printer}
          >
            Print Receipt
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={onStartNewOrder}
            leftIcon={RotateCcw}
          >
            Start New Order
          </Button>
        </div>
      </div>
    </Modal>
  );
}
