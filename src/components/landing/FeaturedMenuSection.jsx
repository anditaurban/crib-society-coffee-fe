import React, { useState, useEffect } from 'react';
import { productService } from '../../services/productService';
import { MOCK_CATEGORIES } from '../../data/mockProducts';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { Skeleton } from '../feedback/LoadingState';
import { EmptyState } from '../feedback/EmptyState';
import { ErrorState } from '../feedback/ErrorState';
import { useToast } from '../../context/ToastContext';
import {
  Coffee,
  Eye,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Plus,
  ArrowRight,
} from 'lucide-react';

export function FeaturedMenuSection() {
  const { showToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Selected product for Quick View modal
  const [activeProduct, setActiveProduct] = useState(null);
  const [tempOption, setTempOption] = useState('iced');
  const [sweetnessOption, setSweetnessOption] = useState('normal');

  // Load products based on category
  const fetchProducts = async (catId) => {
    try {
      setLoading(true);
      setError(null);
      const res = await productService.getProducts({
        category: catId === 'all' ? '' : catId,
        limit: 12,
      });
      setProducts(res.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load menu items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const handleOpenDetail = (product) => {
    setActiveProduct(product);
    setTempOption('iced');
    setSweetnessOption('normal');
  };

  const handleOrderAction = () => {
    if (!activeProduct) return;
    showToast({
      type: 'success',
      title: 'Item added to order draft',
      message: `${activeProduct.name} (${tempOption.toUpperCase()}, ${sweetnessOption}) has been reserved.`,
    });
    setActiveProduct(null);
  };

  const formatIDR = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price || 0);
  };

  return (
    <section id="menu" className="py-16 sm:py-24 border-b border-crib-border/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs uppercase tracking-widest text-crib-red font-mono font-bold">
              [ 03 // THE ROSTER ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-crib-cream uppercase tracking-tight leading-tight">
              FEATURED CRAFT{' '}
              <span className="text-crib-red">MENU.</span>
            </h2>
            <p className="text-sm text-crib-warm-gray font-sans">
              Precision brewed with unyielding attention to extraction yields, milk texture, and artisanal roasting.
            </p>
          </div>

          <div className="text-xs font-mono text-crib-warm-gray">
            Showing {products.length} curated signature items
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {MOCK_CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-xs uppercase font-mono font-semibold whitespace-nowrap transition-all duration-200 border ${
                  isSelected
                    ? 'bg-crib-red text-white border-crib-red shadow-lg shadow-crib-red/20'
                    : 'bg-crib-charcoal text-crib-warm-gray border-crib-border hover:border-zinc-500 hover:text-crib-cream'
                }`}
              >
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Product Grid Area */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-crib-border bg-crib-charcoal/50 p-4 space-y-4"
              >
                <Skeleton className="h-48 w-full rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <div className="flex justify-between items-center pt-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-8 w-24 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <ErrorState
            title="Failed to Load Menu"
            message={error}
            onRetry={() => fetchProducts(selectedCategory)}
          />
        ) : products.length === 0 ? (
          <EmptyState
            title="No Items in This Category"
            message="We currently don't have available items in this category. Check back soon!"
            action={
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                View All Categories
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => {
              const isOutOfStock = product.status === 'out_of_stock' || product.stock === 0;

              return (
                <div
                  key={product.id}
                  className="group rounded-xl border border-crib-border/80 bg-crib-charcoal/60 hover:bg-crib-charcoal hover:border-crib-red/60 transition-all duration-300 flex flex-col overflow-hidden shadow-lg"
                >
                  {/* Image Container */}
                  <div className="relative h-48 w-full overflow-hidden bg-zinc-900">
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                        isOutOfStock ? 'grayscale opacity-60' : ''
                      }`}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-crib-charcoal via-transparent to-transparent opacity-80" />

                    {/* Badge */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      {isOutOfStock ? (
                        <Badge variant="danger" size="sm">
                          Sold Out
                        </Badge>
                      ) : product.stock < 10 ? (
                        <Badge variant="warning" size="sm">
                          Low Stock ({product.stock})
                        </Badge>
                      ) : (
                        <Badge variant="neutral" size="sm">
                          {product.categoryId.replace('_', ' ')}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-base font-display font-bold text-crib-cream uppercase tracking-tight group-hover:text-crib-red transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-xs text-crib-warm-gray mt-1 line-clamp-2">
                        Single-origin roast extracted to order. Balanced acidity and rich mouthfeel.
                      </p>
                    </div>

                    <div className="pt-2 border-t border-crib-border/40 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-mono text-crib-warm-gray block">
                          Price
                        </span>
                        <span className="text-base font-bold font-mono text-white">
                          {formatIDR(product.price)}
                        </span>
                      </div>

                      <Button
                        variant={isOutOfStock ? 'ghost' : 'outline'}
                        size="sm"
                        disabled={isOutOfStock}
                        onClick={() => handleOpenDetail(product)}
                        leftIcon={Eye}
                        className="text-xs font-mono uppercase"
                      >
                        {isOutOfStock ? 'Unavailable' : 'Quick View'}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Banner to POS / Full Order Flow */}
        <div className="mt-12 p-6 rounded-xl border border-crib-border bg-crib-ink flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-crib-red/20 text-crib-red flex items-center justify-center border border-crib-red/40 shrink-0">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-crib-cream uppercase font-display">
                Looking to place instant counter orders?
              </div>
              <div className="text-xs text-crib-warm-gray">
                Baristas and cashiers can process orders directly through our integrated POS terminal.
              </div>
            </div>
          </div>

          <a
            href="/staff/pos"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-crib-charcoal border border-crib-border hover:border-crib-red text-crib-cream hover:text-white text-xs font-mono uppercase font-semibold transition-colors shrink-0"
          >
            Launch POS Terminal &rarr;
          </a>
        </div>
      </div>

      {/* Product Detail Modal (Guest Flow: Explore -> Detail -> CTA) */}
      <Modal
        isOpen={Boolean(activeProduct)}
        onClose={() => setActiveProduct(null)}
        title={activeProduct?.name || 'Product Details'}
        description={`Category: ${activeProduct?.categoryId.toUpperCase()} • ID: ${activeProduct?.id}`}
        size="lg"
      >
        {activeProduct && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
              {/* Image Preview */}
              <div className="relative rounded-xl overflow-hidden bg-zinc-900 border border-crib-border aspect-square">
                <img
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="primary" size="sm">
                    {activeProduct.categoryId}
                  </Badge>
                </div>
              </div>

              {/* Product Specifications & Customization */}
              <div className="space-y-5">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-crib-red font-bold">
                    Single Origin Craft
                  </div>
                  <h4 className="text-2xl font-display font-bold text-crib-cream uppercase tracking-tight mt-1">
                    {activeProduct.name}
                  </h4>
                  <div className="text-xl font-bold font-mono text-white mt-2">
                    {formatIDR(activeProduct.price)}
                  </div>
                </div>

                <p className="text-xs text-crib-warm-gray leading-relaxed">
                  Carefully processed by master baristas. Features layered notes of cocoa, roasted hazelnut, and sweet wild berries with a smooth, lingering finish.
                </p>

                {/* Serving Temperature Selection */}
                <div className="space-y-2">
                  <label className="text-xs uppercase font-mono text-crib-warm-gray font-semibold block">
                    Temperature Preference
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setTempOption('iced')}
                      className={`py-2 px-3 rounded-lg border text-xs font-mono uppercase font-semibold transition-colors ${
                        tempOption === 'iced'
                          ? 'border-crib-red bg-crib-red/10 text-crib-cream'
                          : 'border-crib-border bg-crib-ink text-crib-warm-gray hover:text-crib-cream'
                      }`}
                    >
                      Iced (Standard)
                    </button>
                    <button
                      type="button"
                      onClick={() => setTempOption('hot')}
                      className={`py-2 px-3 rounded-lg border text-xs font-mono uppercase font-semibold transition-colors ${
                        tempOption === 'hot'
                          ? 'border-crib-red bg-crib-red/10 text-crib-cream'
                          : 'border-crib-border bg-crib-ink text-crib-warm-gray hover:text-crib-cream'
                      }`}
                    >
                      Hot
                    </button>
                  </div>
                </div>

                {/* Sweetness Preference */}
                <div className="space-y-2">
                  <label className="text-xs uppercase font-mono text-crib-warm-gray font-semibold block">
                    Sweetness Level
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['normal', 'less', 'no sugar'].map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setSweetnessOption(lvl)}
                        className={`py-2 px-2 rounded-lg border text-xs font-mono uppercase font-semibold text-center transition-colors ${
                          sweetnessOption === lvl
                            ? 'border-crib-red bg-crib-red/10 text-crib-cream'
                            : 'border-crib-border bg-crib-ink text-crib-warm-gray hover:text-crib-cream'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stock info */}
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 pt-2 border-t border-crib-border/50">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>In Stock: {activeProduct.stock} units remaining today</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-crib-border/80 flex items-center justify-end gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveProduct(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleOrderAction}
                rightIcon={ArrowRight}
                className="font-mono uppercase text-xs"
              >
                Reserve / Add to Order Draft
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
