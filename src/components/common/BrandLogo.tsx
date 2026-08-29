import React from 'react';
import { motion } from 'framer-motion';

export interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'mark' | 'full';
  showText?: boolean;
  textColor?: string;
  subtextColor?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'mark',
  showText = true,
  textColor = 'text-chocolate-900',
  subtextColor = 'text-chocolate-600',
}) => {
  const sizeMap = {
    sm: { mark: 'w-8 h-8', text: 'text-lg', sub: 'text-[9px]' },
    md: { mark: 'w-10 h-10', text: 'text-xl sm:text-2xl', sub: 'text-[10px]' },
    lg: { mark: 'w-12 h-12', text: 'text-2xl sm:text-3xl', sub: 'text-xs' },
    xl: { mark: 'w-16 h-16', text: 'text-3xl sm:text-4xl', sub: 'text-sm' },
  };

  const { mark, text, sub } = sizeMap[size] || sizeMap.md;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Pet Care AI Logo Mark */}
      <motion.div
        whileHover={{ scale: 1.06, rotate: [0, -4, 4, 0] }}
        transition={{ duration: 0.35 }}
        className={`relative ${mark} rounded-2xl overflow-hidden shadow-warm-xs shrink-0 flex items-center justify-center`}
      >
        <svg
          viewBox="0 0 256 256"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoBadgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3E3A5E" />
              <stop offset="100%" stopColor="#2C2947" />
            </linearGradient>
          </defs>
          <rect width="256" height="256" fill="#FBF6EF" rx="40" />
          <g transform="translate(128,135) scale(0.92)">
            <circle cx="0" cy="0" r="115" fill="url(#logoBadgeGrad)" />
            <path
              d="M -55 -78 C -78 -110, -78 -140, -50 -132 C -30 -126, -28 -96, -30 -70 Z"
              fill="#4FD1A5"
            />
            <path
              d="M 55 -78 C 78 -110, 78 -140, 50 -132 C 30 -126, 28 -96, 30 -70 Z"
              fill="#4FD1A5"
            />
            <path
              d="M -70 8 L -38 8 L -24 -22 L -6 34 L 8 8 L 24 8 L 38 -14 L 52 8 L 70 8"
              fill="none"
              stroke="#FBF6EF"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g transform="translate(70,8)">
              <circle r="15" fill="#4FD1A5" />
              <path
                d="M 0 -8 L 2.5 -2 L 8 0 L 2.5 2 L 0 8 L -2.5 2 L -8 0 L -2.5 -2 Z"
                fill="#2C2947"
              />
            </g>
          </g>
        </svg>
      </motion.div>

      {showText && (
        <div className="flex flex-col">
          <span className={`${text} font-black tracking-tight ${textColor} leading-none`}>
            Paws<span className="text-terracotta-500 italic font-serif">&</span>Claws
          </span>
          <span className={`${sub} font-bold uppercase tracking-widest ${subtextColor} mt-0.5`}>
            Pet Care & AI Wellness
          </span>
        </div>
      )}
    </div>
  );
};
