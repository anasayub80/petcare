import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePetCare } from '../../context/PetCareContext';
import { Bell, CheckCheck, Calendar, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const iconMap = {
  appointment: <Calendar className="w-4 h-4 text-terracotta-500" />,
  vaccine: <ShieldAlert className="w-4 h-4 text-amber-600" />,
  system: <Sparkles className="w-4 h-4 text-sage-600" />,
  reminder: <Sparkles className="w-4 h-4 text-terracotta-500" />,
};

export const NotificationDropdown: React.FC = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = usePetCare();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 sm:p-2.5 rounded-2xl bg-white border border-cream-300 text-chocolate-800 hover:text-terracotta-600 hover:bg-cream-100 transition-all shadow-warm-xs focus:outline-none focus:ring-2 focus:ring-terracotta-400"
        aria-label="Notifications"
      >
        <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-terracotta-500 text-white font-bold text-[9px] sm:text-[10px] rounded-full flex items-center justify-center border-2 border-white animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-16 sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-3 w-auto sm:w-96 bg-white rounded-3xl shadow-warm-xl border border-cream-300 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-3.5 sm:p-4 px-4 sm:px-5 bg-cream-100/80 border-b border-cream-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h4 className="text-xs sm:text-sm font-bold text-chocolate-900">Notifications</h4>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-terracotta-100 text-terracotta-700">
                    {unreadCount} New
                  </span>
                )}
              </div>

              {unreadCount > 0 && (
                <button
                  onClick={markAllNotificationsAsRead}
                  className="text-xs font-semibold text-terracotta-600 hover:underline flex items-center gap-1"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  Mark all read
                </button>
              )}
            </div>

            {/* Notification Items List */}
            <div className="max-h-72 sm:max-h-80 overflow-y-auto divide-y divide-cream-100">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-xs text-chocolate-500">
                  No notifications at the moment.
                </div>
              ) : (
                notifications.map((notif) => (
                  <Link
                    key={notif.id}
                    to={notif.link || '/dashboard'}
                    onClick={() => {
                      markNotificationAsRead(notif.id);
                      setIsOpen(false);
                    }}
                    className={`p-3.5 sm:p-4 flex items-start gap-3 hover:bg-cream-50 transition-colors text-left block ${
                      !notif.read ? 'bg-terracotta-50/40' : ''
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-cream-100 flex items-center justify-center shrink-0 border border-cream-200 mt-0.5">
                      {iconMap[notif.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className={`text-xs font-bold truncate ${!notif.read ? 'text-chocolate-950' : 'text-chocolate-800'}`}>
                          {notif.title}
                        </span>
                        <span className="text-[10px] text-chocolate-400 shrink-0">
                          {notif.createdAt}
                        </span>
                      </div>
                      <p className="text-xs text-chocolate-600 line-clamp-2 leading-relaxed">
                        {notif.message}
                      </p>
                    </div>
                  </Link>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-3 bg-cream-100/50 border-t border-cream-200 text-center">
              <Link
                to="/dashboard/appointments"
                onClick={() => setIsOpen(false)}
                className="text-xs font-bold text-chocolate-800 hover:text-terracotta-600 inline-flex items-center gap-1 transition-colors"
              >
                <span>View Full Care History</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
