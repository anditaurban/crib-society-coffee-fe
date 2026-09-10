import React, { useState } from 'react';
import {
  QrCode,
  Banknote,
  CreditCard,
  Building2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { formatIDR } from '../../utils/format';
import { cn } from '../../utils/cn';

const PAYMENT_METHODS = [
  {
    id: 'qris',
    label: 'QRIS',
    subtitle: 'GoPay, OVO, BCA, Dana',
    icon: QrCode,
  },
  {
    id: 'cash',
    label: 'Cash',
    subtitle: 'Cash tender & change',
    icon: Banknote,
  },
  {
    id: 'card',
    label: 'Debit / Card',
    subtitle: 'EDC Terminal / Chip',
    icon: CreditCard,
  },
  {
    id: 'transfer',
    label: 'Bank Transfer',
    subtitle: 'BCA / Mandiri / VA',
    icon: Building2,
  },
];

export function PaymentModal({
  isOpen,
  onClose,
  items = [],
  customerName = 'Guest',
  orderType = 'dine_in',
  onConfirmPayment,
  isSubmitting = false,
}) {
  const [selectedMethod, setSelectedMethod] = useState('qris');
  const [notes, setNotes] = useState('');
  const [cashTendered, setCashTendered] = useState('');

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  const tenderedNumber = Number(cashTendered) || 0;
  const changeAmount = Math.max(0, tenderedNumber - total);
  const isCashInsufficient = selectedMethod === 'cash' && tenderedNumber < total;

  // Preset cash suggestions
  const getCashPresets = (totalAmount) => {
    const presets = [totalAmount];
    const rounded50k = Math.ceil(totalAmount / 50000) * 50000;
    const rounded100k = Math.ceil(totalAmount / 100000) * 100000;
    if (rounded50k > totalAmount && !presets.includes(rounded50k)) presets.push(rounded50k);
    if (rounded100k > totalAmount && !presets.includes(rounded100k)) presets.push(rounded100k);
    if (!presets.includes(100000) && 100000 > totalAmount) presets.push(100000);
    if (!presets.includes(200000) && 200000 > totalAmount) presets.push(200000);
    return presets.slice(0, 4);
  };

  const handleComplete = () => {
    onConfirmPayment({
      paymentMethod: selectedMethod,
      customerName: customerName.trim() || 'Guest',
      orderType,
      notes,
      cashTendered: selectedMethod === 'cash' ? tenderedNumber : total,
      changeAmount: selectedMethod === 'cash' ? changeAmount : 0,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Checkout & Payment"
      description={`Order total for ${items.length} items (${orderType === 'dine_in' ? 'Dine In' : 'Takeaway'})`}
      maxWidth="max-w-xl"
    >
      <div className="space-y-5 pt-2">
        {/* Total Highlight Bar */}
        <div className="p-4 rounded-xl bg-crib-ink border border-crib-border/80 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest text-crib-warm-gray font-mono font-semibold">
              Total Amount Due
            </span>
            <div className="text-2xl font-black font-mono text-crib-cream mt-0.5">
              {formatIDR(total)}
            </div>
          </div>
          <div className="text-right text-xs text-crib-warm-gray">
            <div>Customer: <span className="font-semibold text-crib-cream">{customerName || 'Guest'}</span></div>
            <div>Subtotal: <span className="font-mono text-crib-cream">{formatIDR(subtotal)}</span></div>
            <div>Tax (10%): <span className="font-mono text-crib-cream">{formatIDR(tax)}</span></div>
          </div>
        </div>

        {/* Payment Method Selector Grid */}
        <div className="space-y-2">
          <label className="block text-xs uppercase tracking-wider font-semibold text-crib-warm-gray">
            Select Payment Method
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {PAYMENT_METHODS.map((method) => {
              const Icon = method.icon;
              const isSelected = selectedMethod === method.id;
              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => {
                    setSelectedMethod(method.id);
                    if (method.id === 'cash' && (!cashTendered || Number(cashTendered) <= 0)) {
                      setCashTendered(total.toString());
                    }
                  }}
                  className={cn(
                    'flex items-start gap-3 p-3 rounded-xl border text-left transition-all duration-150',
                    isSelected
                      ? 'bg-crib-red/15 border-crib-red ring-1 ring-crib-red/60 text-crib-cream'
                      : 'bg-crib-ink/60 border-crib-border hover:border-crib-warm-gray/60 text-crib-warm-gray'
                  )}
                >
                  <div
                    className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5',
                      isSelected ? 'bg-crib-red text-white' : 'bg-crib-charcoal text-crib-warm-gray'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold font-display text-crib-cream">
                      {method.label}
                    </div>
                    <div className="text-[11px] text-crib-warm-gray mt-0.5 leading-tight">
                      {method.subtitle}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Method-Specific Detail Panels */}
        {selectedMethod === 'qris' && (
          <div className="p-4 rounded-xl bg-crib-ink/80 border border-crib-border text-center space-y-3">
            <div className="inline-block p-3 bg-white rounded-xl shadow-md">
              {/* Stylized QR placeholder with actual QR matrix look */}
              <div className="w-36 h-36 bg-zinc-100 p-2 flex flex-col justify-between rounded border border-zinc-300 relative">
                <div className="flex justify-between">
                  <div className="w-9 h-9 border-4 border-black p-1 flex items-center justify-center">
                    <div className="w-3 h-3 bg-black" />
                  </div>
                  <div className="w-9 h-9 border-4 border-black p-1 flex items-center justify-center">
                    <div className="w-3 h-3 bg-black" />
                  </div>
                </div>
                <div className="text-[9px] font-black text-black tracking-widest uppercase">
                  QRIS • CRIB SOCIETY
                </div>
                <div className="flex justify-between items-end">
                  <div className="w-9 h-9 border-4 border-black p-1 flex items-center justify-center">
                    <div className="w-3 h-3 bg-black" />
                  </div>
                  <div className="grid grid-cols-2 gap-1 w-9 h-9 p-0.5">
                    <div className="bg-black" />
                    <div className="bg-zinc-300" />
                    <div className="bg-zinc-300" />
                    <div className="bg-black" />
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs text-crib-warm-gray">
              Customer can scan using any banking app or e-wallet supporting QRIS.
            </p>
          </div>
        )}

        {selectedMethod === 'cash' && (
          <div className="p-4 rounded-xl bg-crib-ink/80 border border-crib-border space-y-3">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-crib-warm-gray mb-1.5">
                Cash Received (Tendered)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-crib-warm-gray">
                  Rp
                </span>
                <input
                  type="number"
                  value={cashTendered}
                  onChange={(e) => setCashTendered(e.target.value)}
                  placeholder={total.toString()}
                  className="w-full bg-crib-charcoal border border-crib-border rounded-xl pl-9 pr-3 py-2 text-base font-mono font-bold text-crib-cream focus:outline-none focus:border-crib-red"
                />
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5">
              {getCashPresets(total).map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setCashTendered(preset.toString())}
                  className="px-2.5 py-1 rounded-lg bg-crib-charcoal border border-crib-border text-xs font-mono font-medium text-crib-warm-gray hover:text-crib-cream hover:border-crib-warm-gray"
                >
                  {preset === total ? 'Exact Amount' : formatIDR(preset)}
                </button>
              ))}
            </div>

            {/* Change Result */}
            {tenderedNumber > 0 && (
              <div className="pt-2 border-t border-crib-border/50 flex justify-between items-center text-sm">
                <span className="text-xs uppercase tracking-wider font-semibold text-crib-warm-gray">
                  Change (Kembalian)
                </span>
                <span
                  className={cn(
                    'font-mono font-bold text-base',
                    isCashInsufficient ? 'text-rose-400' : 'text-emerald-400'
                  )}
                >
                  {isCashInsufficient
                    ? `Kurang ${formatIDR(total - tenderedNumber)}`
                    : formatIDR(changeAmount)}
                </span>
              </div>
            )}
          </div>
        )}

        {selectedMethod === 'card' && (
          <div className="p-4 rounded-xl bg-crib-ink/80 border border-crib-border space-y-2 text-center">
            <CreditCard className="w-8 h-8 text-crib-red mx-auto" />
            <p className="text-xs text-crib-cream font-medium">
              Insert or tap customer card on EDC terminal
            </p>
            <p className="text-[11px] text-crib-warm-gray">
              Supports Visa, Mastercard, BCA Card, GPN Debit.
            </p>
          </div>
        )}

        {selectedMethod === 'transfer' && (
          <div className="p-4 rounded-xl bg-crib-ink/80 border border-crib-border space-y-2">
            <div className="text-xs text-crib-cream font-semibold">BCA Virtual Account:</div>
            <div className="font-mono text-sm font-bold text-crib-red p-2 bg-crib-charcoal rounded-lg border border-crib-border">
              8801 0812 9982 4410
            </div>
            <p className="text-[11px] text-crib-warm-gray">
              Confirm transfer matches exactly {formatIDR(total)}.
            </p>
          </div>
        )}

        {/* Order Notes Field */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-crib-warm-gray mb-1">
            Order Notes (Optional)
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. VIP guest, urgent preparation, no straw"
            className="w-full bg-crib-ink border border-crib-border rounded-xl px-3 py-2 text-xs text-crib-cream placeholder:text-crib-warm-gray/50 focus:outline-none focus:border-crib-red"
          />
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-crib-border/60">
          <Button variant="outline" size="md" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleComplete}
            isLoading={isSubmitting}
            disabled={isCashInsufficient}
            rightIcon={ArrowRight}
          >
            Complete Order • {formatIDR(total)}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
