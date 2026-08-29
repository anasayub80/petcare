import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { BrandLogo } from '../../components/common/BrandLogo';
import { PawPrint, Lock, Mail, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const LoginPage: React.FC = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTarget = searchParams.get('redirect') ? decodeURIComponent(searchParams.get('redirect')!) : '/dashboard';

  const [email, setEmail] = useState('sarah.jenkins@example.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);

  // If already authenticated, redirect to /dashboard or redirect target
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTarget, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectTarget]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password, redirectTarget);
    if (success) {
      navigate(redirectTarget, { replace: true });
    }
  };

  const handleQuickDemoLogin = async () => {
    const success = await login('sarah.jenkins@example.com', 'password123', redirectTarget);
    if (success) {
      navigate(redirectTarget, { replace: true });
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 flex items-center justify-center relative overflow-hidden bg-cream-50">
      {/* Decorative gradient blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-terracotta-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-sage-100/50 rounded-full blur-3xl -z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-3xl sm:rounded-5xl p-6 sm:p-10 shadow-warm-xl border border-cream-300 relative z-10"
      >
        {/* Brand Header */}
        <div className="text-center mb-8 flex flex-col items-center">
          <Link to="/" className="inline-flex items-center group mb-4">
            <BrandLogo size="lg" />
          </Link>

          <h1 className="text-2xl sm:text-3xl font-black text-chocolate-900 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-xs sm:text-sm text-chocolate-700/80 mt-1">
            Access your pet’s digital passport, appointments, and AI care assistant.
          </p>

          {redirectTarget.includes('book') && (
            <div className="mt-3">
              <Badge variant="terracotta" size="sm" withPaw>
                Sign in to continue booking your appointment
              </Badge>
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="parent@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
            required
          />

          <div className="flex items-center justify-between text-xs text-chocolate-700 pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded text-terracotta-500 focus:ring-terracotta-400"
              />
              <span>Remember me</span>
            </label>
            <a href="#forgot" className="text-terracotta-600 font-semibold hover:underline">
              Forgot password?
            </a>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="terracotta"
              size="lg"
              isLoading={isLoading}
              className="w-full justify-center shadow-warm-md font-bold text-sm"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In to Dashboard
            </Button>
          </div>
        </form>

        {/* Quick Demo Login Pill */}
        <div className="mt-6 pt-6 border-t border-cream-200">
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full p-3 rounded-2xl bg-cream-100 hover:bg-cream-200/80 border border-cream-300 transition-all flex items-center justify-between text-left text-xs text-chocolate-900 group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-bold block">One-Click Demo Login</span>
                <span className="text-[11px] text-chocolate-600">Sarah Jenkins (2 pets: Milo & Luna)</span>
              </div>
            </div>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Footer link to Register */}
        <div className="mt-6 text-center text-xs text-chocolate-600">
          Don't have a pet parent account yet?{' '}
          <Link
            to={`/register${searchParams.get('redirect') ? `?redirect=${encodeURIComponent(searchParams.get('redirect')!)}` : ''}`}
            className="font-bold text-terracotta-600 hover:underline"
          >
            Create Account
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
