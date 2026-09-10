import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { useToast } from '../../context/ToastContext';
import { ArrowRight, Coffee, Shield, Zap, Send } from 'lucide-react';

export function CtaSection({ onExploreMenu }) {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast({
        type: 'error',
        title: 'Invalid Email',
        message: 'Please enter a valid email address to join the drop list.',
      });
      return;
    }

    setSubmitted(true);
    showToast({
      type: 'success',
      title: 'Joined The Society List',
      message: 'You will receive private notifications on limited single-origin drops.',
    });
    setEmail('');
  };

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-b from-crib-ink via-crib-charcoal to-crib-ink">
      {/* Red ambient halo in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-crib-red/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        <div className="space-y-3">
          <span className="inline-block px-3 py-1 rounded-full bg-crib-red/20 border border-crib-red/40 text-crib-red text-xs font-mono font-bold tracking-widest uppercase">
            [ CALL TO ACTION // SOCIETY PASS ]
          </span>
          <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-crib-cream uppercase tracking-tight leading-[0.95]">
            READY TO TASTE THE <br />
            <span className="text-crib-red">REVOLUTION?</span>
          </h2>
          <p className="text-base sm:text-lg text-crib-warm-gray max-w-xl mx-auto font-sans">
            Drop by our Senopati bar or explore our signature roasted beans. No compromises, no weak roasts.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            variant="primary"
            size="lg"
            onClick={onExploreMenu}
            rightIcon={ArrowRight}
            className="uppercase tracking-wider font-semibold shadow-xl shadow-crib-red/30"
          >
            Order / Explore Menu
          </Button>

          <Link
            to="/staff/pos"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-crib-border bg-crib-charcoal/80 hover:bg-zinc-800 text-crib-cream hover:text-white text-sm font-semibold uppercase tracking-wider transition-colors"
          >
            <Zap className="w-4 h-4 text-crib-red" />
            Switch to Staff POS
          </Link>
        </div>

        {/* Society Newsletter / Micro Drop Subscription */}
        <div className="pt-8 border-t border-crib-border/50 max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email for roast drops..."
              className="flex-1 px-4 py-2.5 rounded-lg bg-crib-ink border border-crib-border text-xs text-crib-cream placeholder:text-crib-warm-gray focus:outline-none focus:border-crib-red transition-colors"
            />
            <Button
              type="submit"
              variant="secondary"
              size="sm"
              rightIcon={Send}
              className="font-mono uppercase text-xs shrink-0"
            >
              Subscribe
            </Button>
          </form>
          <div className="text-[11px] font-mono text-crib-warm-gray mt-2">
            *No spam. Only single-origin release announcements and cupping invitations.
          </div>
        </div>
      </div>
    </section>
  );
}
