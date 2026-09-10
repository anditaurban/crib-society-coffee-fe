import React from 'react';
import { cn } from '../../utils/cn';

export const Input = React.forwardRef(function Input(
  {
    label,
    error,
    helperText,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    className,
    containerClassName,
    id,
    type = 'text',
    disabled = false,
    ...props
  },
  ref
) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={cn('w-full space-y-1.5', containerClassName)}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs uppercase tracking-wider font-semibold text-crib-warm-gray"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {LeftIcon && (
          <div className="absolute left-3.5 pointer-events-none text-crib-warm-gray">
            <LeftIcon className="w-4 h-4" />
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          type={type}
          disabled={disabled}
          className={cn(
            'w-full rounded-lg bg-crib-charcoal border border-crib-border px-3.5 py-2.5 text-sm text-crib-cream placeholder:text-crib-warm-gray/60 transition-colors focus-ring',
            LeftIcon && 'pl-10',
            RightIcon && 'pr-10',
            error && 'border-crib-red focus-visible:ring-crib-red',
            disabled && 'opacity-50 cursor-not-allowed bg-crib-ink',
            className
          )}
          {...props}
        />

        {RightIcon && (
          <div className="absolute right-3.5 pointer-events-none text-crib-warm-gray">
            <RightIcon className="w-4 h-4" />
          </div>
        )}
      </div>

      {error ? (
        <p className="text-xs text-red-400 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-crib-warm-gray/80">{helperText}</p>
      ) : null}
    </div>
  );
});
