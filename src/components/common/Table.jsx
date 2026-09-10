import React from 'react';
import { cn } from '../../utils/cn';

export function Table({ children, className }) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-crib-border/80 bg-crib-charcoal">
      <table className={cn('w-full text-left text-sm text-crib-cream', className)}>
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children, className }) {
  return (
    <thead
      className={cn(
        'bg-surface-secondary text-xs uppercase tracking-wider font-semibold text-crib-warm-gray border-b border-crib-border',
        className
      )}
    >
      {children}
    </thead>
  );
}

export function TableRow({ children, className, isClickable = false, ...props }) {
  return (
    <tr
      className={cn(
        'border-b border-crib-border/50 last:border-0 transition-colors',
        isClickable && 'cursor-pointer hover:bg-surface-hover/70',
        className
      )}
      {...props}
    >
      {children}
    </tr>
  );
}

export function TableHeaderCell({ children, className }) {
  return <th className={cn('py-3.5 px-4 font-display font-bold', className)}>{children}</th>;
}

export function TableCell({ children, className }) {
  return <td className={cn('py-3.5 px-4 align-middle text-crib-cream/90', className)}>{children}</td>;
}
