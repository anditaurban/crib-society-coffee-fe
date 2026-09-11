import React from 'react';
import { Plus, ShoppingBag, AlertCircle } from 'lucide-react';
import { Badge } from '../common/Badge';
import { formatIDR } from '../../utils/format';
import { cn } from '../../utils/cn';

export function ProductCard({ product, onAddToCart, cartQuantity = 0 }) {
  const isOutOfStock = product.status === 'out_of_stock' || product.stock <= 0;
  const isLowStock = !isOutOfStock && product.stock <= 5;

  return (
    <div
      role="button"
      tabIndex={isOutOfStock ? -1 : 0}
      onClick={() => {
        if (!isOutOfStock) {
          onAddToCart(product);
        }
      }}
      onKeyDown={(e) => {
        if (!isOutOfStock && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onAddToCart(product);
        }
      }}
      className={cn(
        'group relative flex flex-col justify-between bg-crib-charcoal rounded-xl border border-crib-border/80 overflow-hidden transition-all duration-200 text-left select-none',
        !isOutOfStock &&
          'hover:border-crib-red/60 hover:shadow-card hover:-translate-y-0.5 cursor-pointer active:scale-[0.99] focus-ring',
        isOutOfStock && 'opacity-60 cursor-not-allowed bg-crib-ink/80',
        cartQuantity > 0 && 'border-crib-red/80 ring-1 ring-crib-red/40'
      )}
    >
      {/* Product Image Box */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-crib-ink">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className={cn(
            'w-full h-full object-cover transition-transform duration-300',
            !isOutOfStock && 'group-hover:scale-105',
            isOutOfStock && 'grayscale'
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-crib-charcoal via-transparent to-transparent opacity-60" />

        {/* Status & Stock Badges */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1 z-10">
          {isOutOfStock ? (
            <Badge variant="danger" size="sm" dot>
              Sold Out
            </Badge>
          ) : isLowStock ? (
            <Badge variant="warning" size="sm" dot>
              Only {product.stock} Left
            </Badge>
          ) : (
            <Badge variant="neutral" size="sm">
              Stock {product.stock}
            </Badge>
          )}
        </div>

        {/* In-cart count badge */}
        {cartQuantity > 0 && (
          <div className="absolute top-2 right-2 bg-crib-red text-white text-xs font-bold font-mono px-2 py-0.5 rounded-full shadow-md z-10 animate-in zoom-in-75">
            {cartQuantity} in cart
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="p-3.5 flex flex-col flex-1 justify-between">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-crib-warm-gray/80 block mb-0.5">
            {product.categoryName || (typeof product.categoryId === 'string' ? product.categoryId.replace('_', ' ') : `Category #${product.categoryId}`)}
          </span>
          <h3 className="text-sm font-semibold font-display text-crib-cream line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </div>

        <div className="mt-3 pt-2.5 border-t border-crib-border/40 flex items-center justify-between">
          <span className="text-sm font-bold font-mono text-crib-cream">
            {formatIDR(product.price)}
          </span>

          <button
            type="button"
            aria-label={`Add ${product.name} to cart`}
            disabled={isOutOfStock}
            onClick={(e) => {
              e.stopPropagation();
              if (!isOutOfStock) onAddToCart(product);
            }}
            className={cn(
              'w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
              isOutOfStock
                ? 'bg-crib-border/20 text-crib-warm-gray cursor-not-allowed'
                : 'bg-crib-red text-white hover:bg-crib-red-light active:bg-crib-red-dark shadow-sm'
            )}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
