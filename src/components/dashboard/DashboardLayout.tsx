import React, { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePetCare } from '../../context/PetCareContext';
import { NotificationDropdown } from './NotificationDropdown';
import { Button } from '../common/Button';
import { BrandLogo } from '../common/BrandLogo';
import { PawIllustration, SparkleIllustration } from '../common/PetIllustrations';
import {
  PawPrint,
  LayoutDashboard,
  Dog,
  CalendarPlus,
  CalendarDays,
  Bot,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  Plus,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const { pets } = usePetCare();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => {
    setMobileDrawerOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: 'Overview', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, end: true },
    { label: 'My Pets', path: '/dashboard/pets', icon: <Dog className="w-5 h-5" /> },
    { label: 'Book Care', path: '/dashboard/book', icon: <CalendarPlus className="w-5 h-5" /> },
    { label: 'Appointments', path: '/dashboard/appointments', icon: <CalendarDays className="w-5 h-5" /> },
    { label: 'AI Assistant', path: '/dashboard/assistant', icon: <Bot className="w-5 h-5" /> },
    { label: 'Profile', path: '/dashboard/profile', icon: <User className="w-5 h-5" /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col md:flex-row text-chocolate-900 selection:bg-terracotta-200">
      {/* ========================================================================= */}
      {/* DESKTOP SIDEBAR */}
      {/* ========================================================================= */}
      <aside className="hidden md:flex flex-col justify-between w-60 lg:w-72 bg-cream-100/90 border-r border-cream-300 p-5 lg:p-6 sticky top-0 h-screen z-30 shrink-0">
        <div>
          {/* Brand Logo with pet-care-ai-logo-v2 */}
          <Link to="/dashboard" className="flex items-center group mb-8" data-cursor="hover">
            <BrandLogo size="md" subtextColor="text-chocolate-600" />
          </Link>

          {/* Navigation Links with animated active pill */}
          <nav className="space-y-1.5 relative">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `relative flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-colors z-10 ${
                    isActive
                      ? 'text-white'
                      : 'text-chocolate-800 hover:bg-cream-200/80 hover:text-terracotta-600'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="activeDashboardSidebar"
                        className="absolute inset-0 bg-chocolate-900 rounded-2xl shadow-warm-xs -z-10"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="shrink-0">{item.icon}</span>
                    <span className="flex-1">{item.label}</span>
                    {item.label === 'Book Care' && !isActive && (
                      <span className="w-2 h-2 rounded-full bg-terracotta-500 animate-pulse" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Sidebar: Settings, Back to Website, User Profile Card */}
        <div className="space-y-3 lg:space-y-4 pt-4 border-t border-cream-300">
          <div className="space-y-1">
            <NavLink
              to="/dashboard/settings"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-chocolate-900 text-white'
                    : 'text-chocolate-700 hover:bg-cream-200/80'
                }`
              }
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </NavLink>

            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-semibold text-chocolate-600 hover:bg-cream-200/80 hover:text-chocolate-900 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Public Website</span>
            </Link>
          </div>

          {/* User Profile Capsule */}
          <div className="p-3 bg-white rounded-2xl border border-cream-300 shadow-warm-xs flex items-center justify-between hover:border-terracotta-300 transition-colors">
            <Link to="/dashboard/profile" className="flex items-center gap-2.5 min-w-0 flex-1 hover:opacity-80 transition-opacity">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-9 h-9 rounded-full object-cover border border-cream-200 shrink-0"
              />
              <div className="min-w-0">
                <span className="text-xs font-bold text-chocolate-900 truncate block">
                  {user?.name}
                </span>
                <span className="text-[10px] text-chocolate-500 truncate block">
                  {pets.length} {pets.length === 1 ? 'Pet' : 'Pets'} Registered
                </span>
              </div>
            </Link>

            <button
              onClick={handleLogout}
              className="p-1.5 rounded-xl text-chocolate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0 ml-1"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MAIN CONTENT AREA & TOP HEADER */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen pb-20 md:pb-8">
        {/* Top Navigation Bar */}
        <header className="bg-cream-50/90 backdrop-blur-md sticky top-0 z-20 px-3.5 sm:px-8 py-3 sm:py-3.5 border-b border-cream-300/80 flex items-center justify-between">
          {/* Left: Mobile Drawer Trigger & Breadcrumbs */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              className="md:hidden p-2 rounded-2xl bg-white border border-cream-300 text-chocolate-900 hover:bg-cream-100 transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Mobile Brand Mark */}
            <Link to="/dashboard" className="flex items-center md:hidden">
              <BrandLogo size="sm" showText={true} />
            </Link>

            {/* Breadcrumb info (Desktop) */}
            <div className="hidden md:flex items-center gap-1.5 text-xs text-chocolate-600 font-semibold">
              <span>Portal</span>
              <ChevronRight className="w-3.5 h-3.5 text-chocolate-400" />
              <span className="text-chocolate-900 font-bold capitalize">
                {location.pathname.replace('/dashboard', '').replace('/', '') || 'Overview'}
              </span>
            </div>
          </div>

          {/* Right: Quick CTA, Notifications, Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/dashboard/book">
              <Button
                variant="terracotta"
                size="sm"
                leftIcon={<CalendarPlus className="w-3.5 h-3.5" />}
                className="shadow-warm-xs text-xs font-bold hidden sm:inline-flex py-2 px-3.5 hover:scale-103 transition-transform"
                data-cursor="book"
                data-cursor-text="Book"
              >
                Book Care
              </Button>
            </Link>

            {/* Notification Center */}
            <NotificationDropdown />

            {/* User Avatar Direct Link */}
            <Link
              to="/dashboard/profile"
              className="flex items-center gap-2 p-0.5 sm:p-1 rounded-full bg-white border border-cream-300 hover:border-terracotta-400 transition-colors shadow-warm-xs shrink-0"
            >
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
              />
            </Link>
          </div>
        </header>

        {/* Mobile Slide-Out Drawer & Backdrop */}
        <AnimatePresence>
          {mobileDrawerOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileDrawerOpen(false)}
                className="fixed inset-0 bg-chocolate-950/60 backdrop-blur-sm z-30 md:hidden"
              />

              {/* Drawer */}
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="md:hidden fixed inset-x-4 top-16 z-40 bg-cream-50 rounded-3xl p-5 shadow-warm-xl border border-cream-300 space-y-3 max-h-[85vh] overflow-y-auto relative overflow-hidden"
              >
                <div className="absolute -right-6 -bottom-6 opacity-5 pointer-events-none text-chocolate-900">
                  <PawIllustration size={100} />
                </div>

                <div className="flex items-center gap-3 pb-3 border-b border-cream-200">
                  <img src={user?.avatar} alt={user?.name} className="w-10 h-10 rounded-full object-cover border border-cream-300" />
                  <div>
                    <span className="text-sm font-bold text-chocolate-900 block">{user?.name}</span>
                    <span className="text-xs text-chocolate-500">{user?.email}</span>
                  </div>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.label}
                      to={item.path}
                      end={item.end}
                      onClick={() => setMobileDrawerOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                          isActive
                            ? 'bg-chocolate-900 text-white shadow-warm-xs'
                            : 'text-chocolate-800 hover:bg-cream-200'
                        }`
                      }
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                  <NavLink
                    to="/dashboard/settings"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-bold text-chocolate-800 hover:bg-cream-200"
                  >
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                  </NavLink>
                </nav>

                <div className="pt-3 border-t border-cream-200 flex items-center justify-between">
                  <Link
                    to="/"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="text-xs font-bold text-chocolate-700 hover:text-terracotta-600 flex items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Public Website</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-xs font-bold text-rose-600 flex items-center gap-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Dynamic Nested Content */}
        <main className="flex-1 p-3.5 sm:p-6 lg:p-10 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

        {/* ========================================================================= */}
        {/* MOBILE BOTTOM NAVIGATION BAR */}
        {/* ========================================================================= */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-cream-300 py-1.5 px-3 z-30 flex items-center justify-around shadow-warm-lg">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 p-1 rounded-xl transition-colors ${
                isActive ? 'text-terracotta-600 font-bold' : 'text-chocolate-600 font-medium'
              }`
            }
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="text-[10px]">Home</span>
          </NavLink>

          <NavLink
            to="/dashboard/pets"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 p-1 rounded-xl transition-colors ${
                isActive ? 'text-terracotta-600 font-bold' : 'text-chocolate-600 font-medium'
              }`
            }
          >
            <Dog className="w-4 h-4" />
            <span className="text-[10px]">Pets</span>
          </NavLink>

          {/* Elevated Center Book Button with pulse & scale */}
          <NavLink
            to="/dashboard/book"
            className="flex flex-col items-center -mt-4"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 rounded-full bg-terracotta-500 text-white flex items-center justify-center shadow-warm-md"
            >
              <Plus className="w-6 h-6" />
            </motion.div>
            <span className="text-[10px] font-bold text-terracotta-700 mt-0.5">Book</span>
          </NavLink>

          <NavLink
            to="/dashboard/appointments"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 p-1 rounded-xl transition-colors ${
                isActive ? 'text-terracotta-600 font-bold' : 'text-chocolate-600 font-medium'
              }`
            }
          >
            <CalendarDays className="w-4 h-4" />
            <span className="text-[10px]">Visits</span>
          </NavLink>

          <NavLink
            to="/dashboard/assistant"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 p-1 rounded-xl transition-colors ${
                isActive ? 'text-terracotta-600 font-bold' : 'text-chocolate-600 font-medium'
              }`
            }
          >
            <Bot className="w-4 h-4" />
            <span className="text-[10px]">AI Chat</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
};
