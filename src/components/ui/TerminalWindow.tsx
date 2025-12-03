'use client';

import React from 'react';

interface TerminalWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  showHeader?: boolean;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({
  title = 'AEIS_TERMINAL',
  children,
  className = '',
  showHeader = true,
}) => {
  return (
    <div className={`terminal-window backdrop-blur-sm ${className}`}>
      {showHeader && (
        <div className="terminal-header">
          <span className="terminal-dot red"></span>
          <span className="terminal-dot yellow"></span>
          <span className="terminal-dot green"></span>
          <span className="ml-4 text-sm text-[var(--text-secondary)] font-mono">
            {title}
          </span>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};

export default TerminalWindow;
