import React from 'react';
import { cn } from '../../utils/cn';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination({
  currentPage = 1,
  totalPages = 1,
  totalItems,
  onPageChange,
  className,
}) {
  if (totalPages <= 1 && !totalItems) return null;

  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 text-xs text-crib-warm-gray',
        className
      )}
    >
      {totalItems !== undefined && (
        <p>
          Showing page <span className="font-semibold text-crib-cream">{currentPage}</span> of{' '}
          <span className="font-semibold text-crib-cream">{totalPages}</span> ({totalItems} items)
        </p>
      )}

      <div className="flex items-center gap-1.5 ml-auto">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous page"
          className="flex items-center justify-center w-8 h-8 rounded-lg border border-crib-border bg-crib-charcoal text-crib-cream disabled:opacity-40 disabled:pointer-events-none hover:bg-surface-hover transition-colors focus-ring"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span className="px-3 py-1 text-xs font-semibold text-crib-cream">
          {currentPage} / {totalPages}
        </span>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Next page"
          className="flex items-center justify-center w-8 h-8 rounded-lg border border-crib-border bg-crib-charcoal text-crib-cream disabled:opacity-40 disabled:pointer-events-none hover:bg-surface-hover transition-colors focus-ring"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
