'use client';

import React from 'react';

interface PasswordStrengthProps {
  password: string;
  showLabel?: boolean;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({
  password,
  showLabel = true,
}) => {
  const calculateStrength = (pwd: string): number => {
    let strength = 0;
    if (pwd.length >= 8) strength += 25;
    if (pwd.length >= 12) strength += 15;
    if (/[a-z]/.test(pwd)) strength += 15;
    if (/[A-Z]/.test(pwd)) strength += 15;
    if (/[0-9]/.test(pwd)) strength += 15;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength += 15;
    return Math.min(100, strength);
  };

  const strength = calculateStrength(password);

  const getColor = () => {
    if (strength < 30) return 'var(--error-red)';
    if (strength < 60) return 'var(--warning-yellow)';
    return 'var(--circuit-green)';
  };

  const getLabel = () => {
    if (strength < 30) return 'WEAK_ENCRYPTION';
    if (strength < 60) return 'MODERATE_ENCRYPTION';
    if (strength < 90) return 'STRONG_ENCRYPTION';
    return 'MAXIMUM_ENTROPY';
  };

  return (
    <div className="w-full">
      <div className="h-2 bg-[var(--deep-navy-lighter)] rounded overflow-hidden">
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{
            width: `${strength}%`,
            backgroundColor: getColor(),
            boxShadow: strength > 60 ? `0 0 10px ${getColor()}` : 'none',
          }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs font-mono text-[var(--text-muted)]">
            ENTROPY_LEVEL:
          </span>
          <span
            className="text-xs font-mono"
            style={{ color: getColor() }}
          >
            [{getLabel()}]
          </span>
        </div>
      )}
    </div>
  );
};

export default PasswordStrength;
