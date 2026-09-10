import React from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

const VARIANTS = {
  primary:
    'bg-crib-red text-white hover:bg-crib-red-light active:bg-crib-red-dark shadow-red/20 hover:shadow-red/40 border border-transparent',
  secondary:
    'bg-crib-charcoal text-crib-cream hover:bg-surface-hover active:bg-crib-ink border border-crib-border',
  outline:
    'bg-transparent text-crib-cream border border-crib-border hover:border-crib-warm-gray hover:bg-crib-charcoal/50 active:bg-crib-charcoal',
  ghost:
    'bg-transparent text-crib-cream hover:bg-crib-charcoal/60 active:bg-crib-charcoal border border-transparent',
  danger:
    'bg-red-950/80 text-red-300 border border-red-800/80 hover:bg-red-900/90 active:bg-red-950',
};

const SIZES = {
  sm: 'h-8 px-3 text-xs tracking-wider uppercase font-semibold rounded-md gap-1.5',
  md: 'h-10 px-4 text-sm font-medium rounded-lg gap-2',
  lg: 'h-12 px-6 text-base font-semibold rounded-xl gap-2.5',
};

export const Button = React.forwardRef(function Button(
  {
    children,
    className,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled = false,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    fullWidth = false,
    type = 'button',
    ...props
  },
  ref
) {
  const isDisabled = disabled || isLoading;

  const renderIcon = (icon) => {
    if (!icon) return null;
    if (React.isValidElement(icon)) return icon;
    const IconComponent = icon;
    return <IconComponent className="w-4 h-4 shrink-0" />;
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      className={cn(
        'inline-flex items-center justify-center font-display transition-all duration-200 cursor-pointer select-none focus-ring',
        VARIANTS[variant] || VARIANTS.primary,
        SIZES[size] || SIZES.md,
        fullWidth && 'w-full',
        isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
      )}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        renderIcon(LeftIcon)
      )}
      <span>{children}</span>
      {!isLoading && renderIcon(RightIcon)}
    </button>
  );
});
