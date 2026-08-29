import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { PawIllustration, SparkleIllustration } from './PetIllustrations';

export type EmptyStateType = 'no-pets' | 'no-appointments' | 'no-notifications' | 'no-ai' | 'no-search';

export interface EmptyStateProps {
  type: EmptyStateType;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  actionIcon?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  title,
  description,
  actionText,
  onAction,
  actionIcon,
  className = '',
}) => {
  const renderIllustration = () => {
    switch (type) {
      case 'no-pets':
        return (
          <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            {/* Pet Bed */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-cream-300 fill-current">
              <ellipse cx="50" cy="70" rx="42" ry="18" fill="#EFE6DD" />
              <ellipse cx="50" cy="65" rx="36" ry="14" fill="#D9CCC5" />
              <ellipse cx="50" cy="60" rx="28" ry="10" fill="#FAF6F0" />
            </svg>
            {/* Floating Paw */}
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, 4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-2"
            >
              <PawIllustration size={38} color="#D97746" />
            </motion.div>
            {/* Tiny Heart */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute -top-1 right-2 text-terracotta-400"
            >
              <SparkleIllustration size={16} color="#E8963D" />
            </motion.div>
          </div>
        );

      case 'no-appointments':
        return (
          <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            {/* Calendar SVG */}
            <svg viewBox="0 0 80 80" className="w-20 h-20 fill-none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="18" width="60" height="52" rx="14" fill="#FAF6F0" stroke="#BDABA1" strokeWidth="3" />
              <path d="M10 32H70" stroke="#D97746" strokeWidth="4" strokeLinecap="round" />
              <rect x="22" y="8" width="6" height="14" rx="3" fill="#D97746" />
              <rect x="52" y="8" width="6" height="14" rx="3" fill="#D97746" />
              {/* Grid dots */}
              <circle cx="26" cy="44" r="3" fill="#D9CCC5" />
              <circle cx="40" cy="44" r="3" fill="#D9CCC5" />
              <circle cx="54" cy="44" r="3" fill="#D9CCC5" />
              <circle cx="26" cy="56" r="3" fill="#D9CCC5" />
              <circle cx="40" cy="56" r="3" fill="#D97746" />
              <circle cx="54" cy="56" r="3" fill="#D9CCC5" />
            </svg>
            {/* Floating Paw */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-2 right-1"
            >
              <PawIllustration size={22} color="#D97746" />
            </motion.div>
          </div>
        );

      case 'no-notifications':
        return (
          <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            {/* Sleeping Cat/Dog outline */}
            <svg viewBox="0 0 100 100" className="w-24 h-24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="50" cy="62" rx="32" ry="22" fill="#FAF6F0" stroke="#BDABA1" strokeWidth="3" />
              <circle cx="68" cy="50" r="14" fill="#FAF6F0" stroke="#BDABA1" strokeWidth="3" />
              {/* Sleeping eye arc */}
              <path d="M64 50C66 52 70 52 72 50" stroke="#755F53" strokeWidth="2.5" strokeLinecap="round" />
              {/* Snout */}
              <circle cx="76" cy="51" r="2" fill="#D97746" />
              {/* Ear */}
              <path d="M60 40L68 34L72 40" stroke="#BDABA1" strokeWidth="3" strokeLinejoin="round" fill="#F5EFEB" />
              {/* Tail */}
              <path d="M22 62C18 52 24 44 32 46" stroke="#BDABA1" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
            {/* ZZZ animation */}
            <motion.div
              animate={{ y: [0, -10], opacity: [0, 1, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute top-2 right-4 font-bold text-terracotta-500 text-xs"
            >
              z Z z
            </motion.div>
          </div>
        );

      case 'no-ai':
        return (
          <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            {/* Friendly AI Assistant Bot with Paw ears */}
            <svg viewBox="0 0 100 100" className="w-24 h-24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="25" y="32" width="50" height="42" rx="16" fill="#221612" stroke="#D97746" strokeWidth="3" />
              {/* Eyes */}
              <circle cx="40" cy="50" r="4" fill="#E8963D" />
              <circle cx="60" cy="50" r="4" fill="#E8963D" />
              {/* Happy Smile */}
              <path d="M44 60C47 63 53 63 56 60" stroke="#FAF6F0" strokeWidth="2.5" strokeLinecap="round" />
              {/* Antennas / Paw ears */}
              <circle cx="28" cy="24" r="7" fill="#D97746" />
              <circle cx="72" cy="24" r="7" fill="#D97746" />
            </svg>
            <motion.div
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-1 right-2"
            >
              <SparkleIllustration size={18} color="#E8963D" />
            </motion.div>
          </div>
        );

      case 'no-search':
      default:
        return (
          <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            <svg viewBox="0 0 80 80" className="w-20 h-20 fill-none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="35" cy="35" r="22" stroke="#D97746" strokeWidth="4" fill="#FAF6F0" />
              <path d="M51 51L68 68" stroke="#221612" strokeWidth="5" strokeLinecap="round" />
              {/* Paw inside lens */}
              <circle cx="35" cy="38" r="4" fill="#D9CCC5" />
              <circle cx="31" cy="30" r="2" fill="#D9CCC5" />
              <circle cx="39" cy="30" r="2" fill="#D9CCC5" />
            </svg>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-2 left-3"
            >
              <SparkleIllustration size={14} color="#D97746" />
            </motion.div>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white rounded-3xl sm:rounded-4xl p-8 sm:p-12 text-center border border-cream-300 shadow-warm-sm space-y-4 max-w-md mx-auto ${className}`}
    >
      {renderIllustration()}

      <div className="space-y-1.5">
        <h3 className="text-lg sm:text-xl font-extrabold text-chocolate-900 tracking-tight">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-chocolate-600 leading-relaxed max-w-xs mx-auto">
          {description}
        </p>
      </div>

      {actionText && onAction && (
        <div className="pt-2">
          <Button
            variant="terracotta"
            size="md"
            onClick={onAction}
            leftIcon={actionIcon}
            className="shadow-warm-sm font-bold text-xs sm:text-sm"
          >
            {actionText}
          </Button>
        </div>
      )}
    </motion.div>
  );
};
