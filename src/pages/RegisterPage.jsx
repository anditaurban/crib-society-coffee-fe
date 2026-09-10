import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Coffee, Lock, Mail, User, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export function RegisterPage() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password) {
      showToast('Please fill in all fields.', 'warning');
      return;
    }

    try {
      await register({ name: name.trim(), email: email.trim(), password });
      showToast(`Welcome to Crib Society, ${name.trim()}!`, 'success');
      navigate('/');
    } catch (err) {
      showToast(err.message || 'Registration failed.', 'danger');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 relative overflow-hidden bg-crib-ink">
      {/* Ambient glow */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-crib-red/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-red-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-2 group">
            <div className="w-10 h-10 rounded-xl bg-crib-red flex items-center justify-center text-white shadow-lg shadow-red-950/50 group-hover:scale-105 transition-transform">
              <Coffee className="w-5 h-5" />
            </div>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-crib-cream tracking-tight uppercase">
            Join the Society
          </h1>
          <p className="text-xs text-crib-warm-gray max-w-xs mx-auto">
            Become a member to earn roast drops, save order preferences, and access exclusive cupping sessions.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-crib-charcoal border border-crib-border shadow-elevated">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-crib-warm-gray mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-crib-warm-gray absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Raditya Pratama"
                  className="w-full bg-crib-ink border border-crib-border rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-crib-cream placeholder:text-crib-warm-gray/50 focus:outline-none focus:border-crib-red transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-crib-warm-gray mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-crib-warm-gray absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="raditya@example.com"
                  className="w-full bg-crib-ink border border-crib-border rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-crib-cream placeholder:text-crib-warm-gray/50 focus:outline-none focus:border-crib-red transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-crib-warm-gray mb-1.5">
                Create Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-crib-warm-gray absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-crib-ink border border-crib-border rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-crib-cream placeholder:text-crib-warm-gray/50 focus:outline-none focus:border-crib-red transition-colors"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
              rightIcon={ArrowRight}
              className="mt-2 font-bold uppercase tracking-wider shadow-lg shadow-red-950/50"
            >
              Create Account
            </Button>
          </form>

          <div className="mt-5 pt-4 border-t border-crib-border/60 text-center text-xs text-crib-warm-gray">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-crib-red hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
