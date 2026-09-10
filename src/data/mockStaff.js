/**
 * Mock Staff Data
 * Source of Truth: docs/API-SPEC.md Section 6 & 7
 * Staff: id, name, email, role, status, shift
 */

export const MOCK_STAFF = [
  {
    id: 'stf_001',
    name: 'Alex Barista',
    email: 'alex@cribsociety.com',
    role: 'staff',
    roleTitle: 'Head Barista',
    status: 'active',
    shift: 'Morning (07:00 - 15:00)',
  },
  {
    id: 'stf_002',
    name: 'Sam Cashier',
    email: 'sam@cribsociety.com',
    role: 'staff',
    roleTitle: 'Cashier / POS Lead',
    status: 'active',
    shift: 'Morning (07:00 - 15:00)',
  },
  {
    id: 'stf_003',
    name: 'Maya Roaster',
    email: 'maya@cribsociety.com',
    role: 'staff',
    roleTitle: 'Roaster & Inventory',
    status: 'active',
    shift: 'Afternoon (14:00 - 22:00)',
  },
  {
    id: 'stf_004',
    name: 'Leo Trainee',
    email: 'leo@cribsociety.com',
    role: 'staff',
    roleTitle: 'Barista Trainee',
    status: 'inactive',
    shift: 'Off',
  },
];
