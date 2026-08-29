import React from 'react';
import { cn } from '../../utils/cn';
import { PawPrint } from 'lucide-react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'terracotta' | 'cream' | 'chocolate' | 'sage' | 'sand' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  withPaw?: boolean;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'terracotta',
  size = 'md',
  withPaw = false,
  icon,
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full transition-colors';

  const variants = {
    terracotta: 'bg-terracotta-100 text-terracotta-800 border border-terracotta-200/80',
    cream: 'bg-cream-200/80 text-chocolate-800 border border-cream-300',
    chocolate: 'bg-chocolate-900 text-cream-100',
    sage: 'bg-sage-100 text-sage-800 border border-sage-200',
    sand: 'bg-sand-200 text-sand-800 border border-sand-300',
    outline: 'bg-white/60 backdrop-blur-sm text-chocolate-800 border border-chocolate-900/10',
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-1 gap-1',
    md: 'text-xs font-semibold px-3.5 py-1.5 gap-1.5',
    lg: 'text-sm font-semibold px-4 py-2 gap-2',
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {withPaw && <PawPrint className="w-3.5 h-3.5 shrink-0 opacity-80" />}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
