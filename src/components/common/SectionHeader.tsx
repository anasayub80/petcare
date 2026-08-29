import React from 'react';
import { cn } from '../../utils/cn';
import { Badge } from './Badge';

export interface SectionHeaderProps {
  eyebrow?: string;
  cursiveSubtitle?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  badgeVariant?: 'terracotta' | 'sage' | 'cream' | 'chocolate' | 'sand';
  className?: string;
  titleClassName?: string;
  action?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  cursiveSubtitle,
  title,
  description,
  align = 'center',
  badgeVariant = 'terracotta',
  className,
  titleClassName,
  action,
}) => {
  const alignMap = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  };

  return (
    <div className={cn('flex flex-col max-w-3xl mb-12 lg:mb-16', alignMap[align], className)}>
      {eyebrow && (
        <div className="mb-3">
          <Badge variant={badgeVariant} withPaw size="md">
            {eyebrow}
          </Badge>
        </div>
      )}

      {cursiveSubtitle && (
        <span className="font-script text-2xl md:text-3xl text-terracotta-600 font-semibold tracking-wide -rotate-1 mb-1">
          {cursiveSubtitle}
        </span>
      )}

      <h2
        className={cn(
          'text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-chocolate-900 leading-[1.15]',
          titleClassName
        )}
      >
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-base sm:text-lg text-chocolate-700/80 leading-relaxed max-w-2xl">
          {description}
        </p>
      )}

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};
