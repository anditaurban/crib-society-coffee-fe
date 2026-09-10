import React from 'react';
import { cn } from '../../utils/cn';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const TOAST_ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  danger: AlertCircle,
  warning: AlertCircle,
  info: Info,
  neutral: Info,
};

const TOAST_STYLES = {
  success: 'border-emerald-700/80 bg-zinc-900/95 text-emerald-200',
  error: 'border-rose-700/80 bg-zinc-900/95 text-rose-200',
  danger: 'border-rose-700/80 bg-zinc-900/95 text-rose-200',
  warning: 'border-amber-700/80 bg-zinc-900/95 text-amber-200',
  info: 'border-sky-700/80 bg-zinc-900/95 text-sky-200',
  neutral: 'border-zinc-700/80 bg-zinc-900/95 text-zinc-200',
};

export function Toast({ id, type = 'success', message, onDismiss }) {
  const Icon = TOAST_ICONS[type] || TOAST_ICONS.info;

  return (
    <div
      role="status"
      className={cn(
        'flex items-center gap-3 w-full max-w-sm p-4 rounded-xl border shadow-elevated backdrop-blur-md transition-all duration-200 animate-in slide-in-from-top-2',
        TOAST_STYLES[type]
      )}
    >
      <Icon className="w-5 h-5 shrink-0" />
      <p className="flex-1 text-xs font-medium leading-relaxed">{message}</p>
      <button
        onClick={() => onDismiss(id)}
        aria-label="Dismiss toast"
        className="text-crib-warm-gray hover:text-crib-cream transition-colors p-1 rounded"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export function ToastContainer({ toasts = [], onDismiss }) {
  if (!toasts.length) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-auto">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}
