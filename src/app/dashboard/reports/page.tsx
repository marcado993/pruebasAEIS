'use client';

import React, { useState } from 'react';
import { TerminalWindow, Button, StatusBadge } from '@/components/ui';

interface ReportRow {
  id: string;
  userId: string;
  userName: string;
  lockerId: string;
  block: string;
  startDate: string;
  endDate: string;
  amount: string;
  status: 'active' | 'expired' | 'cancelled';
}

export default function ReportsPage() {
  const [filters, setFilters] = useState({
    block: 'ALL',
    status: 'ALL',
    period: 'ALL',
  });

  // Sample report data
  const reportData: ReportRow[] = [
    { id: 'R001', userId: 'U001', userName: 'Juan Pérez', lockerId: 'A-05', block: 'BLOCK_A', startDate: '2024-01-15', endDate: '2024-06-30', amount: '$174.00', status: 'active' },
    { id: 'R002', userId: 'U002', userName: 'María García', lockerId: 'B-12', block: 'BLOCK_B', startDate: '2024-01-15', endDate: '2024-06-30', amount: '$174.00', status: 'active' },
    { id: 'R003', userId: 'U003', userName: 'Carlos López', lockerId: 'A-03', block: 'BLOCK_A', startDate: '2023-08-15', endDate: '2023-12-15', amount: '$150.00', status: 'expired' },
    { id: 'R004', userId: 'U004', userName: 'Ana Martínez', lockerId: 'C-08', block: 'BLOCK_C', startDate: '2024-01-15', endDate: '2024-06-30', amount: '$174.00', status: 'cancelled' },
    { id: 'R005', userId: 'U005', userName: 'Roberto Sánchez', lockerId: 'A-10', block: 'BLOCK_A', startDate: '2024-01-15', endDate: '2024-06-30', amount: '$174.00', status: 'active' },
    { id: 'R006', userId: 'U006', userName: 'Laura Torres', lockerId: 'B-05', block: 'BLOCK_B', startDate: '2024-01-15', endDate: '2024-06-30', amount: '$174.00', status: 'active' },
  ];

  const filteredData = reportData.filter((row) => {
    if (filters.block !== 'ALL' && row.block !== filters.block) return false;
    if (filters.status !== 'ALL' && row.status !== filters.status) return false;
    return true;
  });

  const handleExport = () => {
    // Create CSV content
    const headers = ['ID', 'User ID', 'User Name', 'Locker ID', 'Block', 'Start Date', 'End Date', 'Amount', 'Status'];
    const csvContent = [
      headers.join(','),
      ...filteredData.map((row) =>
        [row.id, row.userId, row.userName, row.lockerId, row.block, row.startDate, row.endDate, row.amount, row.status].join(',')
      ),
    ].join('\n');

    // Download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aeis_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const stats = {
    total: reportData.length,
    active: reportData.filter((r) => r.status === 'active').length,
    expired: reportData.filter((r) => r.status === 'expired').length,
    cancelled: reportData.filter((r) => r.status === 'cancelled').length,
    revenue: reportData
      .filter((r) => r.status !== 'cancelled')
      .reduce((sum, r) => sum + parseFloat(r.amount.replace('$', '')), 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-mono text-[var(--circuit-green)] mb-1">
            &gt; DATA_DUMP
          </h1>
          <p className="text-sm font-mono text-[var(--text-muted)]">
            DATABASE_VISUALIZATION // RENTAL_TELEMETRY
          </p>
        </div>
        <Button onClick={handleExport} glowing>
          EXPORT_TELEMETRY
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-[var(--deep-navy-light)] border border-[var(--border-color)] rounded-lg p-4">
          <p className="text-xs font-mono text-[var(--text-muted)]">TOTAL_RECORDS:</p>
          <p className="text-2xl font-mono text-white">{stats.total}</p>
        </div>
        <div className="bg-[var(--deep-navy-light)] border border-[var(--border-color)] rounded-lg p-4">
          <p className="text-xs font-mono text-[var(--text-muted)]">ACTIVE:</p>
          <p className="text-2xl font-mono text-[var(--circuit-green)]">{stats.active}</p>
        </div>
        <div className="bg-[var(--deep-navy-light)] border border-[var(--border-color)] rounded-lg p-4">
          <p className="text-xs font-mono text-[var(--text-muted)]">EXPIRED:</p>
          <p className="text-2xl font-mono text-[var(--text-secondary)]">{stats.expired}</p>
        </div>
        <div className="bg-[var(--deep-navy-light)] border border-[var(--border-color)] rounded-lg p-4">
          <p className="text-xs font-mono text-[var(--text-muted)]">CANCELLED:</p>
          <p className="text-2xl font-mono text-[var(--error-red)]">{stats.cancelled}</p>
        </div>
        <div className="bg-[var(--deep-navy-light)] border border-[var(--circuit-green)] rounded-lg p-4">
          <p className="text-xs font-mono text-[var(--text-muted)]">TOTAL_REVENUE:</p>
          <p className="text-2xl font-mono text-[var(--circuit-green)]">${stats.revenue.toFixed(2)}</p>
        </div>
      </div>

      {/* Filters */}
      <TerminalWindow title="QUERY_FILTERS">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-xs font-mono text-[var(--text-muted)] mb-2">
              FILTER: BLOCK
            </label>
            <select
              value={filters.block}
              onChange={(e) => setFilters({ ...filters, block: e.target.value })}
              className="bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--circuit-green)] font-mono px-4 py-2 rounded focus:outline-none focus:border-[var(--circuit-green)]"
            >
              <option value="ALL">ALL_BLOCKS</option>
              <option value="BLOCK_A">BLOCK_A</option>
              <option value="BLOCK_B">BLOCK_B</option>
              <option value="BLOCK_C">BLOCK_C</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-[var(--text-muted)] mb-2">
              FILTER: STATUS
            </label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--circuit-green)] font-mono px-4 py-2 rounded focus:outline-none focus:border-[var(--circuit-green)]"
            >
              <option value="ALL">ALL_STATUS</option>
              <option value="active">ACTIVE</option>
              <option value="expired">EXPIRED</option>
              <option value="cancelled">CANCELLED</option>
            </select>
          </div>

          <div className="flex items-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFilters({ block: 'ALL', status: 'ALL', period: 'ALL' })}
            >
              RESET_FILTERS
            </Button>
          </div>
        </div>
      </TerminalWindow>

      {/* Data Table - Matrix Style */}
      <TerminalWindow title="MATRIX_TABLE // RENTAL_DATA">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-mono">
            <thead>
              <tr className="border-b-2 border-[var(--circuit-green)]">
                <th className="text-left py-3 px-2 text-[var(--circuit-green)]">RECORD_ID</th>
                <th className="text-left py-3 px-2 text-[var(--circuit-green)]">USER_ID</th>
                <th className="text-left py-3 px-2 text-[var(--circuit-green)]">USER_NAME</th>
                <th className="text-left py-3 px-2 text-[var(--circuit-green)]">NODE_ID</th>
                <th className="text-left py-3 px-2 text-[var(--circuit-green)]">BLOCK</th>
                <th className="text-left py-3 px-2 text-[var(--circuit-green)]">START_TS</th>
                <th className="text-left py-3 px-2 text-[var(--circuit-green)]">END_TS</th>
                <th className="text-right py-3 px-2 text-[var(--circuit-green)]">AMOUNT</th>
                <th className="text-right py-3 px-2 text-[var(--circuit-green)]">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr
                  key={row.id}
                  className={`
                    border-b border-[var(--border-color)] hover:bg-[var(--deep-navy-light)] transition-colors
                    ${index % 2 === 0 ? '' : 'bg-[var(--deep-navy)] bg-opacity-30'}
                  `}
                >
                  <td className="py-3 px-2 text-[var(--circuit-green)]">{row.id}</td>
                  <td className="py-3 px-2 text-[var(--text-muted)]">{row.userId}</td>
                  <td className="py-3 px-2 text-white">{row.userName}</td>
                  <td className="py-3 px-2 text-[var(--circuit-green)]">{row.lockerId}</td>
                  <td className="py-3 px-2 text-[var(--text-secondary)]">{row.block}</td>
                  <td className="py-3 px-2 text-[var(--text-muted)]">{row.startDate}</td>
                  <td className="py-3 px-2 text-[var(--text-muted)]">{row.endDate}</td>
                  <td className="py-3 px-2 text-right text-white">{row.amount}</td>
                  <td className="py-3 px-2 text-right">
                    <StatusBadge
                      status={
                        row.status === 'active' ? 'success' : row.status === 'expired' ? 'info' : 'error'
                      }
                      message={row.status.toUpperCase()}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="mt-4 pt-4 border-t border-[var(--border-color)] flex justify-between items-center">
          <p className="text-xs font-mono text-[var(--text-muted)]">
            DISPLAYING: {filteredData.length} OF {reportData.length} RECORDS
          </p>
          <p className="text-xs font-mono text-[var(--text-muted)]">
            LAST_QUERY: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </TerminalWindow>
    </div>
  );
}
