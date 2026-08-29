import React from 'react';
import { motion } from 'framer-motion';
import { PawIllustration, SparkleIllustration } from './PetIllustrations';

export interface LoadingPawProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'paws' | 'ai';
  className?: string;
}

export const LoadingPaw: React.FC<LoadingPawProps> = ({
  text = 'Loading wellness data...',
  size = 'md',
  variant = 'paws',
  className = '',
}) => {
  const pawSize = size === 'sm' ? 14 : size === 'lg' ? 24 : 18;

  if (variant === 'ai') {
    return (
      <div className={`flex flex-col items-center justify-center gap-3 p-6 ${className}`}>
        <div className="relative">
          <motion.div
            animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-12 h-12 rounded-2xl bg-terracotta-500 text-white flex items-center justify-center shadow-warm-md"
          >
            <PawIllustration size={24} color="#FFFFFF" />
          </motion.div>
          <motion.div
            animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute -top-2 -right-2 text-caramel-400"
          >
            <SparkleIllustration size={16} color="#F1B267" />
          </motion.div>
        </div>
        {text && <p className="text-xs font-semibold text-chocolate-700 animate-pulse">{text}</p>}
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center gap-3.5 p-6 ${className}`}>
      {/* 3 Walking Paws Animation */}
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -8, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.85, 1.1, 0.85],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.25,
              ease: 'easeInOut',
            }}
          >
            <PawIllustration size={pawSize} color="#D97746" />
          </motion.div>
        ))}
      </div>
      {text && <p className="text-xs font-bold text-chocolate-700 tracking-wide">{text}</p>}
    </div>
  );
};
