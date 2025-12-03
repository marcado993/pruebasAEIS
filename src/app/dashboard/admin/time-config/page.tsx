'use client';

import React, { useState } from 'react';
import { TerminalWindow, Button, Input } from '@/components/ui';

export default function TimeConfigPage() {
  const [periods, setPeriods] = useState([
    { id: 1, name: 'SEMESTER_1_2024', startDate: '2024-01-15', endDate: '2024-06-30', status: 'active' },
    { id: 2, name: 'SEMESTER_2_2024', startDate: '2024-08-15', endDate: '2024-12-15', status: 'scheduled' },
  ]);

  const [newPeriod, setNewPeriod] = useState({
    name: '',
    startDate: '',
    endDate: '',
  });

  const handleAddPeriod = () => {
    if (newPeriod.name && newPeriod.startDate && newPeriod.endDate) {
      setPeriods([
        ...periods,
        {
          id: periods.length + 1,
          ...newPeriod,
          status: 'scheduled',
        },
      ]);
      setNewPeriod({ name: '', startDate: '', endDate: '' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-mono text-[var(--circuit-green)] mb-1">
          &gt; TIME_PROTOCOL
        </h1>
        <p className="text-sm font-mono text-[var(--text-muted)]">
          TEMPORAL_CONFIGURATION // RENTAL_PERIOD_MANAGEMENT
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Periods */}
        <TerminalWindow title="ACTIVE_TIMELINES">
          <div className="space-y-4">
            {periods.map((period) => (
              <div
                key={period.id}
                className={`
                  p-4 rounded border transition-all
                  ${period.status === 'active'
                    ? 'border-[var(--circuit-green)] bg-[var(--circuit-green)] bg-opacity-5'
                    : 'border-[var(--border-color)]'}
                `}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[var(--circuit-green)]">{period.name}</span>
                  <span
                    className={`
                      px-2 py-1 text-xs font-mono rounded
                      ${period.status === 'active'
                        ? 'bg-[var(--circuit-green)] bg-opacity-20 text-[var(--circuit-green)]'
                        : 'bg-[var(--warning-yellow)] bg-opacity-20 text-[var(--warning-yellow)]'}
                    `}
                  >
                    {period.status.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                  <div>
                    <p className="text-[var(--text-muted)]">START_TIMESTAMP:</p>
                    <p className="text-white">{period.startDate}</p>
                  </div>
                  <div>
                    <p className="text-[var(--text-muted)]">END_TIMESTAMP:</p>
                    <p className="text-white">{period.endDate}</p>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="ghost">EDIT</Button>
                  {period.status !== 'active' && (
                    <Button size="sm" variant="danger">DELETE</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TerminalWindow>

        {/* Add New Period */}
        <TerminalWindow title="CREATE_TIMELINE">
          <div className="space-y-4">
            <Input
              label="PERIOD_IDENTIFIER"
              placeholder="SEMESTER_X_YYYY"
              value={newPeriod.name}
              onChange={(e) => setNewPeriod({ ...newPeriod, name: e.target.value.toUpperCase().replace(/ /g, '_') })}
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[var(--text-secondary)] text-sm mb-2 font-mono">
                  <span className="text-[var(--circuit-green)]">&gt;</span> START_TIMESTAMP
                </label>
                <input
                  type="date"
                  value={newPeriod.startDate}
                  onChange={(e) => setNewPeriod({ ...newPeriod, startDate: e.target.value })}
                  className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] text-white font-mono px-4 py-3 rounded focus:outline-none focus:border-[var(--circuit-green)]"
                />
              </div>
              <div>
                <label className="block text-[var(--text-secondary)] text-sm mb-2 font-mono">
                  <span className="text-[var(--circuit-green)]">&gt;</span> END_TIMESTAMP
                </label>
                <input
                  type="date"
                  value={newPeriod.endDate}
                  onChange={(e) => setNewPeriod({ ...newPeriod, endDate: e.target.value })}
                  className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] text-white font-mono px-4 py-3 rounded focus:outline-none focus:border-[var(--circuit-green)]"
                />
              </div>
            </div>

            <Button className="w-full" onClick={handleAddPeriod}>
              DEPLOY_TIMELINE
            </Button>
          </div>

          {/* System Time Info */}
          <div className="mt-6 pt-4 border-t border-[var(--border-color)]">
            <p className="text-xs font-mono text-[var(--text-muted)] mb-2">SYSTEM_CLOCK:</p>
            <div className="space-y-1 text-sm font-mono">
              <p>
                <span className="text-[var(--text-muted)]">UTC:</span>
                <span className="text-[var(--circuit-green)] ml-2">{new Date().toISOString()}</span>
              </p>
              <p>
                <span className="text-[var(--text-muted)]">LOCAL:</span>
                <span className="text-white ml-2">{new Date().toLocaleString()}</span>
              </p>
            </div>
          </div>
        </TerminalWindow>
      </div>
    </div>
  );
}
