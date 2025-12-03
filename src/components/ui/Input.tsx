'use client';

import React, { forwardRef } from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  prefix?: string;
  showCursor?: boolean;
  inputSize?: 'sm' | 'md' | 'lg';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, prefix = '>', showCursor = false, inputSize = 'md', className = '', ...props }, ref) => {
    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3.5 text-base',
      lg: 'px-5 py-4 text-lg',
    };

    const labelSizes = {
      sm: 'text-xs mb-1.5',
      md: 'text-sm mb-2.5',
      lg: 'text-base mb-3',
    };

    return (
      <div className="w-full">
        {label && (
          <label className={`block text-[var(--text-secondary)] ${labelSizes[inputSize]} font-mono`}>
            <span className="text-[var(--circuit-green)]">{prefix}</span> {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            className={`
              w-full bg-[var(--input-bg)] border-2 border-[var(--border-color)]
              text-white font-mono rounded-lg
              focus:outline-none focus:border-[var(--circuit-green)]
              focus:shadow-[0_0_15px_var(--circuit-green-glow)]
              placeholder:text-[var(--text-muted)]
              transition-all duration-300
              ${sizes[inputSize]}
              ${error ? 'border-[var(--error-red)]' : ''}
              ${className}
            `}
            {...props}
          />
          {showCursor && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 cursor animate-blink" />
          )}
        </div>
        {error && (
          <p className="mt-2.5 text-sm text-[var(--error-red)] font-mono">
            <span className="text-[var(--error-red)]">[ERR]</span> {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
