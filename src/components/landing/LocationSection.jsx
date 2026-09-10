import React, { useState } from 'react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { useToast } from '../../context/ToastContext';
import {
  MapPin,
  Clock,
  Navigation,
  Copy,
  Check,
  Phone,
  Mail,
  Instagram,
  Car,
  Bike,
  Wifi,
  Sparkles,
} from 'lucide-react';

export function LocationSection() {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const coordinates = '-6.238291, 106.812493';
  const addressString =
    'Jl. Suryo No. 42, Senopati, Kebayoran Baru, Jakarta Selatan 12180';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(addressString);
    setCopied(true);
    showToast({
      type: 'success',
      title: 'Address Copied',
      message: 'Flagship location address copied to clipboard.',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="location" className="py-16 sm:py-24 border-b border-crib-border/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-crib-red font-mono font-bold">
              [ 05 // THE OUTPOST &amp; VISITATION ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-crib-cream uppercase tracking-tight leading-tight">
              FIND US AT{' '}
              <span className="text-crib-red">SENOPATI.</span>
            </h2>
          </div>

          <p className="text-sm text-crib-warm-gray max-w-md font-sans leading-relaxed">
            Positioned in the heart of South Jakarta’s creative corridor. Ample indoor workspace, breezy outdoor terrace, and dedicated brewing counter.
          </p>
        </div>

        {/* 2-Column Grid: Left (Hours & Amenities), Right (Simulated Interactive Outpost Map Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Hours & Amenities */}
          <div className="lg:col-span-6 space-y-6">
            {/* Hours Card */}
            <div className="rounded-xl border border-crib-border/80 bg-crib-charcoal/60 p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-crib-ink border border-crib-border flex items-center justify-center text-crib-red">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold text-crib-cream uppercase">
                    Operating Schedule
                  </h3>
                  <p className="text-xs text-crib-warm-gray">
                    Fresh batches pulled from morning until late night
                  </p>
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs divide-y divide-crib-border/50">
                <div className="flex justify-between items-center pt-2">
                  <span className="text-crib-cream font-semibold">
                    Monday – Thursday
                  </span>
                  <span className="text-crib-warm-gray">07:00 – 23:00 WIB</span>
                </div>
                <div className="flex justify-between items-center pt-3">
                  <span className="text-crib-red font-semibold">
                    Friday – Saturday (Late Night)
                  </span>
                  <span className="text-crib-cream font-bold">
                    07:00 – 00:00 WIB
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3">
                  <span className="text-crib-cream font-semibold">Sunday</span>
                  <span className="text-crib-warm-gray">07:00 – 22:00 WIB</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono text-emerald-400 font-semibold">
                  Currently Open for Dine-in &amp; Takeaway
                </span>
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Gigabit Fiber', icon: Wifi },
                { label: 'Outdoor Deck', icon: Sparkles },
                { label: 'Bike Rack', icon: Bike },
                { label: 'Valet Parking', icon: Car },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border border-crib-border/60 bg-crib-charcoal/40 flex flex-col items-center text-center gap-2"
                  >
                    <Icon className="w-4 h-4 text-crib-red" />
                    <span className="text-[11px] font-mono text-zinc-300 font-medium">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Direct Contact Links */}
            <div className="flex flex-wrap gap-4 text-xs font-mono">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-crib-border bg-crib-ink text-crib-warm-gray hover:text-crib-cream hover:border-zinc-500 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-crib-red" />
                @cribsociety.coffee
              </a>

              <a
                href="tel:+6281234567890"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-crib-border bg-crib-ink text-crib-warm-gray hover:text-crib-cream hover:border-zinc-500 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-crib-red" />
                +62 812-3456-7890
              </a>

              <a
                href="mailto:contact@cribsociety.com"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-crib-border bg-crib-ink text-crib-warm-gray hover:text-crib-cream hover:border-zinc-500 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-crib-red" />
                contact@cribsociety.com
              </a>
            </div>
          </div>

          {/* Right Column: Outpost Visual & Address Card */}
          <div className="lg:col-span-6 rounded-xl border border-crib-border bg-crib-charcoal/70 p-6 sm:p-8 space-y-6">
            {/* Visual Header / Map Representation */}
            <div className="relative h-60 rounded-xl overflow-hidden bg-zinc-950 border border-crib-border flex items-center justify-center group">
              {/* Map stylized background with street grid lines */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    'radial-gradient(#C62828 1px, transparent 1px), linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)',
                  backgroundSize: '24px 24px, 48px 48px, 48px 48px',
                }}
              />

              <div className="relative z-10 flex flex-col items-center text-center p-4 space-y-3">
                <div className="w-12 h-12 rounded-full bg-crib-red text-white flex items-center justify-center shadow-lg shadow-crib-red/40 animate-bounce">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-display font-bold text-white uppercase tracking-tight">
                    CRIB SOCIETY FLAGSHIP OUTPOST
                  </div>
                  <div className="text-xs font-mono text-crib-warm-gray mt-0.5">
                    Senopati Sector 4, Jakarta Selatan
                  </div>
                </div>
                <Badge variant="primary" size="sm">
                  Coordinates: {coordinates}
                </Badge>
              </div>
            </div>

            {/* Address Details & Action */}
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-crib-warm-gray font-bold tracking-wider">
                  Physical Address
                </span>
                <p className="text-sm font-semibold text-crib-cream">
                  {addressString}
                </p>
                <p className="text-xs text-crib-warm-gray">
                  Accessible via MRT Blok M or Senayan Station (5 mins ride).
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleCopyAddress}
                  leftIcon={
                    copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )
                  }
                  className="font-mono text-xs uppercase"
                >
                  {copied ? 'Copied' : 'Copy Full Address'}
                </Button>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    'Crib Society Coffee Senopati Jakarta'
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-crib-red hover:bg-red-700 text-white text-xs font-mono font-semibold uppercase transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Open in Google Maps &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
