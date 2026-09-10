/**
 * Configuration-Driven Navigation Schema
 * Source of Truth: docs/USER-FLOW.md, docs/PRD.md
 */

export const NAV_CONFIG = {
  public: {
    brand: {
      name: 'CRIB SOCIETY',
      path: '/',
    },
    items: [
      { id: 'home', label: 'Home', path: '/' },
      { id: 'menu', label: 'Menu', path: '/menu' },
      { id: 'story', label: 'Brand Story', path: '/story' },
      { id: 'location', label: 'Locations', path: '/location' },
    ],
    actions: [
      { id: 'order', label: 'Order Now', path: '/menu', variant: 'primary' },
      { id: 'login', label: 'Portal', path: '/login', variant: 'outline' },
    ],
  },
  staff: {
    title: 'Staff Portal',
    items: [
      {
        id: 'staff-dashboard',
        label: 'Dashboard',
        path: '/staff',
        icon: 'LayoutDashboard',
        badge: null,
      },
      {
        id: 'staff-pos',
        label: 'Point of Sale (POS)',
        path: '/staff/pos',
        icon: 'ShoppingBag',
        badge: 'Live',
      },
      {
        id: 'staff-orders',
        label: "Today's Orders",
        path: '/staff/orders',
        icon: 'Receipt',
        badge: null,
      },
    ],
  },
  owner: {
    title: 'Owner Console',
    items: [
      {
        id: 'owner-dashboard',
        label: 'Overview & KPIs',
        path: '/owner',
        icon: 'BarChart3',
        badge: null,
      },
      {
        id: 'owner-orders',
        label: 'Order Management',
        path: '/owner/orders',
        icon: 'Receipt',
        badge: null,
      },
      {
        id: 'owner-products',
        label: 'Menu & Products',
        path: '/owner/products',
        icon: 'Coffee',
        badge: null,
      },
      {
        id: 'owner-staff',
        label: 'Staff Access',
        path: '/owner/staff',
        icon: 'Users',
        badge: null,
      },
      {
        id: 'owner-settings',
        label: 'Settings',
        path: '/owner/settings',
        icon: 'Settings',
        badge: null,
      },
    ],
  },
};

/**
 * Helper to retrieve navigation items based on active role
 */
export function getNavForRole(role) {
  if (role === 'owner') return NAV_CONFIG.owner;
  if (role === 'staff') return NAV_CONFIG.staff;
  return NAV_CONFIG.public;
}
