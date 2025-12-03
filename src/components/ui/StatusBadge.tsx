'use client';

import React from 'react';

type StatusType = 'success' | 'error' | 'warning' | 'info' | 'loading';

interface StatusBadgeProps {
  status: StatusType;
  message: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  message,
  className = '',
}) => {
  const statusConfig = {
    success: {
      prefix: '[OK]',
      color: 'var(--circuit-green)',
      bgColor: 'rgba(0, 255, 157, 0.1)',
    },
    error: {
      prefix: '[ERR]',
      color: 'var(--error-red)',
      bgColor: 'rgba(255, 68, 68, 0.1)',
    },
    warning: {
      prefix: '[WARN]',
      color: 'var(--warning-yellow)',
      bgColor: 'rgba(255, 217, 61, 0.1)',
    },
    info: {
      prefix: '[INFO]',
      color: 'var(--text-secondary)',
      bgColor: 'rgba(136, 146, 176, 0.1)',
    },
    loading: {
      prefix: '[...]',
      color: 'var(--circuit-green)',
      bgColor: 'rgba(0, 255, 157, 0.1)',
    },
  };

  const config = statusConfig[status];

  return (
    <div
      className={`
        inline-flex items-center gap-2 px-3 py-1.5 rounded font-mono text-sm
        ${className}
      `}
      style={{
        backgroundColor: config.bgColor,
        border: `1px solid ${config.color}`,
      }}
    >
      <span style={{ color: config.color }} className={status === 'loading' ? 'animate-pulse' : ''}>
        {config.prefix}
      </span>
      <span style={{ color: config.color }}>{message}</span>
    </div>
  );
};

export default StatusBadge;
