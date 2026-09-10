/**
 * Crib Society Theme Configuration
 * Source of Truth: docs/UI-GUIDELINE.md
 */

export const THEME_CONFIG = {
  brand: {
    name: 'Crib Society',
    tagline: 'Coffee & Culture',
    established: '2024',
  },
  colors: {
    primary: '#C62828',       // Crib Red
    primaryDark: '#8E1B1B',   // Deep Red
    ink: '#0B0B0D',           // Primary surface
    charcoal: '#17171A',      // Secondary surface / cards
    cream: '#F4EFE7',         // Primary text
    warmGray: '#A8A29A',      // Secondary text / borders
    white: '#FFFFFF',
  },
  roles: {
    GUEST: 'guest',
    STAFF: 'staff',
    OWNER: 'owner',
  },
  orderStatus: {
    PENDING: { id: 'pending', label: 'Pending', color: 'warning' },
    IN_PROGRESS: { id: 'in_progress', label: 'In Progress', color: 'info' },
    COMPLETED: { id: 'completed', label: 'Completed', color: 'success' },
    CANCELLED: { id: 'cancelled', label: 'Cancelled', color: 'danger' },
  },
  productStatus: {
    ACTIVE: { id: 'active', label: 'Active', color: 'success' },
    OUT_OF_STOCK: { id: 'out_of_stock', label: 'Out of Stock', color: 'danger' },
    DRAFT: { id: 'draft', label: 'Draft', color: 'neutral' },
  },
};
