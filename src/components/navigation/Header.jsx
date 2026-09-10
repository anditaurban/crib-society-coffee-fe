import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { NAV_CONFIG } from '../../config/nav.config';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Menu, Coffee, Shield, UserCheck, Eye } from 'lucide-react';
import { cn } from '../../utils/cn';

export function Header({ onOpenMobileNav, fullWidth = false }) {
  const { currentUser, role, logout } = useAuth();
  const location = useLocation();

  const isWide = fullWidth || role !== 'guest';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-crib-border/80 bg-crib-charcoal/90 backdrop-blur-md">
      <div
        className={cn(
          'h-16 flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8',
          isWide ? 'w-full' : 'max-w-7xl mx-auto'
        )}
      >
        {/* Left: Mobile trigger & Brand */}
        <div className="flex items-center gap-3">
          {onOpenMobileNav && (
            <button
              onClick={onOpenMobileNav}
              aria-label="Open navigation menu"
              className="lg:hidden p-2 rounded-lg text-crib-warm-gray hover:text-crib-cream hover:bg-surface-hover focus-ring"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-crib-red flex items-center justify-center text-white shadow-red/30 shadow-md group-hover:scale-105 transition-transform">
              <Coffee className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-tighter text-base sm:text-lg font-display text-crib-cream uppercase leading-none">
                CRIB SOCIETY
              </span>
              <span className="text-[10px] tracking-widest text-crib-warm-gray uppercase font-semibold">
                COFFEE &amp; CULTURE
              </span>
            </div>
          </Link>
        </div>

        {/* Center / Navigation items (Public mode) */}
        {role === 'guest' && (
          <nav className="hidden md:flex items-center gap-6">
            {NAV_CONFIG.public.items.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`text-xs uppercase tracking-wider font-semibold transition-colors duration-150 ${
                    isActive
                      ? 'text-crib-red'
                      : 'text-crib-warm-gray hover:text-crib-cream'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        )}

        {/* Right: Auth Actions (Login & Register for Guest, or Active User Portal) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {role === 'guest' ? (
            <>
              <Link to="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs uppercase tracking-wider font-semibold border-crib-border hover:border-crib-warm-gray"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  variant="primary"
                  size="sm"
                  className="text-xs uppercase tracking-wider font-semibold shadow-md shadow-red-950/40"
                >
                  Register
                </Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <Badge
                variant={role === 'owner' ? 'warning' : 'primary'}
                size="sm"
                dot
                className="hidden sm:inline-flex"
              >
                {role === 'owner' ? 'Owner Console' : 'Staff Mode'}
              </Badge>
              <Link to={role === 'owner' ? '/owner' : '/staff/pos'}>
                <Button
                  variant="primary"
                  size="sm"
                  className="text-xs uppercase tracking-wider font-semibold"
                >
                  {role === 'owner' ? 'Dashboard' : 'POS Terminal'}
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="text-xs uppercase tracking-wider font-semibold border-crib-border hover:border-rose-600 hover:text-rose-300"
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
