import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Badge } from '../components/common/Badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/common/Card';
import { Modal } from '../components/common/Modal';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { Tabs } from '../components/common/Tabs';
import { Table, TableHead, TableRow, TableHeaderCell, TableCell } from '../components/common/Table';
import { Pagination } from '../components/common/Pagination';
import { LoadingState, Skeleton } from '../components/feedback/LoadingState';
import { EmptyState } from '../components/feedback/EmptyState';
import { ErrorState } from '../components/feedback/ErrorState';

import { productService } from '../services/productService';
import { orderService } from '../services/orderService';
import { dashboardService } from '../services/dashboardService';
import { staffService } from '../services/staffService';

import {
  Sparkles,
  Layers,
  Database,
  CheckCircle2,
  AlertTriangle,
  Send,
  Coffee,
  ShoppingBag,
  RefreshCw,
  Search,
} from 'lucide-react';

export function FoundationShowcase() {
  const { role, switchRole, currentUser } = useAuth();
  const { showToast } = useToast();

  // Active showcase tab
  const [activeTab, setActiveTab] = useState('components');

  // Interactive component states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('espresso');
  const [currentPage, setCurrentPage] = useState(1);

  // Live Service verification state
  const [serviceStatus, setServiceStatus] = useState({
    products: { loading: false, data: null, error: null },
    orders: { loading: false, data: null, error: null },
    dashboard: { loading: false, data: null, error: null },
    staff: { loading: false, data: null, error: null },
  });

  // Load service test data on mount
  useEffect(() => {
    testAllServices();
  }, []);

  async function testAllServices() {
    // Products
    setServiceStatus((prev) => ({ ...prev, products: { ...prev.products, loading: true } }));
    try {
      const res = await productService.getProducts({ page: 1, limit: 3 });
      setServiceStatus((prev) => ({ ...prev, products: { loading: false, data: res, error: null } }));
    } catch (err) {
      setServiceStatus((prev) => ({ ...prev, products: { loading: false, data: null, error: err.message } }));
    }

    // Orders
    setServiceStatus((prev) => ({ ...prev, orders: { ...prev.orders, loading: true } }));
    try {
      const res = await orderService.getOrders({ limit: 3 });
      setServiceStatus((prev) => ({ ...prev, orders: { loading: false, data: res, error: null } }));
    } catch (err) {
      setServiceStatus((prev) => ({ ...prev, orders: { loading: false, data: null, error: err.message } }));
    }

    // Dashboard
    setServiceStatus((prev) => ({ ...prev, dashboard: { ...prev.dashboard, loading: true } }));
    try {
      const res = await dashboardService.getSummary();
      setServiceStatus((prev) => ({ ...prev, dashboard: { loading: false, data: res, error: null } }));
    } catch (err) {
      setServiceStatus((prev) => ({ ...prev, dashboard: { loading: false, data: null, error: err.message } }));
    }

    // Staff
    setServiceStatus((prev) => ({ ...prev, staff: { ...prev.staff, loading: true } }));
    try {
      const res = await staffService.getStaff();
      setServiceStatus((prev) => ({ ...prev, staff: { loading: false, data: res, error: null } }));
    } catch (err) {
      setServiceStatus((prev) => ({ ...prev, staff: { loading: false, data: null, error: err.message } }));
    }
  }

  const tabs = [
    { id: 'components', label: 'Base UI Components' },
    { id: 'feedback', label: 'State Feedback' },
    { id: 'services', label: 'API-SPEC Mock Services' },
    { id: 'tokens', label: 'Design Tokens' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-crib-charcoal to-surface-secondary border border-crib-border p-6 sm:p-8 shadow-subtle relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-crib-red/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="primary" size="sm" dot>
                Phase 1 Foundation
              </Badge>
              <span className="text-xs text-crib-warm-gray">• SOT Compliant</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-crib-cream">
              Crib Society App Shell &amp; Architecture
            </h1>
            <p className="text-xs sm:text-sm text-crib-warm-gray mt-1 max-w-2xl leading-relaxed">
              Foundational architecture verification: React + Vite, Tailwind utility styling, configuration-driven role navigation, reusable base UI primitives, and mock API-SPEC service layer.
            </p>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            <Button
              variant="outline"
              size="sm"
              leftIcon={RefreshCw}
              onClick={testAllServices}
            >
              Re-test Services
            </Button>
            <Button
              variant="primary"
              size="sm"
              leftIcon={Sparkles}
              onClick={() => showToast('Phase 1 foundation is operational!', 'success')}
            >
              Trigger Toast
            </Button>
          </div>
        </div>
      </div>

      {/* Showcase Tab Navigation */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* TAB 1: Base UI Components */}
      {activeTab === 'components' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Buttons Section */}
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Buttons &amp; Actions</CardTitle>
                <CardDescription>Brand palette variants, sizes, and states</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">Primary (Crib Red)</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3 border-t border-crib-border/50">
                <Button size="sm" variant="primary">Small</Button>
                <Button size="md" variant="primary">Medium</Button>
                <Button size="lg" variant="primary">Large</Button>
                <Button
                  variant="secondary"
                  isLoading={isBtnLoading}
                  onClick={() => {
                    setIsBtnLoading(true);
                    setTimeout(() => setIsBtnLoading(false), 1200);
                  }}
                >
                  Click Loading
                </Button>
                <Button variant="primary" disabled>Disabled</Button>
              </div>
            </CardContent>
          </Card>

          {/* Form Controls Section */}
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Form Controls</CardTitle>
                <CardDescription>Inputs, selects, and status indicators</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Product Search"
                placeholder="Search coffee or brew method..."
                leftIcon={Search}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                helperText="Type any keyword to test input behavior"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Select
                  label="Category Filter"
                  value={selectValue}
                  onChange={(e) => setSelectValue(e.target.value)}
                  options={[
                    { id: 'espresso', label: 'Espresso Bar' },
                    { id: 'signature', label: 'Signature Brews' },
                    { id: 'non_coffee', label: 'Non-Coffee' },
                    { id: 'pastry', label: 'Pastries & Bites' },
                  ]}
                />
                <Input
                  label="Error State Example"
                  defaultValue="Invalid Price"
                  error="Price must be a positive number"
                />
              </div>
            </CardContent>
          </Card>

          {/* Badges & Status Chips */}
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Badges &amp; Status Chips</CardTitle>
                <CardDescription>Visual semantics for orders, stock, and roles</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="primary" dot>Crib Red</Badge>
                <Badge variant="success" dot>Completed</Badge>
                <Badge variant="warning" dot>Pending</Badge>
                <Badge variant="danger" dot>Cancelled / Out of Stock</Badge>
                <Badge variant="info" dot>In Progress</Badge>
                <Badge variant="neutral">Neutral</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Dialogs & Overlays */}
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Dialogs &amp; Overlays</CardTitle>
                <CardDescription>Accessible modals and confirmation prompts</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
                Open Sample Modal
              </Button>
              <Button variant="danger" onClick={() => setIsConfirmOpen(true)}>
                Open Confirm Dialog
              </Button>
            </CardContent>
          </Card>

          {/* Table & Pagination Sample */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Responsive Table &amp; Pagination</CardTitle>
                  <CardDescription>Horizontal-scroll wrapped table structure</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>ID</TableHeaderCell>
                      <TableHeaderCell>Customer</TableHeaderCell>
                      <TableHeaderCell>Items</TableHeaderCell>
                      <TableHeaderCell>Total</TableHeaderCell>
                      <TableHeaderCell>Status</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <tbody>
                    <TableRow isClickable>
                      <TableCell className="font-mono text-xs">ORD-2024-001</TableCell>
                      <TableCell className="font-semibold">Rayhan M.</TableCell>
                      <TableCell>2x Americano, 1x Croissant</TableCell>
                      <TableCell className="font-mono">Rp 108.900</TableCell>
                      <TableCell>
                        <Badge variant="info" dot>In Progress</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow isClickable>
                      <TableCell className="font-mono text-xs">ORD-2024-002</TableCell>
                      <TableCell className="font-semibold">Natasha W.</TableCell>
                      <TableCell>1x Red Velvet Nitro</TableCell>
                      <TableCell className="font-mono">Rp 47.300</TableCell>
                      <TableCell>
                        <Badge variant="success" dot>Completed</Badge>
                      </TableCell>
                    </TableRow>
                  </tbody>
                </Table>

                <Pagination
                  currentPage={currentPage}
                  totalPages={5}
                  totalItems={24}
                  onPageChange={setCurrentPage}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 2: State Feedback */}
      {activeTab === 'feedback' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Loading State</CardTitle>
            </CardHeader>
            <CardContent>
              <LoadingState message="Fetching Products..." />
              <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-8 w-full" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Empty State</CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={Coffee}
                title="No orders found"
                description="There are currently no active orders for this station."
                actionLabel="Create Order"
                onAction={() => showToast('Redirecting to POS...', 'info')}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Error &amp; Retry State</CardTitle>
            </CardHeader>
            <CardContent>
              <ErrorState
                title="Sync Failed"
                message="Unable to communicate with the POS hardware terminal."
                onRetry={() => showToast('Retrying terminal connection...', 'info')}
              />
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB 3: API-SPEC Mock Services */}
      {activeTab === 'services' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Products Service */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-crib-red" />
                <CardTitle>GET /products</CardTitle>
              </div>
              <Badge variant="success" size="sm">Active Contract</Badge>
            </CardHeader>
            <CardContent>
              {serviceStatus.products.loading ? (
                <LoadingState message="Querying productService..." />
              ) : serviceStatus.products.data ? (
                <div className="space-y-3">
                  <p className="text-xs text-crib-warm-gray">
                    Returned {serviceStatus.products.data.data.length} sample items (total: {serviceStatus.products.data.meta.total})
                  </p>
                  <pre className="p-3 rounded-lg bg-crib-ink border border-crib-border text-[11px] font-mono overflow-x-auto text-emerald-300 max-h-48">
                    {JSON.stringify(serviceStatus.products.data.data[0], null, 2)}
                  </pre>
                </div>
              ) : (
                <p className="text-xs text-red-400">{serviceStatus.products.error}</p>
              )}
            </CardContent>
          </Card>

          {/* Orders Service */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-crib-red" />
                <CardTitle>GET /orders</CardTitle>
              </div>
              <Badge variant="success" size="sm">Active Contract</Badge>
            </CardHeader>
            <CardContent>
              {serviceStatus.orders.loading ? (
                <LoadingState message="Querying orderService..." />
              ) : serviceStatus.orders.data ? (
                <div className="space-y-3">
                  <p className="text-xs text-crib-warm-gray">
                    Returned {serviceStatus.orders.data.data.length} orders
                  </p>
                  <pre className="p-3 rounded-lg bg-crib-ink border border-crib-border text-[11px] font-mono overflow-x-auto text-emerald-300 max-h-48">
                    {JSON.stringify(serviceStatus.orders.data.data[0], null, 2)}
                  </pre>
                </div>
              ) : (
                <p className="text-xs text-red-400">{serviceStatus.orders.error}</p>
              )}
            </CardContent>
          </Card>

          {/* Dashboard Service */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-crib-red" />
                <CardTitle>GET /dashboard/summary</CardTitle>
              </div>
              <Badge variant="success" size="sm">Active Contract</Badge>
            </CardHeader>
            <CardContent>
              {serviceStatus.dashboard.loading ? (
                <LoadingState message="Querying dashboardService..." />
              ) : serviceStatus.dashboard.data ? (
                <div className="space-y-3">
                  <pre className="p-3 rounded-lg bg-crib-ink border border-crib-border text-[11px] font-mono overflow-x-auto text-emerald-300">
                    {JSON.stringify(serviceStatus.dashboard.data, null, 2)}
                  </pre>
                </div>
              ) : (
                <p className="text-xs text-red-400">{serviceStatus.dashboard.error}</p>
              )}
            </CardContent>
          </Card>

          {/* Staff Service */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-crib-red" />
                <CardTitle>GET /staff</CardTitle>
              </div>
              <Badge variant="success" size="sm">Active Contract</Badge>
            </CardHeader>
            <CardContent>
              {serviceStatus.staff.loading ? (
                <LoadingState message="Querying staffService..." />
              ) : serviceStatus.staff.data ? (
                <div className="space-y-3">
                  <p className="text-xs text-crib-warm-gray">
                    {serviceStatus.staff.data.data.length} staff members registered
                  </p>
                  <pre className="p-3 rounded-lg bg-crib-ink border border-crib-border text-[11px] font-mono overflow-x-auto text-emerald-300">
                    {JSON.stringify(serviceStatus.staff.data.data[0], null, 2)}
                  </pre>
                </div>
              ) : (
                <p className="text-xs text-red-400">{serviceStatus.staff.error}</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB 4: Design Tokens */}
      {activeTab === 'tokens' && (
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Brand Palette &amp; Tokens (docs/UI-GUIDELINE.md)</CardTitle>
              <CardDescription>Verified HEX codes and semantic tokens</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 text-center">
              <div className="space-y-2">
                <div className="h-16 rounded-xl bg-crib-red border border-crib-border shadow-red/20 shadow-md" />
                <div className="text-xs font-bold font-display">Crib Red</div>
                <div className="text-[11px] text-crib-warm-gray font-mono">#C62828</div>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded-xl bg-crib-red-dark border border-crib-border" />
                <div className="text-xs font-bold font-display">Deep Red</div>
                <div className="text-[11px] text-crib-warm-gray font-mono">#8E1B1B</div>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded-xl bg-crib-ink border border-zinc-800" />
                <div className="text-xs font-bold font-display">Ink</div>
                <div className="text-[11px] text-crib-warm-gray font-mono">#0B0B0D</div>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded-xl bg-crib-charcoal border border-zinc-800" />
                <div className="text-xs font-bold font-display">Charcoal</div>
                <div className="text-[11px] text-crib-warm-gray font-mono">#17171A</div>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded-xl bg-crib-cream text-crib-ink flex items-center justify-center font-bold text-xs" />
                <div className="text-xs font-bold font-display">Cream</div>
                <div className="text-[11px] text-crib-warm-gray font-mono">#F4EFE7</div>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded-xl bg-crib-warm-gray" />
                <div className="text-xs font-bold font-display">Warm Gray</div>
                <div className="text-[11px] text-crib-warm-gray font-mono">#A8A29A</div>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded-xl bg-white text-black flex items-center justify-center font-bold text-xs" />
                <div className="text-xs font-bold font-display">White</div>
                <div className="text-[11px] text-crib-warm-gray font-mono">#FFFFFF</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Interactive Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Sample Base UI Modal"
        description="This modal demonstrates accessible dialog trapping, esc key listener, and backdrop blur."
      >
        <p className="text-xs text-crib-warm-gray leading-relaxed">
          Base UI primitives are built with Tailwind CSS utilities and adhere to the 150–250ms interaction guideline from docs/UI-GUIDELINE.md.
        </p>
        <div className="mt-5 flex justify-end">
          <Button variant="primary" size="sm" onClick={() => setIsModalOpen(false)}>
            Close Modal
          </Button>
        </div>
      </Modal>

      {/* Interactive Confirm Dialog */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          setIsConfirmOpen(false);
          showToast('Confirmed action executed successfully', 'success');
        }}
        title="Confirm Reset State"
        message="This is a demonstration of the confirmation state required for destructive or critical actions."
        confirmText="Proceed"
        cancelText="Cancel"
      />
    </div>
  );
}
