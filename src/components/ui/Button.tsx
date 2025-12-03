'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'warning' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  glowing?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  glowing = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = `
    font-mono uppercase tracking-widest font-medium
    border rounded transition-all duration-300
    flex items-center justify-center gap-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary: `
      border-[var(--circuit-green)] text-[var(--circuit-green)]
      hover:bg-[var(--circuit-green)] hover:text-[var(--deep-navy)]
      hover:shadow-[0_0_20px_var(--circuit-green-glow)]
    `,
    danger: `
      border-[var(--error-red)] text-[var(--error-red)]
      hover:bg-[var(--error-red)] hover:text-[var(--deep-navy)]
      hover:shadow-[0_0_20px_rgba(255,68,68,0.3)]
    `,
    warning: `
      border-[var(--warning-yellow)] text-[var(--warning-yellow)]
      hover:bg-[var(--warning-yellow)] hover:text-[var(--deep-navy)]
      hover:shadow-[0_0_20px_rgba(255,217,61,0.3)]
    `,
    ghost: `
      border-[var(--border-color)] text-[var(--text-secondary)]
      hover:border-[var(--circuit-green)] hover:text-[var(--circuit-green)]
    `,
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const glowStyles = glowing ? 'animate-glow' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${glowStyles} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
};

export default Button;
