import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PawPrint, Menu, X, Calendar, Sparkles, UserCheck, LayoutDashboard } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { BrandLogo } from '../common/BrandLogo';
import { MagneticButton } from '../common/MagneticButton';
import { PawIllustration, SparkleIllustration } from '../common/PetIllustrations';
import { cn } from '../../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'About', path: '/about' },
    { label: 'How It Works', path: '/#how-it-works' },
    { label: 'AI Assistant', path: '/#ai-assistant' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleNavClick = (path: string, e: React.MouseEvent) => {
    if (path.startsWith('/#')) {
      const hash = path.substring(2);
      if (location.pathname !== '/') {
        e.preventDefault();
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        e.preventDefault();
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleBookClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard/book');
    } else {
      navigate('/login?redirect=%2Fdashboard%2Fbook');
    }
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-3 sm:px-6 lg:px-8',
          isScrolled ? 'py-2.5 sm:py-3' : 'py-3.5 sm:py-5'
        )}
      >
        <div
          className={cn(
            'max-w-7xl mx-auto rounded-full transition-all duration-300 flex items-center justify-between px-3.5 sm:px-7 py-2.5 sm:py-3',
            isScrolled
              ? 'glass-warm shadow-warm-md border border-cream-300/80'
              : 'bg-cream-50/85 backdrop-blur-md border border-cream-200/60 shadow-warm-xs'
          )}
        >
          {/* Logo with pet-care-ai-logo-v2 mark */}
          <Link
            to="/"
            className="flex items-center group shrink-0"
            data-cursor="hover"
          >
            <BrandLogo size="md" />
          </Link>

          {/* Desktop Nav Links with animated sliding pill */}
          <nav className="hidden lg:flex items-center gap-1 bg-cream-100/80 px-3 py-1.5 rounded-full border border-cream-300/60 relative">
            {navLinks.map((link) => {
              const isActive =
                link.path === location.pathname ||
                (link.path.startsWith('/#') &&
                  location.pathname === '/' &&
                  location.hash === link.path.substring(1));

              return (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={(e) => handleNavClick(link.path, e)}
                  className={cn(
                    'relative px-3.5 py-1.5 text-xs font-semibold rounded-full transition-colors duration-200 z-10',
                    isActive
                      ? 'text-cream-50'
                      : 'text-chocolate-800 hover:text-terracotta-600'
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-chocolate-900 rounded-full -z-10 shadow-warm-xs"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions with Magnetic Button */}
          <div className="hidden sm:flex items-center gap-2.5">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button
                  variant="secondary"
                  size="sm"
                  leftIcon={<LayoutDashboard className="w-3.5 h-3.5 text-terracotta-600" />}
                  className="text-xs font-bold py-2 px-3.5 hover:shadow-warm-sm"
                >
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<UserCheck className="w-3.5 h-3.5 text-chocolate-600" />}
                  className="text-xs font-bold py-2 px-3.5"
                >
                  Sign In
                </Button>
              </Link>
            )}

            <MagneticButton strength={0.3} maxDistance={6}>
              <Button
                variant="terracotta"
                size="sm"
                onClick={handleBookClick}
                leftIcon={<Calendar className="w-3.5 h-3.5" />}
                className="shadow-warm-sm hover:shadow-warm-md hover:scale-[1.03] text-xs font-bold py-2 px-4 transition-transform"
                data-cursor="book"
                data-cursor-text="Book"
              >
                Book Appointment
              </Button>
            </MagneticButton>
          </div>

          {/* Mobile hamburger & quick book button */}
          <div className="flex items-center gap-1.5 sm:hidden">
            <Button
              variant="terracotta"
              size="sm"
              onClick={handleBookClick}
              className="text-xs py-1.5 px-3 font-bold"
            >
              Book
            </Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-2xl bg-cream-200/80 text-chocolate-900 hover:bg-cream-300 transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta-400"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Animated Drawer Menu & Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-chocolate-950/60 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-x-4 top-20 z-50 lg:hidden max-h-[85vh] overflow-y-auto"
            >
              <div className="bg-cream-50 rounded-3xl p-5 sm:p-6 shadow-warm-xl border border-cream-300 space-y-4 relative overflow-hidden">
                {/* Decorative background paw watermark */}
                <div className="absolute -right-6 -bottom-6 opacity-5 pointer-events-none text-chocolate-900">
                  <PawIllustration size={120} />
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-cream-200">
                  <Badge variant="terracotta" size="sm" withPaw>
                    Paws & Claws Platform
                  </Badge>
                  <span className="text-xs text-chocolate-500 font-medium flex items-center gap-1">
                    <SparkleIllustration size={12} color="#D97746" /> 24/7 AI Assistance
                  </span>
                </div>

                <motion.div
                  initial="closed"
                  animate="open"
                  variants={{
                    open: {
                      transition: { staggerChildren: 0.05, delayChildren: 0.05 },
                    },
                    closed: {},
                  }}
                  className="flex flex-col space-y-1"
                >
                  {navLinks.map((link) => (
                    <motion.div
                      key={link.label}
                      variants={{
                        open: { opacity: 1, x: 0 },
                        closed: { opacity: 0, x: -10 },
                      }}
                    >
                      <Link
                        to={link.path}
                        onClick={(e) => {
                          handleNavClick(link.path, e);
                          setMobileMenuOpen(false);
                        }}
                        className={cn(
                          'px-4 py-3 rounded-2xl text-sm font-semibold transition-colors flex items-center justify-between',
                          location.pathname === link.path
                            ? 'bg-chocolate-900 text-cream-50 shadow-warm-xs'
                            : 'text-chocolate-900 hover:bg-cream-200/70'
                        )}
                      >
                        <span>{link.label}</span>
                        <Sparkles className="w-3.5 h-3.5 opacity-60" />
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>

                <div className="pt-3 border-t border-cream-200 flex flex-col gap-2.5">
                  <Button
                    variant="terracotta"
                    size="md"
                    className="w-full justify-center font-bold"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleBookClick();
                    }}
                    leftIcon={<Calendar className="w-4 h-4" />}
                  >
                    Book Appointment
                  </Button>

                  {isAuthenticated ? (
                    <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                      <Button
                        variant="secondary"
                        size="md"
                        className="w-full justify-center font-bold"
                        leftIcon={<LayoutDashboard className="w-4 h-4 text-terracotta-600" />}
                      >
                        Dashboard ({user?.name})
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button
                        variant="secondary"
                        size="md"
                        className="w-full justify-center font-bold"
                      >
                        Sign In / Customer Portal
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
