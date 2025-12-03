'use client';

import React from 'react';
import { TerminalWindow, Button } from '@/components/ui';

export default function PaymentsPage() {
  const paymentHistory = [
    { id: 'TXN-ABC123', date: '2024-01-15', description: 'Locker A-05 Rental', amount: '$174.00', status: 'completed' },
    { id: 'TXN-DEF456', date: '2023-08-20', description: 'Locker A-05 Rental', amount: '$174.00', status: 'completed' },
    { id: 'TXN-GHI789', date: '2023-01-18', description: 'Locker B-12 Rental', amount: '$150.00', status: 'completed' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-mono text-[var(--circuit-green)] mb-1">
            &gt; ASSET_TRANSFER
          </h1>
          <p className="text-sm font-mono text-[var(--text-muted)]">
            PAYMENT_HISTORY // TRANSACTION_LOGS
          </p>
        </div>
        <Button onClick={() => window.location.href = '/dashboard/lockers'}>
          NEW_RENTAL
        </Button>
      </div>

      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[var(--deep-navy-light)] border border-[var(--border-color)] rounded-lg p-4">
          <p className="text-xs font-mono text-[var(--text-muted)] mb-1">TOTAL_TRANSFERRED:</p>
          <p className="text-2xl font-mono text-[var(--circuit-green)]">$498.00</p>
        </div>
        <div className="bg-[var(--deep-navy-light)] border border-[var(--border-color)] rounded-lg p-4">
          <p className="text-xs font-mono text-[var(--text-muted)] mb-1">TRANSACTIONS:</p>
          <p className="text-2xl font-mono text-white">3</p>
        </div>
        <div className="bg-[var(--deep-navy-light)] border border-[var(--border-color)] rounded-lg p-4">
          <p className="text-xs font-mono text-[var(--text-muted)] mb-1">PENDING:</p>
          <p className="text-2xl font-mono text-[var(--warning-yellow)]">$0.00</p>
        </div>
      </div>

      {/* Transaction History */}
      <TerminalWindow title="TRANSACTION_ARCHIVE">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-mono">
            <thead>
              <tr className="border-b border-[var(--border-color)]">
                <th className="text-left py-3 text-[var(--circuit-green)]">TX_ID</th>
                <th className="text-left py-3 text-[var(--circuit-green)]">TIMESTAMP</th>
                <th className="text-left py-3 text-[var(--circuit-green)]">DESCRIPTION</th>
                <th className="text-right py-3 text-[var(--circuit-green)]">AMOUNT</th>
                <th className="text-right py-3 text-[var(--circuit-green)]">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((tx) => (
                <tr key={tx.id} className="border-b border-[var(--border-color)] last:border-0 hover:bg-[var(--deep-navy-light)]">
                  <td className="py-3 text-[var(--circuit-green)]">{tx.id}</td>
                  <td className="py-3 text-[var(--text-muted)]">{tx.date}</td>
                  <td className="py-3 text-white">{tx.description}</td>
                  <td className="py-3 text-right text-white">{tx.amount}</td>
                  <td className="py-3 text-right">
                    <span className="px-2 py-1 text-xs bg-[var(--circuit-green)] bg-opacity-20 text-[var(--circuit-green)] rounded">
                      {tx.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TerminalWindow>
    </div>
  );
}
