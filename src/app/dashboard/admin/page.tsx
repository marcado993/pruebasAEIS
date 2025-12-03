'use client';

import React from 'react';
import { TerminalWindow, Button } from '@/components/ui';
import Link from 'next/link';

export default function AdminPage() {
  const adminModules = [
    {
      id: 'create-block',
      title: 'BLUEPRINT_MODE',
      description: 'Create new locker blocks and configure grid structure',
      icon: '▦',
      href: '/dashboard/admin/create-block',
      permission: 'ROOT',
    },
    {
      id: 'users',
      title: 'USER_OVERRIDE',
      description: 'Search and manage user accounts with elevated privileges',
      icon: '👤',
      href: '/dashboard/admin/users',
      permission: 'ROOT',
    },
    {
      id: 'time-config',
      title: 'TIME_PROTOCOL',
      description: 'Configure rental periods and system timestamps',
      icon: '⏱',
      href: '/dashboard/admin/time-config',
      permission: 'ROOT',
    },
    {
      id: 'reports',
      title: 'TELEMETRY_EXPORT',
      description: 'Generate and export system reports',
      icon: '📊',
      href: '/dashboard/reports',
      permission: 'ADMIN',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-mono text-[var(--circuit-green)] mb-1">
          &gt; ADMIN_CONSOLE
        </h1>
        <p className="text-sm font-mono text-[var(--text-muted)]">
          SYSTEM_CONFIGURATION // ROOT_ACCESS_REQUIRED
        </p>
      </div>

      {/* Warning Banner */}
      <div className="p-4 bg-[var(--error-red)] bg-opacity-10 border border-[var(--error-red)] rounded-lg">
        <div className="flex items-center gap-3">
          <span className="text-2xl">⚠</span>
          <div>
            <p className="text-sm font-mono text-[var(--error-red)]">
              [SYS_WARN] ELEVATED_PRIVILEGES_ACTIVE
            </p>
            <p className="text-xs font-mono text-[var(--text-muted)]">
              Changes made in this console affect the entire system. Proceed with caution.
            </p>
          </div>
        </div>
      </div>

      {/* Admin Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {adminModules.map((module) => (
          <Link key={module.id} href={module.href}>
            <div className="h-full p-6 border border-[var(--border-color)] rounded-lg hover:border-[var(--circuit-green)] hover:shadow-[0_0_20px_var(--circuit-green-glow)] transition-all cursor-pointer group">
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{module.icon}</span>
                <span className="px-2 py-1 text-xs font-mono bg-[var(--error-red)] bg-opacity-20 text-[var(--error-red)] rounded">
                  {module.permission}
                </span>
              </div>
              <h3 className="text-lg font-mono text-[var(--circuit-green)] group-hover:text-white mb-2">
                {module.title}
              </h3>
              <p className="text-sm font-mono text-[var(--text-muted)]">
                {module.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* System Stats */}
      <TerminalWindow title="SYSTEM_METRICS">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-3xl font-mono text-[var(--circuit-green)]">205</p>
            <p className="text-xs font-mono text-[var(--text-muted)]">TOTAL_NODES</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-mono text-white">1,247</p>
            <p className="text-xs font-mono text-[var(--text-muted)]">REGISTERED_USERS</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-mono text-[var(--warning-yellow)]">58</p>
            <p className="text-xs font-mono text-[var(--text-muted)]">ACTIVE_RENTALS</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-mono text-[var(--circuit-green)]">$8,700</p>
            <p className="text-xs font-mono text-[var(--text-muted)]">THIS_PERIOD</p>
          </div>
        </div>
      </TerminalWindow>
    </div>
  );
}
