'use client';

import React from 'react';
import { TerminalWindow, Button, StatusBadge } from '@/components/ui';

export default function MyLockerPage() {
  // Simulated user locker data
  const myLocker = {
    id: 'A-05',
    block: 'BLOCK_A',
    row: 'A',
    column: 5,
    size: 'medium' as const,
    dimensions: '40x40x60 cm',
    status: 'active',
    rentedAt: '2024-01-15',
    expiresAt: '2024-06-30',
    daysRemaining: 180,
    price: 150,
    accessCode: '****7842',
  };

  const rentalHistory = [
    { date: '2024-01-15', action: 'RENT_INITIATED', amount: '$150.00' },
    { date: '2024-01-15', action: 'PAYMENT_CONFIRMED', amount: '$150.00' },
    { date: '2024-01-15', action: 'ACCESS_GRANTED', amount: '-' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-mono text-[var(--circuit-green)] mb-1">
          &gt; MY_NODE
        </h1>
        <p className="text-sm font-mono text-[var(--text-muted)]">
          CURRENT_SESSION // NODE_MANAGEMENT
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Locker Info */}
        <div className="lg:col-span-2">
          <TerminalWindow title={`NODE_STATUS // ${myLocker.id}`}>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Locker Visualization */}
              <div className="flex-shrink-0">
                <div className="w-32 h-40 border-2 border-[var(--circuit-green)] rounded-lg bg-[var(--deep-navy)] flex flex-col items-center justify-center shadow-[0_0_30px_var(--circuit-green-glow)] animate-glow">
                  <span className="text-3xl font-mono text-[var(--circuit-green)] font-bold">
                    {myLocker.id}
                  </span>
                  <span className="text-xs font-mono text-[var(--text-muted)] mt-2">
                    {myLocker.size.toUpperCase()}
                  </span>
                  <div className="mt-4 w-8 h-3 bg-[var(--circuit-green)] rounded-full opacity-60" />
                </div>
              </div>

              {/* Details */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <StatusBadge status="success" message="ACTIVE_RENTAL" />
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    {myLocker.daysRemaining} DAYS_REMAINING
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                  <div>
                    <p className="text-[var(--text-muted)]">NODE_ID:</p>
                    <p className="text-[var(--circuit-green)]">{myLocker.id}</p>
                  </div>
                  <div>
                    <p className="text-[var(--text-muted)]">BLOCK:</p>
                    <p className="text-white">{myLocker.block}</p>
                  </div>
                  <div>
                    <p className="text-[var(--text-muted)]">DIMENSIONS:</p>
                    <p className="text-white">{myLocker.dimensions}</p>
                  </div>
                  <div>
                    <p className="text-[var(--text-muted)]">ACCESS_CODE:</p>
                    <p className="text-[var(--circuit-green)]">{myLocker.accessCode}</p>
                  </div>
                  <div>
                    <p className="text-[var(--text-muted)]">START_TIMESTAMP:</p>
                    <p className="text-white">{myLocker.rentedAt}</p>
                  </div>
                  <div>
                    <p className="text-[var(--text-muted)]">END_TIMESTAMP:</p>
                    <p className="text-[var(--warning-yellow)]">{myLocker.expiresAt}</p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="primary">RENEW_RENTAL</Button>
                  <Button variant="ghost">VIEW_ACCESS_LOG</Button>
                </div>
              </div>
            </div>
          </TerminalWindow>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <TerminalWindow title="RENTAL_METRICS">
            <div className="space-y-4">
              {/* Progress bar for remaining time */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-[var(--text-muted)]">TIME_REMAINING:</span>
                  <span className="text-[var(--circuit-green)]">{myLocker.daysRemaining} days</span>
                </div>
                <div className="h-2 bg-[var(--deep-navy-lighter)] rounded overflow-hidden">
                  <div 
                    className="h-full bg-[var(--circuit-green)] transition-all"
                    style={{ width: `${(myLocker.daysRemaining / 180) * 100}%` }}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border-color)] space-y-3">
                <div className="flex justify-between text-sm font-mono">
                  <span className="text-[var(--text-muted)]">TOTAL_PAID:</span>
                  <span className="text-[var(--circuit-green)]">${myLocker.price}.00</span>
                </div>
                <div className="flex justify-between text-sm font-mono">
                  <span className="text-[var(--text-muted)]">RENEWAL_COST:</span>
                  <span className="text-white">${myLocker.price}.00</span>
                </div>
              </div>
            </div>
          </TerminalWindow>

          <TerminalWindow title="QUICK_ACTIONS">
            <div className="space-y-2">
              <button className="w-full text-left p-3 border border-[var(--border-color)] rounded hover:border-[var(--circuit-green)] transition-all font-mono text-sm">
                <span className="text-[var(--circuit-green)]">⟐</span> MAKE_PAYMENT
              </button>
              <button className="w-full text-left p-3 border border-[var(--border-color)] rounded hover:border-[var(--circuit-green)] transition-all font-mono text-sm">
                <span className="text-[var(--circuit-green)]">⚿</span> RESET_ACCESS_CODE
              </button>
              <button className="w-full text-left p-3 border border-[var(--border-color)] rounded hover:border-[var(--error-red)] transition-all font-mono text-sm text-[var(--error-red)]">
                <span>⏻</span> TERMINATE_RENTAL
              </button>
            </div>
          </TerminalWindow>
        </div>
      </div>

      {/* Rental History */}
      <TerminalWindow title="TRANSACTION_LOG">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-mono">
            <thead>
              <tr className="border-b border-[var(--border-color)]">
                <th className="text-left py-3 text-[var(--circuit-green)]">TIMESTAMP</th>
                <th className="text-left py-3 text-[var(--circuit-green)]">ACTION</th>
                <th className="text-right py-3 text-[var(--circuit-green)]">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {rentalHistory.map((item, index) => (
                <tr key={index} className="border-b border-[var(--border-color)] last:border-0">
                  <td className="py-3 text-[var(--text-muted)]">{item.date}</td>
                  <td className="py-3 text-white">{item.action}</td>
                  <td className="py-3 text-right text-[var(--circuit-green)]">{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TerminalWindow>
    </div>
  );
}
