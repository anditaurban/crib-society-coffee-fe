import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/navigation/Header';
import { Sidebar } from '../components/navigation/Sidebar';
import { MobileNav } from '../components/navigation/MobileNav';

export function AppLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-crib-ink text-crib-cream">
      {/* Top Header */}
      <Header onOpenMobileNav={() => setMobileNavOpen(true)} fullWidth />

      {/* Main Workspace with responsive sidebar flush to the left */}
      <div className="flex-1 flex w-full min-h-0">
        {/* Desktop Sidebar (flush to left edge, visible on lg screens and up) */}
        <div className="hidden lg:block shrink-0">
          <Sidebar />
        </div>

        {/* Dynamic Content Outlet */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer (visible on screens < lg) */}
      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </div>
  );
}
