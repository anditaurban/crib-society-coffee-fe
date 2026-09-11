import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingBag, ChevronRight, Sparkles, Terminal, CheckCircle2 } from 'lucide-react';
import { productService } from '../services/productService';
import { orderService } from '../services/orderService';
import { categoryService } from '../services/categoryService';
import { ProductCatalog } from '../components/pos/ProductCatalog';
import { CartPanel } from '../components/pos/CartPanel';
import { PaymentModal } from '../components/pos/PaymentModal';
import { ReceiptModal } from '../components/pos/ReceiptModal';
import { Drawer } from '../components/common/Drawer';
import { Badge } from '../components/common/Badge';
import { useToast } from '../context/ToastContext';
import { formatIDR } from '../utils/format';

export function PosPage() {
  const { showToast } = useToast();

  // Catalog State
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([{ id: 'all', name: 'All Menu' }]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyInStock, setOnlyInStock] = useState(false);

  // Load real categories from API
  useEffect(() => {
    async function loadCategories() {
      try {
        const liveCats = await categoryService.getCategories();
        setCategories([{ id: 'all', name: 'All Menu' }, ...liveCats]);
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    }
    loadCategories();
  }, []);

  // Cart State
  const [cartItems, setCartItems] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState('dine_in');
  const [orderNotes, setOrderNotes] = useState('');

  // Mobile Drawer State
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);

  // Checkout & Receipt Modals
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  // Fetch Products
  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await productService.getProducts({
        category: selectedCategory,
        search: searchQuery,
        status: onlyInStock ? 'active' : 'all',
      });
      let result = response.data || [];
      if (onlyInStock) {
        result = result.filter((p) => p.status === 'active' && p.stock > 0);
      }
      setProducts(result);
    } catch (err) {
      setError(err.message || 'Failed to retrieve products.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, searchQuery, onlyInStock]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Cart Handlers
  const handleAddToCart = (product) => {
    if (product.status === 'out_of_stock' || product.stock <= 0) {
      showToast(`${product.name} is currently out of stock.`, 'warning');
      return;
    }

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) {
          showToast(`Cannot exceed maximum available stock (${product.stock}).`, 'warning');
          return prev;
        }
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1, note: '' }];
    });

    showToast(`Added ${product.name} to cart.`, 'success', 2000);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }

    const product = products.find((p) => p.id === productId);
    if (product && newQuantity > product.stock) {
      showToast(`Stock limit reached (${product.stock}).`, 'warning');
      return;
    }

    setCartItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleUpdateItemNote = (productId, note) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, note } : item))
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
    setCustomerName('');
    setOrderNotes('');
    showToast('Order cleared.', 'neutral');
  };

  // Payment Confirmation
  const handleConfirmPayment = async (paymentData) => {
    setIsSubmitting(true);
    try {
      const response = await orderService.createOrder({
        items: cartItems,
        paymentMethod: paymentData.paymentMethod,
        customerName: paymentData.customerName,
        customerPhone: paymentData.customerPhone,
        cashTendered: paymentData.cashTendered,
        cashReceived: paymentData.cashTendered,
        notes: paymentData.notes,
        orderType: paymentData.orderType,
      });

      const newOrder = {
        ...response.order,
        orderType: paymentData.orderType,
        cashTendered: paymentData.cashTendered,
        changeAmount: response.order?.changeAmount ?? paymentData.changeAmount,
      };

      setCompletedOrder(newOrder);
      setIsPaymentOpen(false);
      setIsMobileCartOpen(false);
      setIsReceiptOpen(true);
      showToast(`Order #${newOrder.id} successfully recorded!`, 'success');
      loadProducts();
    } catch (err) {
      showToast(err.message || 'Payment failed. Please retry.', 'danger');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartNewOrder = () => {
    setIsReceiptOpen(false);
    setCompletedOrder(null);
    setCartItems([]);
    setCustomerName('');
    setOrderNotes('');
    loadProducts(); // refresh stock numbers
  };

  // Calculations for sticky mobile bar
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartTotal = cartSubtotal + Math.round(cartSubtotal * 0.1);

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Top POS Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-crib-border/50">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-xl sm:text-2xl font-black font-display text-crib-cream tracking-tight uppercase">
              POS Terminal
            </h1>
            <Badge variant="primary" size="sm">
              Live Register
            </Badge>
          </div>
          <p className="text-xs text-crib-warm-gray mt-0.5">
            Rapid touch ordering • Dine In & Takeaway counter
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-crib-warm-gray">
          <Terminal className="w-3.5 h-3.5 text-crib-red" />
          <span>Station: Counter 01</span>
          <span className="text-crib-border">•</span>
          <span>Shift: Active</span>
        </div>
      </div>

      {/* Main Two-Column Layout (Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start flex-1 min-h-0 pb-20 lg:pb-0">
        {/* Left Column: Product Catalog (7 cols on lg, 8 on xl) */}
        <div className="lg:col-span-7 xl:col-span-8 min-w-0">
          <ProductCatalog
            products={products}
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onlyInStock={onlyInStock}
            onToggleInStock={() => setOnlyInStock((prev) => !prev)}
            onAddToCart={handleAddToCart}
            cartItems={cartItems}
            isLoading={isLoading}
            error={error}
            onRetry={loadProducts}
          />
        </div>

        {/* Right Column: Desktop Cart Panel (5 cols on lg, 4 on xl) */}
        <div className="hidden lg:block lg:col-span-5 xl:col-span-4 sticky top-6 max-h-[calc(100vh-8rem)]">
          <CartPanel
            items={cartItems}
            customerName={customerName}
            onCustomerNameChange={setCustomerName}
            orderType={orderType}
            onOrderTypeChange={setOrderType}
            orderNotes={orderNotes}
            onOrderNotesChange={setOrderNotes}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onUpdateItemNote={handleUpdateItemNote}
            onClearCart={handleClearCart}
            onOpenCheckout={() => setIsPaymentOpen(true)}
            className="h-[calc(100vh-8rem)]"
          />
        </div>
      </div>

      {/* Mobile / Tablet Floating Cart Bar (Visible on < lg) */}
      {cartItems.length > 0 && (
        <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40 animate-in slide-in-from-bottom-4">
          <button
            type="button"
            onClick={() => setIsMobileCartOpen(true)}
            className="w-full bg-crib-red hover:bg-crib-red-light active:bg-crib-red-dark text-white p-3.5 rounded-2xl shadow-elevated flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-black/20 flex items-center justify-center font-bold font-mono text-sm">
                {totalCartCount}
              </div>
              <div className="text-left">
                <div className="text-xs font-semibold uppercase tracking-wider text-white/80">
                  Current Order
                </div>
                <div className="text-base font-extrabold font-mono text-white">
                  {formatIDR(cartTotal)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-sm font-bold font-display uppercase tracking-wide">
              <span>View Cart</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}

      {/* Mobile Cart Drawer (< lg) */}
      <Drawer
        isOpen={isMobileCartOpen}
        onClose={() => setIsMobileCartOpen(false)}
        title="Active Order Tray"
        position="right"
      >
        <div className="h-[calc(100vh-7rem)] flex flex-col -mx-4 -my-4">
          <CartPanel
            items={cartItems}
            customerName={customerName}
            onCustomerNameChange={setCustomerName}
            orderType={orderType}
            onOrderTypeChange={setOrderType}
            orderNotes={orderNotes}
            onOrderNotesChange={setOrderNotes}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onUpdateItemNote={handleUpdateItemNote}
            onClearCart={handleClearCart}
            onOpenCheckout={() => {
              setIsMobileCartOpen(false);
              setIsPaymentOpen(true);
            }}
            className="border-none rounded-none shadow-none h-full"
          />
        </div>
      </Drawer>

      {/* Payment Selection Modal */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        items={cartItems}
        customerName={customerName}
        orderType={orderType}
        onConfirmPayment={handleConfirmPayment}
        isSubmitting={isSubmitting}
      />

      {/* Receipt / Success State Modal */}
      <ReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        order={completedOrder}
        onStartNewOrder={handleStartNewOrder}
      />
    </div>
  );
}
