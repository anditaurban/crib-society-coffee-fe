import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import {
  ArrowRight,
  Flame,
  Sparkles,
  Clock,
  MapPin,
  Coffee,
  ShoppingBag,
  Zap,
} from 'lucide-react';

export function HeroSection({ onExploreMenu }) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-24 border-b border-crib-border/40">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-crib-red/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-red-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Manifesto */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            {/* Live Status Pill & Established Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-crib-red/10 border border-crib-red/30 text-crib-red text-xs font-semibold tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-crib-red animate-pulse" />
                Open Today 07:00 – 23:00 WIB
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-crib-charcoal border border-crib-border text-crib-warm-gray text-xs font-mono">
                <MapPin className="w-3.5 h-3.5 text-crib-red" />
                Senopati, South Jakarta
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-crib-warm-gray font-mono font-bold">
                [ 01 // THE MANIFESTO ]
              </span>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-display font-extrabold text-crib-cream uppercase tracking-tight leading-[0.95]">
                NOT YOUR <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-crib-cream via-zinc-200 to-zinc-400">
                  AVERAGE
                </span>{' '}
                <span className="text-crib-red underline decoration-crib-red/40 decoration-wavy decoration-2">
                  BREW.
                </span>
              </h1>
            </div>

            {/* Brand Paragraph */}
            <p className="text-base sm:text-lg text-crib-warm-gray max-w-xl font-sans leading-relaxed">
              Crib Society is a rebellious coffee sanctum engineered for creators, night owls, and espresso purists. We roast single-origin beans with surgical precision and serve them in high-contrast spaces alive with raw energy.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={onExploreMenu}
                rightIcon={ArrowRight}
                className="shadow-lg shadow-crib-red/25 hover:shadow-crib-red/40 transition-all font-semibold uppercase tracking-wider"
              >
                Explore Full Menu
              </Button>

              <a
                href="#story"
                className="inline-flex items-center justify-center px-5 py-3 rounded-lg border border-crib-border hover:border-zinc-500 bg-crib-charcoal/80 text-crib-cream hover:text-white text-sm font-semibold transition-colors uppercase tracking-wider"
              >
                Our Brand Story
              </a>

              <Link
                to="/staff/pos"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-crib-red py-2 px-1 transition-colors"
                title="Launch Fast POS Terminal"
              >
                <Zap className="w-3.5 h-3.5 text-crib-red" />
                Launch Staff POS Terminal &rarr;
              </Link>
            </div>

            {/* Quick Stats Grid */}
            <div className="pt-6 border-t border-crib-border/50 grid grid-cols-3 gap-4 sm:gap-6">
              <div>
                <div className="text-2xl sm:text-3xl font-display font-black text-crib-cream">
                  100%
                </div>
                <div className="text-xs uppercase font-mono text-crib-warm-gray">
                  Single Origin
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-display font-black text-crib-red">
                  16H
                </div>
                <div className="text-xs uppercase font-mono text-crib-warm-gray">
                  Cold Extraction
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-display font-black text-crib-cream">
                  4.9★
                </div>
                <div className="text-xs uppercase font-mono text-crib-warm-gray">
                  Society Rating
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card with High-Impact Composition */}
          <div className="lg:col-span-5 relative">
            {/* Geometric Accent Frames */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-crib-red/30 via-zinc-800/40 to-transparent blur-sm" />

            <div className="relative rounded-2xl border border-crib-border/80 bg-crib-charcoal/90 p-5 shadow-2xl backdrop-blur-md overflow-hidden">
              {/* Product Hero Image */}
              <div className="relative h-72 sm:h-80 w-full rounded-xl overflow-hidden bg-zinc-900 group">
                <img
                  src="https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80"
                  alt="Red Velvet Nitro Cold Brew"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 contrast-110"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-crib-ink via-transparent to-black/30" />

                {/* Badges on image */}
                <div className="absolute top-3 left-3">
                  <Badge variant="primary" size="sm" dot>
                    House Signature
                  </Badge>
                </div>
                <div className="absolute top-3 right-3 bg-crib-ink/80 backdrop-blur px-2.5 py-1 rounded-full border border-crib-border text-[11px] font-mono text-crib-cream">
                  Draft #03
                </div>

                {/* Drink Highlight caption */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-xs uppercase tracking-widest text-crib-red font-mono font-bold">
                    Nitro Infusion Series
                  </div>
                  <h3 className="text-xl font-display font-bold text-white uppercase tracking-tight">
                    Red Velvet Nitro Cold Brew
                  </h3>
                  <div className="flex items-center justify-between mt-1 text-xs text-zinc-300">
                    <span>Notes: Smoked Cherry • Cocoa • Velvet Crema</span>
                    <span className="font-bold text-white text-sm font-mono">
                      Rp 48.000
                    </span>
                  </div>
                </div>
              </div>

              {/* Mini Feature Card underneath */}
              <div className="mt-4 pt-4 border-t border-crib-border/60 flex items-center justify-between text-xs text-crib-warm-gray">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-crib-ink flex items-center justify-center border border-crib-border">
                    <Coffee className="w-4 h-4 text-crib-red" />
                  </div>
                  <div>
                    <div className="font-semibold text-crib-cream">Slow-Extracted</div>
                    <div className="text-[11px]">Nitrogen-infused on tap</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onExploreMenu}
                  className="text-xs font-semibold text-crib-red hover:text-red-400 uppercase tracking-wider font-mono flex items-center gap-1 transition-colors"
                >
                  Order Now &rarr;
                </button>
              </div>
            </div>

            {/* Floating Tag */}
            <div className="hidden sm:flex absolute -bottom-5 -left-6 items-center gap-2 px-3 py-2 rounded-xl bg-crib-ink border border-crib-border shadow-xl text-xs">
              <Flame className="w-4 h-4 text-crib-red" />
              <span className="text-zinc-200 font-semibold">1,200+ Cups</span>
              <span className="text-crib-warm-gray">Served this week</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
