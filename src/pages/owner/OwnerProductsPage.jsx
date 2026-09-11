import React, { useState, useEffect, useCallback } from 'react';
import {
  Coffee,
  Plus,
  Search,
  X,
  Edit2,
  Trash2,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { LoadingState } from '../../components/feedback/LoadingState';
import { EmptyState } from '../../components/feedback/EmptyState';
import { useToast } from '../../context/ToastContext';
import { formatIDR } from '../../utils/format';
import { cn } from '../../utils/cn';

export function OwnerProductsPage() {
  const { showToast } = useToast();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Load real categories from API
  useEffect(() => {
    async function loadCategories() {
      try {
        const liveCats = await categoryService.getCategories();
        setCategories(liveCats);
        if (liveCats.length > 0 && !formData.categoryId) {
          setFormData((prev) => ({ ...prev, categoryId: liveCats[0].id }));
        }
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    }
    loadCategories();
  }, []);

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete state
  const [productToDelete, setProductToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    categoryId: 1,
    price: '',
    stock: '',
    image: '',
    status: 'active',
  });

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await productService.getProducts({
        category: selectedCategory === 'all' ? '' : selectedCategory,
        search: searchQuery,
        limit: 100,
      });
      setProducts(res.data || []);
    } catch (err) {
      showToast('Failed to load menu products.', 'danger');
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, searchQuery, showToast]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Open modal for Create
  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      categoryId: 'espresso',
      price: '',
      stock: '50',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
      status: 'active',
    });
    setIsFormOpen(true);
  };

  // Open modal for Edit
  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      categoryId: product.categoryId,
      price: product.price.toString(),
      stock: product.stock.toString(),
      image: product.image,
      status: product.status,
    });
    setIsFormOpen(true);
  };

  // Save product (Create or Update)
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) {
      showToast('Please fill in product name and price.', 'warning');
      return;
    }

    const priceNum = Number(formData.price);
    if (isNaN(priceNum) || priceNum <= 0) {
      showToast('Price must be a positive number in IDR.', 'warning');
      return;
    }

    const stockNum = Number(formData.stock);
    if (isNaN(stockNum) || stockNum < 0) {
      showToast('Stock cannot be negative.', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name.trim(),
        categoryId: formData.categoryId,
        price: priceNum,
        stock: stockNum,
        image:
          formData.image.trim() ||
          'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
        status: formData.status,
      };

      if (editingProduct) {
        await productService.updateProduct(editingProduct.id, payload);
        showToast(`Product "${payload.name}" updated successfully!`, 'success');
      } else {
        await productService.createProduct(payload);
        showToast(`Product "${payload.name}" added to menu!`, 'success');
      }

      setIsFormOpen(false);
      loadProducts();
    } catch (err) {
      showToast(err.message || 'Failed to save product.', 'danger');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete product
  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);
    try {
      await productService.deleteProduct(productToDelete.id);
      showToast(`Product "${productToDelete.name}" deleted.`, 'success');
      setProductToDelete(null);
      loadProducts();
    } catch (err) {
      showToast('Failed to delete product.', 'danger');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-crib-border/60">
        <div>
          <div className="flex items-center gap-2">
            <Coffee className="w-5 h-5 text-crib-red" />
            <h1 className="text-xl sm:text-2xl font-black font-display text-crib-cream tracking-tight uppercase">
              Menu &amp; Product Management
            </h1>
            <Badge variant="neutral" size="sm">
              {products.length} Products
            </Badge>
          </div>
          <p className="text-xs text-crib-warm-gray mt-0.5">
            Configure catalog pricing, real-time inventory counts, and product status.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={handleOpenCreate}
          leftIcon={Plus}
          className="text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-950/40"
        >
          Add New Product
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={cn(
              'px-3.5 py-2 rounded-xl text-xs font-semibold font-display uppercase tracking-wider whitespace-nowrap transition-all',
              selectedCategory === 'all'
                ? 'bg-crib-red text-white font-bold shadow'
                : 'bg-crib-charcoal text-crib-warm-gray border border-crib-border hover:text-crib-cream'
            )}
          >
            All Products
          </button>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id || selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  'px-3.5 py-2 rounded-xl text-xs font-semibold font-display uppercase tracking-wider whitespace-nowrap transition-all',
                  isActive
                    ? 'bg-crib-red text-white font-bold shadow'
                    : 'bg-crib-charcoal text-crib-warm-gray border border-crib-border hover:text-crib-cream'
                )}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-crib-warm-gray absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-crib-charcoal border border-crib-border rounded-xl pl-8 pr-8 py-2 text-xs text-crib-cream placeholder:text-crib-warm-gray/60 focus:outline-none focus:border-crib-red"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-crib-warm-gray hover:text-crib-cream"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Products Table */}
      {isLoading ? (
        <div className="py-20 flex items-center justify-center">
          <LoadingState message="Loading catalog inventory..." />
        </div>
      ) : products.length === 0 ? (
        <div className="py-20 flex items-center justify-center">
          <EmptyState
            title="No products found"
            description="No items match your category or search filter."
            actionLabel="Reset Search"
            onAction={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
          />
        </div>
      ) : (
        <div className="rounded-2xl border border-crib-border bg-crib-charcoal overflow-hidden shadow-elevated">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono min-w-[640px]">
              <thead className="bg-crib-ink/90 text-crib-warm-gray uppercase tracking-wider text-[10px] border-b border-crib-border">
              <tr>
                <th className="py-3.5 px-4 font-bold">Product</th>
                <th className="py-3.5 px-4 font-bold">Category</th>
                <th className="py-3.5 px-4 font-bold">Price</th>
                <th className="py-3.5 px-4 font-bold">Stock</th>
                <th className="py-3.5 px-4 font-bold">Status</th>
                <th className="py-3.5 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-crib-border/50 text-crib-cream">
              {products.map((p) => {
                const isOutOfStock = p.stock === 0 || p.status === 'out_of_stock';
                const isLowStock = !isOutOfStock && p.stock <= 5;

                return (
                  <tr key={p.id} className="hover:bg-crib-ink/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover bg-zinc-800 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-crib-cream font-display text-sm">
                            {p.name}
                          </div>
                          <div className="text-[10px] text-crib-warm-gray">{p.id}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 capitalize text-crib-warm-gray">
                      {p.categoryName || (typeof p.categoryId === 'string' ? p.categoryId.replace('_', ' ') : `Category #${p.categoryId}`)}
                    </td>

                    <td className="py-3 px-4 font-bold text-crib-cream">
                      {formatIDR(p.price)}
                    </td>

                    <td className="py-3 px-4">
                      {isOutOfStock ? (
                        <Badge variant="danger" size="sm" dot>
                          0 Units
                        </Badge>
                      ) : isLowStock ? (
                        <Badge variant="warning" size="sm" dot>
                          {p.stock} left
                        </Badge>
                      ) : (
                        <span className="text-crib-cream font-mono">{p.stock} units</span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          p.status === 'active'
                            ? 'success'
                            : p.status === 'draft'
                            ? 'neutral'
                            : 'danger'
                        }
                        size="sm"
                        dot
                      >
                        {p.status}
                      </Badge>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 rounded-lg bg-crib-ink border border-crib-border hover:border-crib-warm-gray text-crib-cream transition-colors"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setProductToDelete(p)}
                          className="p-1.5 rounded-lg bg-red-950/40 border border-red-900/60 hover:bg-red-900/50 text-rose-300 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingProduct ? 'Edit Product' : 'Create New Product'}
        description="Configure product details for POS and digital ordering catalog."
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleSaveProduct} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-crib-warm-gray mb-1">
              Product Title *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Vanilla Bean Latte"
              className="w-full bg-crib-ink border border-crib-border rounded-xl px-3.5 py-2.5 text-xs text-crib-cream focus:outline-none focus:border-crib-red"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-crib-warm-gray mb-1">
                Category
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full bg-crib-ink border border-crib-border rounded-xl px-3 py-2 text-xs text-crib-cream focus:outline-none focus:border-crib-red"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-crib-warm-gray mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-crib-ink border border-crib-border rounded-xl px-3 py-2 text-xs text-crib-cream focus:outline-none focus:border-crib-red"
              >
                <option value="active">Active (Available)</option>
                <option value="draft">Draft (Hidden)</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-crib-warm-gray mb-1">
                Price (IDR) *
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="40000"
                className="w-full bg-crib-ink border border-crib-border rounded-xl px-3.5 py-2.5 text-xs font-mono text-crib-cream focus:outline-none focus:border-crib-red"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-crib-warm-gray mb-1">
                Stock Quantity
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="50"
                className="w-full bg-crib-ink border border-crib-border rounded-xl px-3.5 py-2.5 text-xs font-mono text-crib-cream focus:outline-none focus:border-crib-red"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-crib-warm-gray mb-1">
              Image URL
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-crib-ink border border-crib-border rounded-xl px-3.5 py-2 text-xs text-crib-cream focus:outline-none focus:border-crib-red"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-crib-border/60">
            <Button
              variant="outline"
              size="md"
              onClick={() => setIsFormOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              type="submit"
              isLoading={isSubmitting}
            >
              {editingProduct ? 'Save Changes' : 'Create Product'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!productToDelete}
        onClose={() => setProductToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Menu Item?"
        message={`Are you sure you want to remove "${productToDelete?.name}" from the store catalog?`}
        confirmText="Delete Product"
        isDestructive
        isLoading={isDeleting}
      />
    </div>
  );
}
