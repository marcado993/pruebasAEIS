'use client';

import React, { useState, useEffect } from 'react';
import { TerminalWindow, StatusBadge } from '@/components/ui';

// Stats Counter Widget
const StatWidget = ({ 
  label, 
  value, 
  suffix = '', 
  color = 'var(--circuit-green)' 
}: { 
  label: string; 
  value: number; 
  suffix?: string;
  color?: string;
}) => (
  <div className="bg-[var(--deep-navy-light)] border border-[var(--border-color)] rounded-lg p-4 hover:border-[var(--circuit-green)] transition-all hover:shadow-[0_0_15px_var(--circuit-green-glow)]">
    <p className="text-xs font-mono text-[var(--text-muted)] mb-1">{label}:</p>
    <p className="text-3xl font-mono font-bold" style={{ color }}>
      {value.toLocaleString()}{suffix}
    </p>
  </div>
);

// Activity Feed Item
const FeedItem = ({ 
  timestamp, 
  action, 
  details,
  type = 'info'
}: { 
  timestamp: string; 
  action: string; 
  details: string;
  type?: 'info' | 'success' | 'warning' | 'error';
}) => {
  const colors = {
    info: 'var(--text-secondary)',
    success: 'var(--circuit-green)',
    warning: 'var(--warning-yellow)',
    error: 'var(--error-red)',
  };

  return (
    <div className="flex gap-3 py-2 border-b border-[var(--border-color)] last:border-0">
      <span className="text-xs font-mono text-[var(--text-muted)] w-20 shrink-0">
        {timestamp}
      </span>
      <div className="flex-1">
        <span className="text-sm font-mono" style={{ color: colors[type] }}>
          [{action}]
        </span>
        <span className="text-sm font-mono text-[var(--text-secondary)] ml-2">
          {details}
        </span>
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: 'AVAILABLE_NODES', value: 142, color: 'var(--circuit-green)' },
    { label: 'OCCUPIED_NODES', value: 58, color: 'var(--warning-yellow)' },
    { label: 'MAINTENANCE', value: 5, color: 'var(--error-red)' },
    { label: 'TOTAL_USERS', value: 1247, color: 'var(--text-secondary)' },
  ];

  const activityFeed = [
    { timestamp: '14:32:01', action: 'RENT_COMPLETE', details: 'Node A-15 assigned to user#4521', type: 'success' as const },
    { timestamp: '14:28:45', action: 'PAYMENT_OK', details: 'Transaction #78421 processed', type: 'success' as const },
    { timestamp: '14:25:12', action: 'SYS_WARN', details: 'Node B-08 scheduled for maintenance', type: 'warning' as const },
    { timestamp: '14:20:33', action: 'USER_LOGIN', details: 'Admin access from 192.168.1.1', type: 'info' as const },
    { timestamp: '14:15:00', action: 'RENT_EXPIRED', details: 'Node C-22 released automatically', type: 'info' as const },
    { timestamp: '14:10:22', action: 'ERROR', details: 'Payment gateway timeout - retrying', type: 'error' as const },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-mono text-[var(--circuit-green)] mb-1">
            &gt; COMMAND_CENTER
          </h1>
          <p className="text-sm font-mono text-[var(--text-muted)]">
            SYSTEM_OVERVIEW // REAL_TIME_MONITORING
          </p>
        </div>
        <div className="text-right font-mono">
          <p className="text-lg text-[var(--circuit-green)]">
            {currentTime.toLocaleTimeString('en-US', { hour12: false })}
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'short', 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            }).toUpperCase()}
          </p>
        </div>
      </div>

      {/* System Status Banner */}
      <div className="flex items-center gap-4 p-4 bg-[var(--deep-navy-light)] rounded-lg border border-[var(--border-color)]">
        <StatusBadge status="success" message="ALL_SYSTEMS_OPERATIONAL" />
        <span className="text-xs font-mono text-[var(--text-muted)]">
          UPTIME: 99.97% | LAST_SYNC: {currentTime.toLocaleTimeString()}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatWidget key={stat.label} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <div className="lg:col-span-2">
          <TerminalWindow title="COMM_LOGS // ACTIVITY_FEED">
            <div className="space-y-0">
              {activityFeed.map((item, index) => (
                <FeedItem key={index} {...item} />
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
              <p className="text-xs font-mono text-[var(--text-muted)]">
                &gt; END_OF_LOG | SHOWING_LATEST_6_ENTRIES
                <span className="cursor animate-blink ml-1" />
              </p>
            </div>
          </TerminalWindow>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <TerminalWindow title="QUICK_ACCESS">
            <div className="space-y-3">
              <a
                href="/dashboard/lockers"
                className="block p-3 border border-[var(--border-color)] rounded hover:border-[var(--circuit-green)] hover:bg-[var(--deep-navy)] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">▦</span>
                  <div>
                    <p className="font-mono text-sm text-[var(--circuit-green)] group-hover:text-white">
                      VIEW_GRID
                    </p>
                    <p className="font-mono text-xs text-[var(--text-muted)]">
                      Browse available nodes
                    </p>
                  </div>
                </div>
              </a>
              
              <a
                href="/dashboard/my-locker"
                className="block p-3 border border-[var(--border-color)] rounded hover:border-[var(--circuit-green)] hover:bg-[var(--deep-navy)] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">◉</span>
                  <div>
                    <p className="font-mono text-sm text-[var(--circuit-green)] group-hover:text-white">
                      MY_NODE
                    </p>
                    <p className="font-mono text-xs text-[var(--text-muted)]">
                      Manage your locker
                    </p>
                  </div>
                </div>
              </a>

              <a
                href="/dashboard/payments"
                className="block p-3 border border-[var(--border-color)] rounded hover:border-[var(--circuit-green)] hover:bg-[var(--deep-navy)] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⟐</span>
                  <div>
                    <p className="font-mono text-sm text-[var(--circuit-green)] group-hover:text-white">
                      MAKE_PAYMENT
                    </p>
                    <p className="font-mono text-xs text-[var(--text-muted)]">
                      Process transactions
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </TerminalWindow>

          {/* User Info Card */}
          <TerminalWindow title="SESSION_INFO">
            <div className="space-y-3 text-sm font-mono">
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">USER_ID:</span>
                <span className="text-[var(--circuit-green)]">#4521</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">ROLE:</span>
                <span className="text-[var(--warning-yellow)]">STUDENT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">NODE:</span>
                <span className="text-white">A-15</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">EXPIRES:</span>
                <span className="text-[var(--text-secondary)]">2024-06-30</span>
              </div>
            </div>
          </TerminalWindow>
        </div>
      </div>
    </div>
  );
}
