/**
 * Mock Products Data
 * Source of Truth: docs/API-SPEC.md Section 3 & 7
 * Product: id, name, categoryId, price, stock, image, status
 */

export const MOCK_CATEGORIES = [
  { id: 'all', name: 'All Items' },
  { id: 'espresso', name: 'Espresso Bar' },
  { id: 'signature', name: 'Signature Brews' },
  { id: 'non_coffee', name: 'Non-Coffee' },
  { id: 'pastry', name: 'Pastries & Bites' },
];

export const MOCK_PRODUCTS = [
  {
    id: 'prod_001',
    name: 'Crib Velvet Americano',
    categoryId: 'espresso',
    price: 32000,
    stock: 85,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    status: 'active',
  },
  {
    id: 'prod_002',
    name: 'Smoked Oat Flat White',
    categoryId: 'espresso',
    price: 42000,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=600&q=80',
    status: 'active',
  },
  {
    id: 'prod_003',
    name: 'Red Velvet Nitro Cold Brew',
    categoryId: 'signature',
    price: 48000,
    stock: 20,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
    status: 'active',
  },
  {
    id: 'prod_004',
    name: 'Kyoto Drip Rebellion',
    categoryId: 'signature',
    price: 45000,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
    status: 'active',
  },
  {
    id: 'prod_005',
    name: 'Uji Matcha Cloud',
    categoryId: 'non_coffee',
    price: 40000,
    stock: 35,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80',
    status: 'active',
  },
  {
    id: 'prod_006',
    name: 'Artisan Sourdough Croissant',
    categoryId: 'pastry',
    price: 35000,
    stock: 4,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
    status: 'active',
  },
  {
    id: 'prod_007',
    name: 'Cinnamon Espresso Bun',
    categoryId: 'pastry',
    price: 38000,
    stock: 0,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    status: 'out_of_stock',
  },
  {
    id: 'prod_008',
    name: 'Blood Orange Sparkling Tonic',
    categoryId: 'non_coffee',
    price: 39000,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    status: 'draft',
  },
];
