import React, { useState } from 'react';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  MessageSquare,
  ArrowRight,
  Coffee,
  User,
  Utensils,
  Package,
} from 'lucide-react';
import { Button } from '../common/Button';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { formatIDR } from '../../utils/format';
import { cn } from '../../utils/cn';

export function CartPanel({
  items = [],
  customerName = '',
  onCustomerNameChange,
  orderType = 'dine_in',
  onOrderTypeChange,
  orderNotes = '',
  onOrderNotesChange,
  onUpdateQuantity,
  onRemoveItem,
  onUpdateItemNote,
  onClearCart,
  onOpenCheckout,
  className,
}) {
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [activeNoteItemId, setActiveNoteItemId] = useState(null);
  const [tempNoteText, setTempNoteText] = useState('');

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.1); // 10% tax
  const discount = 0;
  const total = subtotal + tax - discount;
  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleOpenNote = (item) => {
    setActiveNoteItemId(item.id);
    setTempNoteText(item.note || '');
  };

  const handleSaveNote = (itemId) => {
    onUpdateItemNote(itemId, tempNoteText);
    setActiveNoteItemId(null);
  };

  return (
    <div
      className={cn(
        'flex flex-col h-full bg-crib-charcoal rounded-2xl border border-crib-border shadow-elevated overflow-hidden',
        className
      )}
    >
      {/* Cart Header */}
      <div className="p-4 border-b border-crib-border/80 flex items-center justify-between bg-crib-ink/40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-crib-red/20 text-crib-red flex items-center justify-center font-bold">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold font-display text-crib-cream">Active Order</h2>
            <span className="text-xs text-crib-warm-gray font-mono">
              {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>

        {items.length > 0 && (
          <button
            type="button"
            onClick={() => setShowClearConfirm(true)}
            className="text-xs text-crib-warm-gray hover:text-rose-400 p-1.5 rounded-lg hover:bg-red-950/30 transition-colors flex items-center gap-1 font-medium"
            title="Clear Cart"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        )}
      </div>

      {/* Order Context: Dine-In vs Takeaway & Customer Name */}
      <div className="p-3.5 border-b border-crib-border/60 bg-crib-charcoal/50 space-y-2.5">
        {/* Type Toggle */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-crib-ink rounded-xl border border-crib-border/60">
          <button
            type="button"
            onClick={() => onOrderTypeChange('dine_in')}
            className={cn(
              'flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg text-xs font-semibold font-display tracking-wide transition-all',
              orderType === 'dine_in'
                ? 'bg-crib-red text-white shadow-sm'
                : 'text-crib-warm-gray hover:text-crib-cream'
            )}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Dine In</span>
          </button>
          <button
            type="button"
            onClick={() => onOrderTypeChange('takeaway')}
            className={cn(
              'flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg text-xs font-semibold font-display tracking-wide transition-all',
              orderType === 'takeaway'
                ? 'bg-crib-red text-white shadow-sm'
                : 'text-crib-warm-gray hover:text-crib-cream'
            )}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Takeaway</span>
          </button>
        </div>

        {/* Customer / Table info */}
        <div className="relative">
          <User className="w-3.5 h-3.5 text-crib-warm-gray absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={customerName}
            onChange={(e) => onCustomerNameChange(e.target.value)}
            placeholder="Customer name or Table (e.g. Maya #03)"
            className="w-full bg-crib-ink/70 border border-crib-border/70 rounded-xl pl-8 pr-3 py-1.5 text-xs text-crib-cream placeholder:text-crib-warm-gray/50 focus:outline-none focus:border-crib-red transition-colors"
          />
        </div>
      </div>

      {/* Cart Items List */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3 min-h-[220px]">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-crib-warm-gray">
            <div className="w-14 h-14 rounded-2xl bg-crib-ink/80 border border-crib-border/60 flex items-center justify-center mb-3 text-crib-warm-gray/60">
              <Coffee className="w-7 h-7" />
            </div>
            <p className="text-sm font-semibold text-crib-cream font-display">Order tray is empty</p>
            <p className="text-xs text-crib-warm-gray/70 mt-1 max-w-[200px]">
              Tap any coffee or snack from the catalog to build this order.
            </p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="p-3 bg-crib-ink/50 border border-crib-border/60 rounded-xl space-y-2 group transition-colors hover:border-crib-border"
            >
              {/* Top Row: Name & Price */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-semibold font-display text-crib-cream truncate">
                    {item.name}
                  </h4>
                  <span className="text-[11px] text-crib-warm-gray font-mono">
                    {formatIDR(item.price)} each
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold font-mono text-crib-cream block">
                    {formatIDR(item.price * item.quantity)}
                  </span>
                </div>
              </div>

              {/* Note display or edit input */}
              {activeNoteItemId === item.id ? (
                <div className="flex items-center gap-1.5 pt-1">
                  <input
                    type="text"
                    value={tempNoteText}
                    onChange={(e) => setTempNoteText(e.target.value)}
                    placeholder="e.g. Less sweet, extra ice..."
                    autoFocus
                    className="flex-1 bg-crib-charcoal border border-crib-red/60 rounded-lg px-2.5 py-1 text-[11px] text-crib-cream focus:outline-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveNote(item.id);
                      if (e.key === 'Escape') setActiveNoteItemId(null);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleSaveNote(item.id)}
                    className="px-2 py-1 bg-crib-red text-white text-[11px] font-bold rounded-lg"
                  >
                    Save
                  </button>
                </div>
              ) : item.note ? (
                <div
                  onClick={() => handleOpenNote(item)}
                  className="flex items-center gap-1 text-[11px] text-crib-red bg-crib-red/10 px-2 py-0.5 rounded cursor-pointer hover:bg-crib-red/20 transition-colors w-fit"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span className="truncate max-w-[200px] italic">"{item.note}"</span>
                </div>
              ) : null}

              {/* Bottom Row: Item Modifier Controls */}
              <div className="flex items-center justify-between pt-1 border-t border-crib-border/30">
                <button
                  type="button"
                  onClick={() => handleOpenNote(item)}
                  className="text-[10px] text-crib-warm-gray hover:text-crib-cream flex items-center gap-1 transition-colors"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>{item.note ? 'Edit note' : '+ Add note'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="w-6 h-6 rounded-md bg-crib-charcoal border border-crib-border flex items-center justify-center text-crib-cream hover:bg-crib-border active:scale-95 transition-all"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold font-mono text-crib-cream w-5 text-center">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="w-6 h-6 rounded-md bg-crib-charcoal border border-crib-border flex items-center justify-center text-crib-cream hover:bg-crib-border active:scale-95 transition-all"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    className="ml-1 text-crib-warm-gray hover:text-rose-400 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Cart Summary & Checkout Trigger */}
      <div className="p-4 border-t border-crib-border/80 bg-crib-ink/60 space-y-3">
        {/* Pricing Rows */}
        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between text-crib-warm-gray">
            <span>Subtotal</span>
            <span className="font-mono text-crib-cream">{formatIDR(subtotal)}</span>
          </div>
          <div className="flex justify-between text-crib-warm-gray">
            <span>PB1 / Tax (10%)</span>
            <span className="font-mono text-crib-cream">{formatIDR(tax)}</span>
          </div>
          <div className="pt-2 border-t border-crib-border/40 flex justify-between items-baseline">
            <span className="text-sm font-bold font-display text-crib-cream uppercase tracking-wide">
              Total
            </span>
            <span className="text-lg font-extrabold font-mono text-crib-cream tracking-tight">
              {formatIDR(total)}
            </span>
          </div>
        </div>

        {/* Primary Payment Action */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={items.length === 0}
          onClick={onOpenCheckout}
          rightIcon={ArrowRight}
          className="shadow-elevated shadow-red-950/50"
        >
          Proceed to Pay • {formatIDR(total)}
        </Button>
      </div>

      {/* Clear Cart Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        onConfirm={() => {
          onClearCart();
          setShowClearConfirm(false);
        }}
        title="Clear Current Order?"
        message="Are you sure you want to remove all items from this order? This cannot be undone."
        confirmText="Clear Order"
        cancelText="Keep Items"
        isDestructive
      />
    </div>
  );
}
