import React from 'react';
import { NavLink } from 'react-router-dom';
import { Drawer } from '../common/Drawer';
import { Sidebar } from './Sidebar';
import { useAuth } from '../../context/AuthContext';
import { NAV_CONFIG } from '../../config/nav.config';
import { cn } from '../../utils/cn';
import { Coffee } from 'lucide-react';

export function MobileNav({ isOpen, onClose }) {
  const { role } = useAuth();

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={role === 'guest' ? 'Crib Society' : undefined}
      position="left"
      width="w-72 max-w-[80vw]"
    >
      {role === 'guest' ? (
        <div className="flex flex-col h-full justify-between">
          <div className="space-y-1 py-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-crib-warm-gray px-3 mb-2">
              Menu Navigation
            </p>
            {NAV_CONFIG.public.items.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'block px-3 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider transition-colors',
                    isActive
                      ? 'bg-crib-red text-white'
                      : 'text-crib-warm-gray hover:text-crib-cream hover:bg-surface-hover'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="pt-4 border-t border-crib-border/80 space-y-2">
            <NavLink
              to="/login"
              onClick={onClose}
              className="block w-full py-2.5 px-3 rounded-xl bg-crib-charcoal border border-crib-border text-center text-xs font-semibold uppercase tracking-wider text-crib-cream hover:text-white transition-colors"
            >
              Sign In
            </NavLink>
            <NavLink
              to="/register"
              onClick={onClose}
              className="block w-full py-2.5 px-3 rounded-xl bg-crib-red text-center text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-red-950/40 hover:bg-crib-red-light transition-colors"
            >
              Register
            </NavLink>
            <p className="text-[10px] text-crib-warm-gray text-center pt-2 font-mono">
              Crib Society Coffee &copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      ) : (
        <div className="-m-4 h-full">
          <Sidebar onItemClick={onClose} />
        </div>
      )}
    </Drawer>
  );
}
