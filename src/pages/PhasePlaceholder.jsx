import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Clock, ShieldAlert } from 'lucide-react';

export function PhasePlaceholder({ title, phase, description }) {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card className="border-dashed border-crib-border/80">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-zinc-800 text-crib-cream">
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <CardTitle>{title}</CardTitle>
              <CardDescription>Scheduled for subsequent phase</CardDescription>
            </div>
          </div>
          <Badge variant="warning" size="sm">
            {phase}
          </Badge>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-crib-warm-gray leading-relaxed mb-4">
            {description}
          </p>
          <div className="rounded-lg bg-crib-ink p-4 border border-crib-border/60 flex items-start gap-3 text-xs text-crib-warm-gray">
            <ShieldAlert className="w-4 h-4 text-crib-red shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-crib-cream">Phase Boundary Notice: </span>
              In accordance with <code className="text-amber-300">AGENTS.md</code> and <code className="text-amber-300">docs/IMPLEMENTATION-PLAN.md</code>, feature screens are not built during Phase 1. Use the Foundation Showcase to verify the layout, design tokens, responsive drawer, UI primitives, and mock services.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
