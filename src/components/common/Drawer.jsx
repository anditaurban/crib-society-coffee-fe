import React, { useEffect } from 'react';
import { cn } from '../../utils/cn';
import { X } from 'lucide-react';

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  position = 'left',
  width = 'w-80 max-w-[85vw]',
  className,
}) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) onClose();
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-200"
      />

      {/* Drawer Panel */}
      <div
        className={cn(
          'fixed inset-y-0 flex flex-col bg-crib-charcoal border-crib-border shadow-2xl z-10 transition-transform duration-200 ease-out',
          position === 'left' ? 'left-0 border-r animate-in slide-in-from-left' : 'right-0 border-l animate-in slide-in-from-right',
          width,
          className
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-crib-border">
          {title ? (
            <h3 className="text-base font-bold font-display uppercase tracking-wider text-crib-cream">
              {title}
            </h3>
          ) : (
            <span />
          )}
          <button
            onClick={onClose}
            aria-label="Close drawer"
            className="rounded-lg p-1.5 text-crib-warm-gray hover:text-crib-cream hover:bg-surface-hover transition-colors focus-ring"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
}
