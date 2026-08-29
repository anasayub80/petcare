import React from 'react';
import { cn } from '../../utils/cn';

export interface PetFrameProps {
  src: string;
  alt: string;
  shape?: 'arch' | 'arch-lg' | 'blob-1' | 'blob-2' | 'circle' | 'rounded-4xl';
  className?: string;
  imgClassName?: string;
  floatingBadge?: React.ReactNode;
  floatingBadgePosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  withBorder?: boolean;
  withBackdropGlow?: boolean;
}

export const PetFrame: React.FC<PetFrameProps> = ({
  src,
  alt,
  shape = 'arch',
  className,
  imgClassName,
  floatingBadge,
  floatingBadgePosition = 'bottom-left',
  withBorder = true,
  withBackdropGlow = true,
}) => {
  const shapeMap = {
    arch: 'rounded-t-[8rem] rounded-b-3xl',
    'arch-lg': 'rounded-t-[12rem] rounded-b-[3rem]',
    'blob-1': 'rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%]',
    'blob-2': 'rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%]',
    circle: 'rounded-full aspect-square',
    'rounded-4xl': 'rounded-4xl',
  };

  const badgePositionMap = {
    'top-left': '-top-4 -left-4',
    'top-right': '-top-4 -right-4',
    'bottom-left': '-bottom-4 -left-4 sm:-bottom-6 sm:-left-6',
    'bottom-right': '-bottom-4 -right-4 sm:-bottom-6 sm:-right-6',
  };

  return (
    <div className={cn('relative inline-block group', className)}>
      {/* Ambient background blur/glow */}
      {withBackdropGlow && (
        <div
          className={cn(
            'absolute inset-0 bg-terracotta-400/20 blur-2xl -z-10 scale-95 opacity-60 group-hover:opacity-80 transition-opacity duration-500',
            shapeMap[shape]
          )}
        />
      )}

      {/* Main image container */}
      <div
        className={cn(
          'overflow-hidden shadow-warm-lg transition-transform duration-500 group-hover:scale-[1.01] bg-cream-200',
          withBorder && 'border-4 border-white ring-1 ring-cream-300/60',
          shapeMap[shape]
        )}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={cn(
            'w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105',
            imgClassName
          )}
        />
      </div>

      {/* Floating UI Badge */}
      {floatingBadge && (
        <div className={cn('absolute z-10 animate-float', badgePositionMap[floatingBadgePosition])}>
          {floatingBadge}
        </div>
      )}
    </div>
  );
};
