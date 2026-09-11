import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Coffee, Lock, Mail, ArrowRight, Sparkles, UserCheck, Shield, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      showToast('Please enter both email and password.', 'warning');
      return;
    }

    try {
      const response = await login({ email: email.trim(), password });
      showToast(`Welcome back, ${response.user.name}!`, 'success');

      if (response.user.role === 'staff') {
        navigate('/staff');
      } else if (response.user.role === 'owner') {
        navigate('/owner');
      } else {
        navigate('/');
      }
    } catch (err) {
      showToast(err.message || 'Login failed. Please check credentials.', 'danger');
    }
  };

  // Quick 1-click test credentials
  const fillQuickDemo = (demoEmail, demoPass = 'password123') => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 relative overflow-hidden bg-crib-ink">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-crib-red/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-80 h-80 bg-red-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand Card Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-2 group">
            <div className="w-10 h-10 rounded-xl bg-crib-red flex items-center justify-center text-white shadow-lg shadow-red-950/50 group-hover:scale-105 transition-transform">
              <Coffee className="w-5 h-5" />
            </div>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-crib-cream tracking-tight uppercase">
            Sign In to Society
          </h1>
          <p className="text-xs text-crib-warm-gray max-w-xs mx-auto">
            Access your orders, staff operations, or executive owner management console.
          </p>
        </div>

        {/* Quick Demo Credentials Pill Bar */}
        <div className="p-3 rounded-xl bg-crib-charcoal/80 border border-crib-border space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-crib-warm-gray block text-center font-semibold">
            ⚡ Quick 1-Click Demo Logins
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => fillQuickDemo('sarah@cribsociety.com')}
              className="px-2.5 py-1.5 rounded-lg bg-crib-ink border border-crib-border hover:border-crib-red/60 text-left transition-colors"
            >
              <div className="text-[11px] font-bold text-crib-cream flex items-center gap-1">
                <UserCheck className="w-3 h-3 text-crib-red" /> Staff Portal
              </div>
              <div className="text-[10px] text-crib-warm-gray truncate">sarah@cribsociety.com</div>
            </button>

            <button
              type="button"
              onClick={() => fillQuickDemo('owner@cribsociety.com')}
              className="px-2.5 py-1.5 rounded-lg bg-crib-ink border border-crib-border hover:border-amber-500/60 text-left transition-colors"
            >
              <div className="text-[11px] font-bold text-crib-cream flex items-center gap-1">
                <Shield className="w-3 h-3 text-amber-400" /> Owner Console
              </div>
              <div className="text-[10px] text-crib-warm-gray truncate">owner@cribsociety.com</div>
            </button>
          </div>
        </div>

        {/* Main Form Box */}
        <div className="p-6 rounded-2xl bg-crib-charcoal border border-crib-border shadow-elevated">
          <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="name@cribsociety.com"
                  className="w-full bg-crib-ink border border-crib-border rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-crib-cream placeholder:text-crib-warm-gray/50 focus:outline-none focus:border-crib-red transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-crib-warm-gray mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-crib-warm-gray absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-crib-ink border border-crib-border rounded-xl pl-10 pr-10 py-2.5 text-sm text-crib-cream placeholder:text-crib-warm-gray/50 focus:outline-none focus:border-crib-red transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-crib-warm-gray hover:text-crib-cream transition-colors focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
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
              Sign In
            </Button>
          </form>

          {/* Switch to Register */}
          <div className="mt-5 pt-4 border-t border-crib-border/60 text-center text-xs text-crib-warm-gray">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-bold text-crib-red hover:underline">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
