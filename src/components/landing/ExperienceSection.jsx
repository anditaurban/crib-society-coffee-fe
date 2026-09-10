import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import {
  Wifi,
  Disc3,
  Moon,
  Cpu,
  Volume2,
  Users,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export function ExperienceSection() {
  const experiences = [
    {
      id: 'bar',
      icon: Cpu,
      title: 'CALIBRATED GEAR & CRAFT',
      badge: 'Precision Lab',
      description:
        'Slayer custom-built espresso gear, Mahlkönig peak grinders, and digital TDS refractometer extraction monitoring for unmatched cup consistency.',
    },
    {
      id: 'work',
      icon: Wifi,
      title: 'CREATIVE WORKSPACE PROTOCOL',
      badge: '1 Gbps Fiber',
      description:
        'Engineered for digital nomads, designers, and software devs. Dedicated AC power and USB-C ports at every seat with dual-band fiber redundancy.',
    },
    {
      id: 'music',
      icon: Disc3,
      title: 'ANALOG SOUNDSCAPE ARCHIVE',
      badge: 'Vinyl Curated',
      description:
        'Warm analog acoustics powered by vintage Japanese turntables and custom horn speakers. Curated soundscapes spanning Japanese jazz, deep house, and lo-fi.',
    },
    {
      id: 'nocturnal',
      icon: Moon,
      title: 'NIGHT OWL SANCTUARY',
      badge: 'Until 23:00',
      description:
        'Unlike cafes that rush you out at sunset, our ambient lights dim and the tempo shifts. Serving espresso cocktails and decaf pour-overs into the late hours.',
    },
  ];

  return (
    <section id="experience" className="py-16 sm:py-24 border-b border-crib-border/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-crib-red font-mono font-bold">
              [ 04 // THE SPACE &amp; VALUE PROPOSITION ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-crib-cream uppercase tracking-tight leading-tight">
              ENGINEERED FOR THE{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-crib-cream via-zinc-200 to-zinc-400">
                RESTLESS MINDS.
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-crib-charcoal border border-crib-border text-xs font-mono text-crib-warm-gray">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Room Temp: 22°C • Sound: 50dB Ambient</span>
          </div>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp) => {
            const Icon = exp.icon;
            return (
              <div
                key={exp.id}
                className="rounded-xl border border-crib-border/80 bg-crib-charcoal/50 p-6 hover:bg-crib-charcoal hover:border-crib-red/60 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-lg bg-crib-ink border border-crib-border flex items-center justify-center text-crib-red group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge variant="neutral" size="sm">
                      {exp.badge}
                    </Badge>
                  </div>

                  <h3 className="text-base font-display font-bold text-crib-cream uppercase tracking-tight mb-2">
                    {exp.title}
                  </h3>

                  <p className="text-xs text-crib-warm-gray leading-relaxed">
                    {exp.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-crib-border/40 text-[11px] font-mono text-zinc-400">
                  STANDARD COMPLIANT
                </div>
              </div>
            );
          })}
        </div>

        {/* Sensory Bar Details */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 p-6 sm:p-8 rounded-2xl border border-crib-border bg-crib-charcoal/30">
          <div className="space-y-1">
            <div className="text-xs font-mono text-crib-red uppercase font-bold">
              // Roasting Specs
            </div>
            <div className="text-sm font-semibold text-crib-cream">
              Weekly Small Batch Roasting
            </div>
            <p className="text-xs text-crib-warm-gray">
              Direct flame drum roaster with continuous sensory profiling.
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-mono text-crib-red uppercase font-bold">
              // Water Chemistry
            </div>
            <div className="text-sm font-semibold text-crib-cream">
              Reverse Osmosis Remineralized
            </div>
            <p className="text-xs text-crib-warm-gray">
              Optimal 130ppm mineral balance tuned specifically for Indonesian washed &amp; natural coffees.
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-mono text-crib-red uppercase font-bold">
              // Community Access
            </div>
            <div className="text-sm font-semibold text-crib-cream">
              Free Society Cuppings
            </div>
            <p className="text-xs text-crib-warm-gray">
              Every Thursday 19:30 WIB open to all guests &amp; homebrewers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
