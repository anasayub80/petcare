import React from 'react';
import { motion, HTMLMotionProps, type Variants } from 'framer-motion';

// Common motion variants for decorative illustrations
export const floatVariant: Variants = {
  animate: {
    y: [0, -8, 0],
    rotate: [0, 2, 0],
    transition: {
      duration: 4.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const floatSlowVariant: Variants = {
  animate: {
    y: [0, -12, 0],
    rotate: [0, -3, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const driftVariant: Variants = {
  animate: {
    x: [0, 6, 0],
    y: [0, -6, 0],
    rotate: [0, 4, -2, 0],
    transition: {
      duration: 7,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const pulseScaleVariant: Variants = {
  animate: {
    scale: [1, 1.08, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

interface IllustrationProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  className?: string;
  size?: number | string;
  variant?: 'float' | 'floatSlow' | 'drift' | 'pulse' | 'none';
  color?: string;
}

const getVariant = (variant: IllustrationProps['variant']) => {
  switch (variant) {
    case 'float':
      return floatVariant;
    case 'floatSlow':
      return floatSlowVariant;
    case 'drift':
      return driftVariant;
    case 'pulse':
      return pulseScaleVariant;
    default:
      return undefined;
  }
};

/** Handcrafted Paw Print SVG */
export const PawIllustration: React.FC<IllustrationProps> = ({
  className = '',
  size = 24,
  variant = 'none',
  color = 'currentColor',
  ...props
}) => {
  const v = getVariant(variant);
  return (
    <motion.div
      variants={v}
      animate={v ? 'animate' : undefined}
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main pad */}
        <path
          d="M24 22C17.5 22 13 27 13 33.5C13 39 17.5 43 24 43C30.5 43 35 39 35 33.5C35 27 30.5 22 24 22Z"
          fill={color}
        />
        {/* Top-left toe */}
        <ellipse cx="12.5" cy="17" rx="4.5" ry="6.5" transform="rotate(-20 12.5 17)" fill={color} />
        {/* Top-mid-left toe */}
        <ellipse cx="20" cy="11.5" rx="4.5" ry="7" transform="rotate(-6 20 11.5)" fill={color} />
        {/* Top-mid-right toe */}
        <ellipse cx="28" cy="11.5" rx="4.5" ry="7" transform="rotate(6 28 11.5)" fill={color} />
        {/* Top-right toe */}
        <ellipse cx="35.5" cy="17" rx="4.5" ry="6.5" transform="rotate(20 35.5 17)" fill={color} />
      </svg>
    </motion.div>
  );
};

/** Handcrafted Dog Bone SVG */
export const BoneIllustration: React.FC<IllustrationProps> = ({
  className = '',
  size = 28,
  variant = 'none',
  color = 'currentColor',
  ...props
}) => {
  const v = getVariant(variant);
  return (
    <motion.div
      variants={v}
      animate={v ? 'animate' : undefined}
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      {...props}
    >
      <svg
        width={size}
        height={typeof size === 'number' ? size * 0.55 : size}
        viewBox="0 0 64 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 9C13 5.134 9.866 2 6 2C2.134 2 -1 5.134 -1 9C-1 11.758 0.589 14.148 2.875 15.25C0.589 16.352 -1 18.742 -1 21.5C-1 25.366 2.134 28.5 6 28.5C9.866 28.5 13 25.366 13 21.5C13 20.81 12.901 20.142 12.716 19.51L51.284 19.51C51.099 20.142 51 20.81 51 21.5C51 25.366 54.134 28.5 58 28.5C61.866 28.5 65 25.366 65 21.5C65 18.742 63.411 16.352 61.125 15.25C63.411 14.148 65 11.758 65 9C65 5.134 61.866 2 58 2C54.134 2 51 5.134 51 9C51 9.69 51.099 10.358 51.284 10.99L12.716 10.99C12.901 10.358 13 9.69 13 9Z"
          fill={color}
          transform="translate(1, 2)"
        />
      </svg>
    </motion.div>
  );
};

/** Handcrafted Pet Food Bowl SVG */
export const BowlIllustration: React.FC<IllustrationProps> = ({
  className = '',
  size = 32,
  variant = 'none',
  color = 'currentColor',
  ...props
}) => {
  const v = getVariant(variant);
  return (
    <motion.div
      variants={v}
      animate={v ? 'animate' : undefined}
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 22C6 32 13 40 24 40C35 40 42 32 42 22H6Z"
          fill={color}
        />
        <ellipse cx="24" cy="22" rx="18" ry="6" fill={color} opacity="0.85" />
        <ellipse cx="24" cy="21" rx="15" ry="4.5" fill="#FAF6F0" opacity="0.4" />
        {/* Little paw print mark on bowl side */}
        <circle cx="24" cy="30" r="2.5" fill="#FAF6F0" opacity="0.9" />
        <circle cx="21" cy="27" r="1.2" fill="#FAF6F0" opacity="0.9" />
        <circle cx="27" cy="27" r="1.2" fill="#FAF6F0" opacity="0.9" />
      </svg>
    </motion.div>
  );
};

/** Handcrafted Floating Sparkle / Star SVG */
export const SparkleIllustration: React.FC<IllustrationProps> = ({
  className = '',
  size = 20,
  variant = 'none',
  color = 'currentColor',
  ...props
}) => {
  const v = getVariant(variant);
  return (
    <motion.div
      variants={v}
      animate={v ? 'animate' : undefined}
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 0C16 8.836 8.836 16 0 16C8.836 16 16 23.164 16 32C16 23.164 23.164 16 32 16C23.164 16 16 8.836 16 0Z"
          fill={color}
        />
      </svg>
    </motion.div>
  );
};

/** Handcrafted Grooming Shears / Scissors SVG */
export const GroomingScissorsIllustration: React.FC<IllustrationProps> = ({
  className = '',
  size = 24,
  variant = 'none',
  color = 'currentColor',
  ...props
}) => {
  const v = getVariant(variant);
  return (
    <motion.div
      variants={v}
      animate={v ? 'animate' : undefined}
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Handles */}
        <circle cx="12" cy="38" r="6" stroke={color} strokeWidth="3" fill="none" />
        <circle cx="36" cy="38" r="6" stroke={color} strokeWidth="3" fill="none" />
        {/* Crossing Blades */}
        <path
          d="M16 34L32 12C33 10 34 6 34 4C32 4 28 5 26 6L18 26"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32 34L16 12C15 10 14 6 14 4C16 4 20 5 22 6L30 26"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Pivot screw */}
        <circle cx="24" cy="23" r="2.5" fill={color} />
      </svg>
    </motion.div>
  );
};

/** Handcrafted Veterinary Cross with Paw Center SVG */
export const VetCrossIllustration: React.FC<IllustrationProps> = ({
  className = '',
  size = 28,
  variant = 'none',
  color = 'currentColor',
  ...props
}) => {
  const v = getVariant(variant);
  return (
    <motion.div
      variants={v}
      animate={v ? 'animate' : undefined}
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Rounded medical cross */}
        <path
          d="M18 4C18 2.89543 18.8954 2 20 2H28C29.1046 2 30 2.89543 30 4V18H44C45.1046 18 46 18.8954 46 20V28C46 29.1046 45.1046 30 44 30H30V44C30 45.1046 29.1046 46 28 46H20C18.8954 46 18 45.1046 18 44V30H4C2.89543 30 2 29.1046 2 28V20C2 18.8954 2.89543 18 4 18H18V4Z"
          fill={color}
        />
        {/* Tiny cutout paw in center */}
        <circle cx="24" cy="25" r="3.2" fill="#FAF6F0" />
        <circle cx="21.5" cy="20.5" r="1.3" fill="#FAF6F0" />
        <circle cx="26.5" cy="20.5" r="1.3" fill="#FAF6F0" />
        <circle cx="19.5" cy="22.8" r="1.1" fill="#FAF6F0" />
        <circle cx="28.5" cy="22.8" r="1.1" fill="#FAF6F0" />
      </svg>
    </motion.div>
  );
};

/** Handcrafted Vaccine / Syringe Icon SVG */
export const VaccineSyringeIllustration: React.FC<IllustrationProps> = ({
  className = '',
  size = 26,
  variant = 'none',
  color = 'currentColor',
  ...props
}) => {
  const v = getVariant(variant);
  return (
    <motion.div
      variants={v}
      animate={v ? 'animate' : undefined}
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M34 10L38 14M28 6L42 20M30 18L18 30M24 12L12 24M28 20L16 32L10 32L8 40L16 38L16 32"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Plunger & Needle */}
        <path
          d="M37 11L43 5M8 40L4 44"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
};

/** Handcrafted Playful Yarn Ball / Cat Toy SVG */
export const CatYarnIllustration: React.FC<IllustrationProps> = ({
  className = '',
  size = 32,
  variant = 'none',
  color = 'currentColor',
  ...props
}) => {
  const v = getVariant(variant);
  return (
    <motion.div
      variants={v}
      animate={v ? 'animate' : undefined}
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="24" cy="24" r="16" fill={color} />
        {/* Yarn threads */}
        <path
          d="M12 20C16 16 28 14 36 22M10 28C18 34 30 32 38 24M16 12C24 18 26 30 22 38"
          stroke="#FAF6F0"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.8"
        />
        {/* Loose thread trail */}
        <path
          d="M36 32C40 36 44 38 46 36C47 34 44 30 42 28"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
};

/** Dotted Paw Print Trail */
export const PawPrintsTrail: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#D97746',
}) => {
  return (
    <div className={`flex items-center gap-6 opacity-30 select-none pointer-events-none ${className}`}>
      <PawIllustration size={16} color={color} className="rotate-[-25deg]" />
      <PawIllustration size={16} color={color} className="rotate-[15deg] translate-y-2" />
      <PawIllustration size={16} color={color} className="rotate-[-10deg]" />
      <PawIllustration size={16} color={color} className="rotate-[20deg] translate-y-2" />
    </div>
  );
};
