import React from 'react';
import { cn } from '../../utils/cn';

const BADGE_VARIANTS = {
  neutral: 'bg-zinc-800 text-zinc-300 border-zinc-700',
  primary: 'bg-red-950/70 text-red-200 border-red-800/60',
  success: 'bg-emerald-950/70 text-emerald-300 border-emerald-800/60',
  warning: 'bg-amber-950/70 text-amber-300 border-amber-800/60',
  danger: 'bg-rose-950/70 text-rose-300 border-rose-800/60',
  info: 'bg-sky-950/70 text-sky-300 border-sky-800/60',
};

const SIZES = {
  sm: 'px-2 py-0.5 text-[11px]',
  md: 'px-2.5 py-1 text-xs',
};

export function Badge({
  children,
  variant = 'neutral',
  size = 'sm',
  dot = false,
  className,
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-full border tracking-wide uppercase font-display',
        BADGE_VARIANTS[variant] || BADGE_VARIANTS.neutral,
        SIZES[size] || SIZES.sm,
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full',
            variant === 'success' && 'bg-emerald-400',
            variant === 'warning' && 'bg-amber-400',
            variant === 'danger' && 'bg-rose-400',
            variant === 'info' && 'bg-sky-400',
            variant === 'primary' && 'bg-crib-red',
            variant === 'neutral' && 'bg-zinc-400'
          )}
        />
      )}
      {children}
    </span>
  );
}
