import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => authService.getCurrentUser());
  const [isLoading, setIsLoading] = useState(false);

  // Default to guest if no user is saved
  const role = currentUser?.role || 'guest';

  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);
      setCurrentUser(response.user);
      return response;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setIsLoading(true);
    try {
      const response = await authService.register(userData);
      setCurrentUser(response.user);
      return response;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const switchRole = useCallback((newRole) => {
    const user = authService.switchRole(newRole);
    setCurrentUser(user);
    return user;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role,
        isGuest: role === 'guest',
        isStaff: role === 'staff',
        isOwner: role === 'owner',
        login,
        register,
        logout,
        switchRole,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
