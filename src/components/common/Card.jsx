import React from 'react';
import { cn } from '../../utils/cn';

export function Card({ children, className, hoverEffect = false, ...props }) {
  return (
    <div
      className={cn(
        'rounded-xl bg-crib-charcoal border border-crib-border/80 shadow-subtle p-5',
        hoverEffect &&
          'transition-all duration-200 hover:border-crib-warm-gray/50 hover:shadow-elevated hover:-translate-y-0.5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }) {
  return (
    <div className={cn('flex items-center justify-between pb-4 border-b border-crib-border/60', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className, ...props }) {
  return (
    <h3 className={cn('text-lg font-bold font-display tracking-tight text-crib-cream', className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className, ...props }) {
  return (
    <p className={cn('text-xs text-crib-warm-gray mt-0.5', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ children, className, ...props }) {
  return (
    <div className={cn('pt-4', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...props }) {
  return (
    <div className={cn('pt-4 mt-4 border-t border-crib-border/60 flex items-center justify-between', className)} {...props}>
      {children}
    </div>
  );
}
