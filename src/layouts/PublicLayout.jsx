import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Header } from '../components/navigation/Header';
import { MobileNav } from '../components/navigation/MobileNav';
import { Coffee, MapPin, Clock, Instagram, ArrowUpRight } from 'lucide-react';

export function PublicLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-crib-ink text-crib-cream antialiased selection:bg-crib-red selection:text-white">
      <Header onOpenMobileNav={() => setMobileNavOpen(true)} />

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Rich Editorial Footer */}
      <footer className="border-t border-crib-border/80 bg-crib-charcoal/80 pt-16 pb-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-crib-border/60">
            {/* Brand column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-crib-red flex items-center justify-center text-white shadow-md shadow-crib-red/20">
                  <Coffee className="w-4 h-4" />
                </div>
                <span className="font-display font-extrabold text-xl tracking-tight text-crib-cream uppercase">
                  CRIB SOCIETY
                </span>
              </div>
              <p className="text-xs text-crib-warm-gray leading-relaxed max-w-sm">
                A rebellious coffee sanctum and creative hub in South Jakarta. Uncompromising single-origin roasts, night-shift sanctuary, and community-driven culture.
              </p>
              <div className="text-xs font-mono text-crib-red font-semibold">
                EST. 2024 • SENOPATI, INDONESIA
              </div>
            </div>

            {/* Navigation links */}
            <div className="lg:col-span-2 space-y-3">
              <div className="text-xs font-mono uppercase font-bold tracking-wider text-crib-cream">
                Exploration
              </div>
              <ul className="space-y-2 text-xs font-mono text-crib-warm-gray">
                <li>
                  <a href="/#menu" className="hover:text-crib-cream transition-colors">
                    Featured Menu
                  </a>
                </li>
                <li>
                  <a href="/#story" className="hover:text-crib-cream transition-colors">
                    Brand Story
                  </a>
                </li>
                <li>
                  <a href="/#experience" className="hover:text-crib-cream transition-colors">
                    The Space
                  </a>
                </li>
                <li>
                  <a href="/#location" className="hover:text-crib-cream transition-colors">
                    Flagship Outpost
                  </a>
                </li>
              </ul>
            </div>

            {/* Portal links */}
            <div className="lg:col-span-3 space-y-3">
              <div className="text-xs font-mono uppercase font-bold tracking-wider text-crib-cream">
                Operations &amp; Tech
              </div>
              <ul className="space-y-2 text-xs font-mono text-crib-warm-gray">
                <li>
                  <Link to="/staff/pos" className="hover:text-crib-red transition-colors flex items-center gap-1">
                    Staff POS Terminal <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </li>
                <li>
                  <Link to="/staff" className="hover:text-crib-cream transition-colors">
                    Staff Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/owner" className="hover:text-crib-cream transition-colors">
                    Owner Console
                  </Link>
                </li>
                <li>
                  <Link to="/foundation" className="hover:text-crib-cream transition-colors text-zinc-400">
                    Foundation Showcase (Phase 1)
                  </Link>
                </li>
              </ul>
            </div>

            {/* Hours & Contact */}
            <div className="lg:col-span-3 space-y-3">
              <div className="text-xs font-mono uppercase font-bold tracking-wider text-crib-cream">
                Hours &amp; Inquiries
              </div>
              <div className="text-xs font-mono text-crib-warm-gray space-y-1">
                <div>Mon – Thu: 07:00 – 23:00 WIB</div>
                <div className="text-crib-cream font-semibold">Fri – Sat: 07:00 – 00:00 WIB</div>
                <div>Sun: 07:00 – 22:00 WIB</div>
              </div>
              <div className="pt-2 text-xs text-crib-warm-gray">
                Jl. Suryo No. 42, Senopati, Jakarta Selatan
              </div>
            </div>
          </div>

          {/* Bottom copyright line */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-crib-warm-gray">
            <div>
              &copy; {new Date().getFullYear()} CRIB SOCIETY COFFEE. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>Phase 2 Verified</span>
              <span>•</span>
              <span>API Contract Ready</span>
            </div>
          </div>
        </div>
      </footer>

      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </div>
  );
}

