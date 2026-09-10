import React from 'react';
import { cn } from '../../utils/cn';
import { Button } from '../common/Button';
import { Coffee } from 'lucide-react';

export function EmptyState({
  icon: Icon = Coffee,
  title = 'No items found',
  description = 'There are no records matching your current filter or request.',
  actionLabel,
  onAction,
  className,
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-6 text-center rounded-xl bg-crib-charcoal/40 border border-dashed border-crib-border',
        className
      )}
    >
      <div className="w-12 h-12 rounded-2xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-crib-warm-gray mb-4 shadow-subtle">
        <Icon className="w-6 h-6 text-crib-cream" />
      </div>
      <h4 className="text-base font-bold font-display text-crib-cream tracking-tight">
        {title}
      </h4>
      <p className="text-xs text-crib-warm-gray mt-1.5 max-w-sm leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <div className="mt-5">
          <Button variant="primary" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
