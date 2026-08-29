import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { PawPrint, Lock, Mail, User, Phone, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const RegisterPage: React.FC = () => {
  const { register, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTarget = searchParams.get('redirect') ? decodeURIComponent(searchParams.get('redirect')!) : '/dashboard';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTarget, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectTarget]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await register(name, email, password, phone);
    if (success) {
      navigate(redirectTarget, { replace: true });
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 flex items-center justify-center relative overflow-hidden bg-cream-50">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-terracotta-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-3xl sm:rounded-5xl p-6 sm:p-10 shadow-warm-xl border border-cream-300 relative z-10"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 group mb-4">
            <div className="w-12 h-12 rounded-2xl bg-terracotta-500 text-white flex items-center justify-center shadow-warm-sm group-hover:scale-105 transition-all">
              <PawPrint className="w-6 h-6" />
            </div>
            <div className="text-left">
              <span className="text-2xl font-black text-chocolate-900 leading-none block">
                Paws<span className="text-terracotta-500 italic font-serif">&</span>Claws
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-chocolate-600">
                Customer Portal
              </span>
            </div>
          </Link>

          <h1 className="text-2xl sm:text-3xl font-black text-chocolate-900 tracking-tight">
            Create Pet Parent Account
          </h1>
          <p className="text-xs sm:text-sm text-chocolate-700/80 mt-1">
            Join our pet wellness community in less than a minute.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="e.g. Jessica Miller"
            value={name}
            onChange={(e) => setName(e.target.value)}
            leftIcon={<User className="w-4 h-4" />}
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="jessica@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="(555) 234-5678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            leftIcon={<Phone className="w-4 h-4" />}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
            required
          />

          <div className="pt-2">
            <Button
              type="submit"
              variant="terracotta"
              size="lg"
              isLoading={isLoading}
              className="w-full justify-center shadow-warm-md font-bold text-sm"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Create Account & Go to Dashboard
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center text-xs text-chocolate-600">
          Already have an account?{' '}
          <Link
            to={`/login${searchParams.get('redirect') ? `?redirect=${encodeURIComponent(searchParams.get('redirect')!)}` : ''}`}
            className="font-bold text-terracotta-600 hover:underline"
          >
            Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
