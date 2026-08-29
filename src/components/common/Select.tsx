import React from 'react';
import { cn } from '../../utils/cn';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, error, helperText, leftIcon, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-semibold text-chocolate-900 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 pointer-events-none text-chocolate-500 flex items-center justify-center">
              {leftIcon}
            </div>
          )}
          <select
            id={selectId}
            ref={ref}
            className={cn(
              'w-full appearance-none rounded-2xl bg-white border border-cream-300 px-4 py-3 pr-10 text-chocolate-900 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-400 focus:border-terracotta-400 transition-all shadow-warm-xs cursor-pointer',
              leftIcon && 'pl-10',
              error && 'border-rose-400 focus:ring-rose-400',
              className
            )}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3.5 pointer-events-none w-4 h-4 text-chocolate-500" />
        </div>
        {error ? (
          <p className="mt-1.5 text-xs font-medium text-rose-600">{error}</p>
        ) : helperText ? (
          <p className="mt-1.5 text-xs text-chocolate-600/80">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = 'Select';
