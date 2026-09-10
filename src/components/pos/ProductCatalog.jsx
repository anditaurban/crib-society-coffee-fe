import React from 'react';
import { Search, X, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { LoadingState } from '../feedback/LoadingState';
import { EmptyState } from '../feedback/EmptyState';
import { ErrorState } from '../feedback/ErrorState';
import { cn } from '../../utils/cn';

export function ProductCatalog({
  products = [],
  categories = [],
  selectedCategory = 'all',
  onSelectCategory,
  searchQuery = '',
  onSearchChange,
  onlyInStock = false,
  onToggleInStock,
  onAddToCart,
  cartItems = [],
  isLoading = false,
  error = null,
  onRetry,
}) {
  const getCartQuantity = (productId) => {
    const item = cartItems.find((i) => i.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Top Search and Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search input with fast clear */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-crib-warm-gray absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search coffee, tea, pastries..."
            className="w-full bg-crib-charcoal border border-crib-border rounded-xl pl-10 pr-9 py-2.5 text-sm text-crib-cream placeholder:text-crib-warm-gray/60 focus:outline-none focus:border-crib-red transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-crib-warm-gray hover:text-crib-cream transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Stock Filter Toggle */}
        <button
          type="button"
          onClick={onToggleInStock}
          className={cn(
            'flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-semibold tracking-wide font-display transition-colors shrink-0',
            onlyInStock
              ? 'bg-crib-red/20 border-crib-red text-crib-cream'
              : 'bg-crib-charcoal border-crib-border text-crib-warm-gray hover:border-crib-warm-gray/50'
          )}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>In-Stock Only</span>
        </button>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar -mx-1 px-1">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-semibold font-display uppercase tracking-wider whitespace-nowrap transition-all duration-150 shrink-0 select-none',
                isActive
                  ? 'bg-crib-red text-white shadow-md shadow-red-950/40 font-bold'
                  : 'bg-crib-charcoal text-crib-warm-gray hover:text-crib-cream hover:bg-crib-charcoal/80 border border-crib-border/80'
              )}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Catalog Content Area */}
      <div className="flex-1 min-h-[360px]">
        {isLoading ? (
          <div className="h-72 flex items-center justify-center">
            <LoadingState message="Loading catalog..." />
          </div>
        ) : error ? (
          <div className="h-72 flex items-center justify-center">
            <ErrorState
              title="Failed to load products"
              description={error}
              actionLabel="Retry"
              onAction={onRetry}
            />
          </div>
        ) : products.length === 0 ? (
          <div className="h-72 flex items-center justify-center">
            <EmptyState
              title="No products found"
              description={
                searchQuery
                  ? `No items matching "${searchQuery}". Try a different keyword or reset filters.`
                  : 'No products available in this category.'
              }
              actionLabel="Reset Filters"
              onAction={() => {
                onSearchChange('');
                onSelectCategory('all');
                if (onlyInStock) onToggleInStock();
              }}
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                cartQuantity={getCartQuantity(product.id)}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
