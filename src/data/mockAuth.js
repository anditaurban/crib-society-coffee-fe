/**
 * Mock Auth Data
 * Source of Truth: docs/API-SPEC.md Section 2 & 7
 * User: id, name, email, role, status
 */

export const MOCK_USERS = [
  {
    id: 'usr_owner_01',
    name: 'Crib Founder',
    email: 'owner@cribsociety.com',
    role: 'owner',
    status: 'active',
  },
  {
    id: 'usr_staff_01',
    name: 'Alex Barista',
    email: 'alex@cribsociety.com',
    role: 'staff',
    status: 'active',
  },
  {
    id: 'usr_staff_02',
    name: 'Sam Cashier',
    email: 'sam@cribsociety.com',
    role: 'staff',
    status: 'active',
  },
];

export const MOCK_CURRENT_USER = MOCK_USERS[0];
