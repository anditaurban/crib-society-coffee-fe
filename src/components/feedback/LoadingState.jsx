import React from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

export function LoadingState({
  message = 'Loading data...',
  description = 'Fetching latest information from Crib Society network',
  className,
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-4 text-center rounded-xl bg-crib-charcoal/40 border border-crib-border/40',
        className
      )}
    >
      <div className="relative flex items-center justify-center mb-4">
        <div className="w-12 h-12 rounded-full border-2 border-crib-red/20 border-t-crib-red animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-crib-red" />
        </div>
      </div>
      <h4 className="text-sm font-bold font-display text-crib-cream uppercase tracking-wider">
        {message}
      </h4>
      {description && (
        <p className="text-xs text-crib-warm-gray mt-1 max-w-xs leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

export function Skeleton({ className }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-zinc-800/80',
        className
      )}
    />
  );
}
