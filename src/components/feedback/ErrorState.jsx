import React from 'react';
import { cn } from '../../utils/cn';
import { Button } from '../common/Button';
import { AlertCircle, RotateCcw } from 'lucide-react';

export function ErrorState({
  title = 'Failed to load data',
  message = 'An unexpected network error occurred while connecting to Crib services.',
  onRetry,
  retryLabel = 'Try Again',
  className,
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-6 text-center rounded-xl bg-red-950/20 border border-red-900/40',
        className
      )}
    >
      <div className="w-12 h-12 rounded-2xl bg-red-950/80 border border-red-800/80 flex items-center justify-center text-crib-red mb-4 shadow-subtle">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h4 className="text-base font-bold font-display text-crib-cream tracking-tight">
        {title}
      </h4>
      <p className="text-xs text-red-200/80 mt-1.5 max-w-sm leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <div className="mt-5">
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            leftIcon={RotateCcw}
            className="border-red-800/60 hover:border-red-600 text-red-100"
          >
            {retryLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
