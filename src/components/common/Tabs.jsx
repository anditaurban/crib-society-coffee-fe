import React from 'react';
import { cn } from '../../utils/cn';

export function Tabs({ tabs = [], activeTab, onChange, className }) {
  return (
    <div className={cn('flex items-center gap-1 border-b border-crib-border/80 overflow-x-auto no-scrollbar', className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative py-2.5 px-4 text-xs font-semibold uppercase tracking-wider transition-colors duration-150 whitespace-nowrap focus-ring',
              isActive
                ? 'text-crib-cream'
                : 'text-crib-warm-gray hover:text-crib-cream/80'
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={cn(
                  'ml-2 px-1.5 py-0.5 rounded-full text-[10px]',
                  isActive
                    ? 'bg-crib-red text-white'
                    : 'bg-zinc-800 text-crib-warm-gray'
                )}
              >
                {tab.count}
              </span>
            )}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-crib-red rounded-t-sm" />
            )}
          </button>
        );
      })}
    </div>
  );
}
