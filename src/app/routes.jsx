import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PublicLayout } from '../layouts/PublicLayout';
import { AppLayout } from '../layouts/AppLayout';
import { LandingPage } from '../pages/LandingPage';
import { FoundationShowcase } from '../pages/FoundationShowcase';
import { PhasePlaceholder } from '../pages/PhasePlaceholder';
import { PosPage } from '../pages/PosPage';
import { StaffDashboardPage } from '../pages/StaffDashboardPage';
import { StaffOrdersPage } from '../pages/StaffOrdersPage';
import { OwnerDashboardPage } from '../pages/owner/OwnerDashboardPage';
import { OwnerOrdersPage } from '../pages/owner/OwnerOrdersPage';
import { OwnerProductsPage } from '../pages/owner/OwnerProductsPage';
import { OwnerStaffPage } from '../pages/owner/OwnerStaffPage';
import { OwnerSettingsPage } from '../pages/owner/OwnerSettingsPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';

export function AppRoutes() {
  const { role } = useAuth();

  // Pick shell layout: AppLayout if role is staff or owner, PublicLayout if guest
  const ShellLayout = role === 'guest' ? PublicLayout : AppLayout;

  return (
    <Routes>
      {/* Root & Public Routes */}
      <Route element={<ShellLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/menu" element={<LandingPage />} />
        <Route path="/story" element={<LandingPage />} />
        <Route path="/location" element={<LandingPage />} />
        <Route path="/foundation" element={<FoundationShowcase />} />
        <Route path="/pos" element={<Navigate to="/staff/pos" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Staff Routes */}
      <Route path="/staff" element={<AppLayout />}>
        <Route index element={<StaffDashboardPage />} />
        <Route path="pos" element={<PosPage />} />
        <Route path="orders" element={<StaffOrdersPage />} />
      </Route>

      {/* Owner Routes */}
      <Route path="/owner" element={<AppLayout />}>
        <Route index element={<OwnerDashboardPage />} />
        <Route path="orders" element={<OwnerOrdersPage />} />
        <Route path="products" element={<OwnerProductsPage />} />
        <Route path="staff" element={<OwnerStaffPage />} />
        <Route path="settings" element={<OwnerSettingsPage />} />
      </Route>

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
