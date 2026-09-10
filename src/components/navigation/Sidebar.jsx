import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getNavForRole } from '../../config/nav.config';
import { cn } from '../../utils/cn';
import {
  LayoutDashboard,
  ShoppingBag,
  Receipt,
  BarChart3,
  Coffee,
  Users,
  Settings,
  LogOut,
  Shield,
  UserCheck,
} from 'lucide-react';

const ICON_MAP = {
  LayoutDashboard,
  ShoppingBag,
  Receipt,
  BarChart3,
  Coffee,
  Users,
  Settings,
};

export function Sidebar({ className, onItemClick }) {
  const { role, currentUser, logout } = useAuth();
  const navConfig = getNavForRole(role);

  if (!navConfig.items) return null;

  return (
    <aside
      className={cn(
        'flex flex-col w-64 bg-crib-charcoal border-r border-crib-border h-full',
        className
      )}
    >
      {/* Role Title */}
      <div className="p-5 border-b border-crib-border/80 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-crib-red">
            {role === 'owner' ? 'Administrative' : 'Operational'}
          </span>
          <h2 className="text-sm font-bold font-display tracking-tight text-crib-cream">
            {navConfig.title}
          </h2>
        </div>
        {role === 'owner' ? (
          <Shield className="w-4 h-4 text-amber-500" />
        ) : (
          <UserCheck className="w-4 h-4 text-crib-red" />
        )}
      </div>

      {/* Navigation List */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navConfig.items.map((item) => {
          const Icon = ICON_MAP[item.icon] || Coffee;

          return (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.path === '/staff' || item.path === '/owner'}
              onClick={onItemClick}
              className={({ isActive }) =>
                cn(
                  'flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors duration-150 focus-ring',
                  isActive
                    ? 'bg-crib-red text-white shadow-red/30 shadow-sm'
                    : 'text-crib-warm-gray hover:text-crib-cream hover:bg-surface-hover'
                )
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-1.5 py-0.5 rounded text-[10px] uppercase font-bold bg-white/20 text-white">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User profile footer */}
      <div className="p-4 border-t border-crib-border/80 bg-crib-ink/40">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1 mr-2">
            <p className="text-xs font-bold font-display text-crib-cream truncate">
              {currentUser?.name || (role === 'owner' ? 'Crib Owner' : 'Alex Staff')}
            </p>
            <p className="text-[11px] text-crib-warm-gray truncate">
              {currentUser?.email || `${role}@cribsociety.com`}
            </p>
          </div>
          <button
            onClick={logout}
            title="Sign Out"
            className="p-1.5 rounded-lg text-crib-warm-gray hover:text-red-400 hover:bg-red-950/40 transition-colors focus-ring"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
