/**
 * Auth Service
 * Source of Truth: docs/API-INTEGRATION.md Section 3
 * 
 * Endpoints:
 * - POST /auth/login
 * - POST /auth/register
 * - GET  /auth/me
 * - POST /auth/logout
 */

import { apiRequest } from './api';

const TOKEN_STORAGE_KEY = 'crib_auth_token';
const USER_STORAGE_KEY = 'crib_auth_user';

export const authService = {
  /**
   * Log in user with email & password
   */
  async login({ email, password }) {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: { email: email.trim(), password },
    });

    if (response.token && response.user) {
      localStorage.setItem(TOKEN_STORAGE_KEY, response.token);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(response.user));
    }

    return response;
  },

  /**
   * Register new user / staff member
   */
  async register({ name, email, password, role = 'guest' }) {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: { name: name.trim(), email: email.trim(), password, role },
    });

    if (response.token && response.user) {
      localStorage.setItem(TOKEN_STORAGE_KEY, response.token);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(response.user));
    }

    return response;
  },

  /**
   * Verify and fetch current authenticated user profile from backend
   */
  async getMe() {
    const response = await apiRequest('/auth/me');
    if (response.user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(response.user));
    }
    return response.user;
  },

  /**
   * Log out user from session
   */
  async logout() {
    try {
      await apiRequest('/auth/logout', { method: 'POST' });
    } catch {
      // Ignore network errors during logout
    } finally {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
    }
    return { success: true };
  },

  /**
   * Get cached user from localStorage
   */
  getCurrentUser() {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  },

  /**
   * Quick role switch helper for preview/demo
   */
  async switchRole(role) {
    const defaultCredentials = {
      owner: { email: 'owner@cribsociety.com', password: 'password123' },
      staff: { email: 'sarah@cribsociety.com', password: 'password123' },
    };

    if (defaultCredentials[role]) {
      try {
        const res = await this.login(defaultCredentials[role]);
        return res.user;
      } catch {
        // Fallback to local session update if server offline
      }
    }

    const current = this.getCurrentUser() || {};
    const updated = { ...current, role };
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  },
};
