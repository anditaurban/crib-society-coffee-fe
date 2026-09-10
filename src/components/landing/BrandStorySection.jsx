import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import { Badge } from '../common/Badge';
import { Flame, Compass, Disc, Zap } from 'lucide-react';

export function BrandStorySection() {
  const pillars = [
    {
      id: 'science',
      number: '01',
      icon: Flame,
      title: 'SURGICAL ROAST SCIENCE',
      description:
        'We source single-origin micro-lots directly from high-altitude estates across Aceh Gayo, Toraja, and Kintamani. Roasted in small batches to unleash explosive natural acidity and rich body.',
      tag: 'Micro-Lot Arabica',
    },
    {
      id: 'sanctuary',
      number: '02',
      icon: Disc,
      title: 'THE NOCTURNAL SANCTUARY',
      description:
        'Great breakthroughs rarely happen at 9 to 5. We keep our doors open late into the night, powered by lo-fi vinyl sessions, deep ambient lighting, and high-speed fiber connectivity.',
      tag: 'Open Till 23:00',
    },
    {
      id: 'culture',
      number: '03',
      icon: Zap,
      title: 'RAW SUBCULTURE & ARCHITECTURE',
      description:
        'Brutalist charcoal concrete contrasts with bold Crib Red accents and warm cedar textures. Designed as a playground for designers, coders, writers, and espresso purists alike.',
      tag: 'Urban Space',
    },
  ];

  return (
    <section id="story" className="py-16 sm:py-24 border-b border-crib-border/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-crib-red font-mono font-bold">
              [ 02 // THE CULTURE &amp; MANIFESTO ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-crib-cream uppercase tracking-tight leading-tight">
              WE DON'T JUST PULL SHOTS.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-crib-cream to-crib-warm-gray">
                WE CRAFT SUBCULTURE.
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-crib-warm-gray max-w-md font-sans leading-relaxed">
            Born out of frustration with sterile, uninspired corporate coffee chains. Crib Society exists as an unapologetic intersection of street aesthetics, relentless work ethic, and uncompromising coffee craft.
          </p>
        </div>

        {/* 3 Editorial Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="group relative rounded-xl border border-crib-border/80 bg-crib-charcoal/60 p-6 sm:p-8 hover:border-crib-red/60 hover:bg-crib-charcoal transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono text-crib-red font-bold">
                      [{pillar.number}]
                    </span>
                    <Badge variant="neutral" size="sm">
                      {pillar.tag}
                    </Badge>
                  </div>

                  <div className="w-10 h-10 rounded-lg bg-crib-ink border border-crib-border flex items-center justify-center text-crib-red mb-5 group-hover:scale-110 group-hover:border-crib-red/50 transition-all">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-display font-bold text-crib-cream uppercase tracking-tight mb-3">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-crib-warm-gray leading-relaxed font-sans">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-crib-border/50 flex items-center text-xs font-mono text-zinc-400 group-hover:text-crib-red transition-colors">
                  <span>DISCOVER STANDARD &rarr;</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight Manifesto Quote Banner */}
        <div className="rounded-2xl border border-crib-red/30 bg-gradient-to-r from-crib-charcoal via-crib-ink to-crib-charcoal p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-crib-red/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-crib-red">
              Society Directive 01
            </div>
            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-crib-cream uppercase tracking-tight leading-snug">
              “Life is too short for diluted beans and generic spaces. Drink with intention, create without apology.”
            </blockquote>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-8 h-8 rounded-full bg-crib-red text-white flex items-center justify-center font-bold text-xs">
                CS
              </div>
              <div>
                <div className="text-xs font-bold text-crib-cream uppercase font-mono">
                  CRIB SOCIETY FOUNDERS
                </div>
                <div className="text-[11px] text-crib-warm-gray">
                  Senopati Roastery &amp; Bar, Jakarta
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
