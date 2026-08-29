import React from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'terracotta' | 'secondary' | 'outline' | 'ghost' | 'cream';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  as?: React.ElementType;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variants = {
      primary: 'bg-chocolate-900 text-cream-50 hover:bg-chocolate-800 shadow-warm-sm hover:shadow-warm-md focus:ring-chocolate-700',
      terracotta: 'bg-terracotta-500 text-white hover:bg-terracotta-600 shadow-warm-sm hover:shadow-warm-md hover:shadow-terracotta-500/20 focus:ring-terracotta-500',
      secondary: 'bg-cream-100 text-chocolate-900 hover:bg-cream-200 border border-cream-300/80 shadow-warm-xs hover:shadow-warm-sm focus:ring-chocolate-400',
      cream: 'bg-cream-50 text-chocolate-900 hover:bg-white border border-cream-300 shadow-warm-sm hover:shadow-warm-md focus:ring-terracotta-400',
      outline: 'bg-transparent text-chocolate-900 hover:bg-cream-100 border border-chocolate-900/20 hover:border-chocolate-900/40 focus:ring-chocolate-400',
      ghost: 'bg-transparent text-chocolate-800 hover:bg-cream-200/60 focus:ring-chocolate-400',
    };

    const sizes = {
      sm: 'text-xs px-3.5 py-2 gap-1.5',
      md: 'text-sm px-5 py-2.5 gap-2',
      lg: 'text-base px-6 py-3.5 gap-2.5',
      xl: 'text-lg px-8 py-4 gap-3',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        ) : leftIcon ? (
          <span className="inline-flex shrink-0 items-center justify-center">{leftIcon}</span>
        ) : null}
        <span>{children}</span>
        {!isLoading && rightIcon ? (
          <span className="inline-flex shrink-0 items-center justify-center">{rightIcon}</span>
        ) : null}
      </button>
    );
  }
);

Button.displayName = 'Button';
