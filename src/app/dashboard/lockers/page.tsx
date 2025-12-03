'use client';

import React, { useState } from 'react';
import { TerminalWindow, Button, StatusBadge } from '@/components/ui';

type LockerStatus = 'available' | 'occupied' | 'maintenance' | 'current';

interface Locker {
  id: string;
  row: string;
  column: number;
  status: LockerStatus;
  size: 'small' | 'medium' | 'large';
  occupant?: string;
}

// Modal Component
const LockerModal = ({ 
  locker, 
  onClose, 
  onRent 
}: { 
  locker: Locker; 
  onClose: () => void;
  onRent: () => void;
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
    <div className="w-full max-w-md">
      <TerminalWindow title={`NODE_INFO // ${locker.id}`}>
        <div className="space-y-4">
          {/* Node Visualization */}
          <div className="flex justify-center py-4">
            <div className={`
              w-24 h-24 border-2 rounded-lg flex items-center justify-center
              ${locker.status === 'available' 
                ? 'border-[var(--circuit-green)] shadow-[0_0_20px_var(--circuit-green-glow)] animate-pulse' 
                : 'border-[var(--border-color)]'}
            `}>
              <span className="text-4xl font-mono text-[var(--circuit-green)]">
                {locker.id}
              </span>
            </div>
          </div>

          {/* Technical Data */}
          <div className="space-y-2 font-mono text-sm">
            <div className="flex justify-between py-2 border-b border-[var(--border-color)]">
              <span className="text-[var(--text-muted)]">NODE_ID:</span>
              <span className="text-[var(--circuit-green)]">{locker.id}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[var(--border-color)]">
              <span className="text-[var(--text-muted)]">POSITION:</span>
              <span className="text-white">ROW_{locker.row} / COL_{locker.column}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[var(--border-color)]">
              <span className="text-[var(--text-muted)]">SIZE_CLASS:</span>
              <span className="text-white">{locker.size.toUpperCase()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[var(--border-color)]">
              <span className="text-[var(--text-muted)]">DIMENSIONS:</span>
              <span className="text-white">
                {locker.size === 'small' ? '30x30x50' : locker.size === 'medium' ? '40x40x60' : '50x50x80'} cm
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-[var(--border-color)]">
              <span className="text-[var(--text-muted)]">STATUS:</span>
              <StatusBadge 
                status={locker.status === 'available' ? 'success' : locker.status === 'maintenance' ? 'warning' : 'info'}
                message={locker.status.toUpperCase()}
              />
            </div>
            <div className="flex justify-between py-2">
              <span className="text-[var(--text-muted)]">PRICE/SEMESTER:</span>
              <span className="text-[var(--circuit-green)]">$150.00 MXN</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button variant="ghost" className="flex-1" onClick={onClose}>
              CANCEL
            </Button>
            {locker.status === 'available' && (
              <Button className="flex-1" onClick={onRent} glowing>
                RENT_NODE
              </Button>
            )}
          </div>
        </div>
      </TerminalWindow>
    </div>
  </div>
);

// Locker Cell Component
const LockerCell = ({ 
  locker, 
  onClick 
}: { 
  locker: Locker; 
  onClick: () => void;
}) => {
  const statusStyles = {
    available: 'border-[var(--circuit-green)] hover:bg-[var(--circuit-green)] hover:bg-opacity-20 hover:shadow-[0_0_15px_var(--circuit-green-glow)] cursor-pointer',
    occupied: 'border-[var(--border-color)] bg-[var(--deep-navy-lighter)] cursor-not-allowed opacity-60',
    maintenance: 'border-[var(--warning-yellow)] bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,217,61,0.1)_10px,rgba(255,217,61,0.1)_20px)]',
    current: 'border-white bg-white bg-opacity-10 animate-pulse shadow-[0_0_20px_rgba(255,255,255,0.3)]',
  };

  const statusIcons = {
    available: '○',
    occupied: '🔒',
    maintenance: '⚠',
    current: '◉',
  };

  return (
    <button
      onClick={onClick}
      disabled={locker.status === 'occupied'}
      className={`
        aspect-square border-2 rounded-lg
        flex flex-col items-center justify-center gap-1
        transition-all duration-300 font-mono
        ${statusStyles[locker.status]}
      `}
    >
      <span className="text-lg">{statusIcons[locker.status]}</span>
      <span className="text-xs text-[var(--text-secondary)]">{locker.id}</span>
    </button>
  );
};

export default function LockersPage() {
  const [selectedLocker, setSelectedLocker] = useState<Locker | null>(null);
  const [filter, setFilter] = useState<LockerStatus | 'all'>('all');

  // Generate sample locker data
  const generateLockers = (): Locker[] => {
    const lockers: Locker[] = [];
    const rows = ['A', 'B', 'C', 'D', 'E'];
    const statuses: LockerStatus[] = ['available', 'occupied', 'maintenance', 'current'];
    
    rows.forEach((row) => {
      for (let col = 1; col <= 10; col++) {
        const randomStatus = Math.random();
        let status: LockerStatus;
        if (row === 'A' && col === 5) {
          status = 'current'; // User's current locker
        } else if (randomStatus < 0.6) {
          status = 'available';
        } else if (randomStatus < 0.9) {
          status = 'occupied';
        } else {
          status = 'maintenance';
        }

        lockers.push({
          id: `${row}-${col.toString().padStart(2, '0')}`,
          row,
          column: col,
          status,
          size: col <= 3 ? 'small' : col <= 7 ? 'medium' : 'large',
        });
      }
    });
    return lockers;
  };

  const lockers = generateLockers();
  const filteredLockers = filter === 'all' 
    ? lockers 
    : lockers.filter(l => l.status === filter);

  const stats = {
    available: lockers.filter(l => l.status === 'available').length,
    occupied: lockers.filter(l => l.status === 'occupied').length,
    maintenance: lockers.filter(l => l.status === 'maintenance').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-mono text-[var(--circuit-green)] mb-1">
          &gt; GRID_INFRASTRUCTURE
        </h1>
        <p className="text-sm font-mono text-[var(--text-muted)]">
          NODE_MATRIX // SELECT_YOUR_STORAGE_UNIT
        </p>
      </div>

      {/* Legend & Filters */}
      <TerminalWindow title="CIRCUIT_LEGEND">
        <div className="flex flex-wrap items-center gap-6">
          <button 
            onClick={() => setFilter('all')}
            className={`flex items-center gap-2 text-sm font-mono transition-colors ${filter === 'all' ? 'text-white' : 'text-[var(--text-muted)]'}`}
          >
            <span className="w-4 h-4 border border-[var(--border-color)] rounded" />
            ALL_NODES ({lockers.length})
          </button>
          <button 
            onClick={() => setFilter('available')}
            className={`flex items-center gap-2 text-sm font-mono transition-colors ${filter === 'available' ? 'text-[var(--circuit-green)]' : 'text-[var(--text-muted)]'}`}
          >
            <span className="w-4 h-4 border-2 border-[var(--circuit-green)] rounded" />
            [OPEN_CIRCUIT] ({stats.available})
          </button>
          <button 
            onClick={() => setFilter('occupied')}
            className={`flex items-center gap-2 text-sm font-mono transition-colors ${filter === 'occupied' ? 'text-[var(--text-secondary)]' : 'text-[var(--text-muted)]'}`}
          >
            <span className="w-4 h-4 bg-[var(--deep-navy-lighter)] border border-[var(--border-color)] rounded" />
            [LOCKED] ({stats.occupied})
          </button>
          <button 
            onClick={() => setFilter('maintenance')}
            className={`flex items-center gap-2 text-sm font-mono transition-colors ${filter === 'maintenance' ? 'text-[var(--warning-yellow)]' : 'text-[var(--text-muted)]'}`}
          >
            <span className="w-4 h-4 border-2 border-[var(--warning-yellow)] rounded" />
            [SYS_WARN] ({stats.maintenance})
          </button>
          <div className="flex items-center gap-2 text-sm font-mono text-white">
            <span className="w-4 h-4 border-2 border-white rounded animate-pulse" />
            [CURRENT_SESSION]
          </div>
        </div>
      </TerminalWindow>

      {/* Grid Matrix */}
      <TerminalWindow title="NODE_MATRIX // BLOCK_A">
        {/* Row Labels */}
        <div className="mb-4 flex items-center gap-4">
          <span className="text-xs font-mono text-[var(--text-muted)]">BLOCK_ID: A</span>
          <span className="text-xs font-mono text-[var(--text-muted)]">|</span>
          <span className="text-xs font-mono text-[var(--text-muted)]">TOTAL_NODES: 50</span>
          <span className="text-xs font-mono text-[var(--text-muted)]">|</span>
          <span className="text-xs font-mono text-[var(--circuit-green)]">
            AVAILABLE: {stats.available}
          </span>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-10 gap-2">
          {filteredLockers.map((locker) => (
            <LockerCell
              key={locker.id}
              locker={locker}
              onClick={() => setSelectedLocker(locker)}
            />
          ))}
        </div>

        {/* Grid Footer */}
        <div className="mt-4 pt-4 border-t border-[var(--border-color)] flex justify-between items-center">
          <p className="text-xs font-mono text-[var(--text-muted)]">
            CLICK_NODE_FOR_DETAILS
          </p>
          <p className="text-xs font-mono text-[var(--text-muted)]">
            LAST_SYNC: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </TerminalWindow>

      {/* Modal */}
      {selectedLocker && (
        <LockerModal
          locker={selectedLocker}
          onClose={() => setSelectedLocker(null)}
          onRent={() => {
            // Navigate to payment
            window.location.href = `/dashboard/payments/checkout?locker=${selectedLocker.id}`;
          }}
        />
      )}
    </div>
  );
}
