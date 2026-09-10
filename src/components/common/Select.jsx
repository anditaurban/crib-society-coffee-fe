import React from 'react';
import { cn } from '../../utils/cn';
import { ChevronDown } from 'lucide-react';

export const Select = React.forwardRef(function Select(
  {
    label,
    options = [],
    error,
    helperText,
    className,
    containerClassName,
    id,
    disabled = false,
    ...props
  },
  ref
) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={cn('w-full space-y-1.5', containerClassName)}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs uppercase tracking-wider font-semibold text-crib-warm-gray"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          className={cn(
            'w-full appearance-none rounded-lg bg-crib-charcoal border border-crib-border px-3.5 py-2.5 pr-10 text-sm text-crib-cream transition-colors focus-ring cursor-pointer',
            error && 'border-crib-red focus-visible:ring-crib-red',
            disabled && 'opacity-50 cursor-not-allowed bg-crib-ink',
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option
              key={opt.value ?? opt.id}
              value={opt.value ?? opt.id}
              className="bg-crib-charcoal text-crib-cream py-1"
            >
              {opt.label ?? opt.name}
            </option>
          ))}
        </select>
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-crib-warm-gray">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {error ? (
        <p className="text-xs text-red-400 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-crib-warm-gray/80">{helperText}</p>
      ) : null}
    </div>
  );
});
