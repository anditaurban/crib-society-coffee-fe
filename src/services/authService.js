/**
 * Auth Service
 * Source of Truth: docs/API-SPEC.md Section 2
 * POST /auth/login -> { user, token }
 * POST /auth/logout -> { success: true }
 */

import { MOCK_USERS, MOCK_CURRENT_USER } from '../data/mockAuth';
import { mockNetworkDelay, createApiError } from './api';

const TOKEN_STORAGE_KEY = 'crib_auth_token';
const USER_STORAGE_KEY = 'crib_auth_user';

export const authService = {
  async login({ email, password }) {
    // In mock mode, find matching user or default to owner/staff
    const user = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === email?.toLowerCase()
    );

    if (!user && email !== 'guest') {
      throw createApiError('Invalid credentials. Try owner@cribsociety.com or alex@cribsociety.com', 401);
    }

    const activeUser = user || MOCK_CURRENT_USER;
    const token = `mock_jwt_${activeUser.role}_${Date.now()}`;

    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(activeUser));

    return mockNetworkDelay({
      user: activeUser,
      token,
    });
  },

  async logout() {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    return mockNetworkDelay({ success: true });
  },

  async register({ name, email, password }) {
    const newUser = {
      id: `usr_${Date.now()}`,
      name: name || 'Society Member',
      email,
      role: 'guest',
      status: 'active',
    };
    MOCK_USERS.push(newUser);
    const token = `mock_jwt_guest_${Date.now()}`;
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    return mockNetworkDelay({ user: newUser, token });
  },

  getCurrentUser() {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  },

  switchRole(role) {
    const user = MOCK_USERS.find((u) => u.role === role) || {
      id: `usr_${role}`,
      name: role === 'owner' ? 'Crib Owner' : 'Alex Staff',
      email: `${role}@cribsociety.com`,
      role,
      status: 'active',
    };
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    return user;
  },
};
