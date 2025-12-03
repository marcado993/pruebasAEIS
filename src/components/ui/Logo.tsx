'use client';

import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  animated = true,
  showText = true,
}) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl',
  };

  return (
    <div className="flex items-center gap-3">
      <div
        className={`
          ${sizes[size]} 
          ${animated ? 'animate-spin-slow' : ''}
          relative
        `}
      >
        {/* Chip SVG */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          style={{ filter: animated ? 'drop-shadow(0 0 10px var(--circuit-green))' : 'none' }}
        >
          {/* Outer frame */}
          <rect
            x="20"
            y="20"
            width="60"
            height="60"
            fill="var(--deep-navy-light)"
            stroke="var(--circuit-green)"
            strokeWidth="2"
            rx="4"
          />
          {/* Inner chip */}
          <rect
            x="30"
            y="30"
            width="40"
            height="40"
            fill="var(--deep-navy)"
            stroke="var(--circuit-green)"
            strokeWidth="1"
            rx="2"
          />
          {/* Circuit lines - top */}
          <line x1="35" y1="20" x2="35" y2="10" stroke="var(--circuit-green)" strokeWidth="2" />
          <line x1="50" y1="20" x2="50" y2="10" stroke="var(--circuit-green)" strokeWidth="2" />
          <line x1="65" y1="20" x2="65" y2="10" stroke="var(--circuit-green)" strokeWidth="2" />
          {/* Circuit lines - bottom */}
          <line x1="35" y1="80" x2="35" y2="90" stroke="var(--circuit-green)" strokeWidth="2" />
          <line x1="50" y1="80" x2="50" y2="90" stroke="var(--circuit-green)" strokeWidth="2" />
          <line x1="65" y1="80" x2="65" y2="90" stroke="var(--circuit-green)" strokeWidth="2" />
          {/* Circuit lines - left */}
          <line x1="20" y1="35" x2="10" y2="35" stroke="var(--circuit-green)" strokeWidth="2" />
          <line x1="20" y1="50" x2="10" y2="50" stroke="var(--circuit-green)" strokeWidth="2" />
          <line x1="20" y1="65" x2="10" y2="65" stroke="var(--circuit-green)" strokeWidth="2" />
          {/* Circuit lines - right */}
          <line x1="80" y1="35" x2="90" y2="35" stroke="var(--circuit-green)" strokeWidth="2" />
          <line x1="80" y1="50" x2="90" y2="50" stroke="var(--circuit-green)" strokeWidth="2" />
          <line x1="80" y1="65" x2="90" y2="65" stroke="var(--circuit-green)" strokeWidth="2" />
          {/* Center text */}
          <text
            x="50"
            y="55"
            textAnchor="middle"
            fill="var(--circuit-green)"
            fontSize="14"
            fontFamily="monospace"
            fontWeight="bold"
          >
            AEIS
          </text>
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizes[size]} font-bold text-[var(--circuit-green)] font-mono tracking-wider`}>
            AEIS
          </span>
          <span className="text-xs text-[var(--text-muted)] font-mono">
            MAINFRAME_v1.0
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
