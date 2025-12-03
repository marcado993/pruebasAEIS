'use client';

import React, { useState, useEffect } from 'react';
import { TerminalWindow, Button, Input } from '@/components/ui';

export default function CreateBlockPage() {
  const [blockName, setBlockName] = useState('');
  const [rows, setRows] = useState(5);
  const [columns, setColumns] = useState(10);
  const [lockerSize, setLockerSize] = useState<'small' | 'medium' | 'large'>('medium');

  // Real-time wireframe preview
  const [previewGrid, setPreviewGrid] = useState<string[][]>([]);

  useEffect(() => {
    const grid: string[][] = [];
    for (let r = 0; r < rows; r++) {
      const row: string[] = [];
      for (let c = 0; c < columns; c++) {
        row.push(`${String.fromCharCode(65 + r)}-${(c + 1).toString().padStart(2, '0')}`);
      }
      grid.push(row);
    }
    setPreviewGrid(grid);
  }, [rows, columns]);

  const handleCreate = async () => {
    // Simulate creation
    alert(`Block ${blockName} created with ${rows * columns} nodes!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-mono text-[var(--circuit-green)] mb-1">
          &gt; BLUEPRINT_MODE
        </h1>
        <p className="text-sm font-mono text-[var(--text-muted)]">
          NODE_MATRIX_CONSTRUCTOR // DEFINE_GRID_PARAMETERS
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration Panel */}
        <TerminalWindow title="CONFIGURATION_PARAMETERS">
          <div className="space-y-6">
            {/* Block Name */}
            <Input
              label="BLOCK_IDENTIFIER"
              placeholder="BLOCK_A"
              value={blockName}
              onChange={(e) => setBlockName(e.target.value.toUpperCase())}
            />

            {/* Grid Dimensions */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[var(--text-secondary)] text-sm mb-2 font-mono">
                  <span className="text-[var(--circuit-green)]">&gt;</span> ROW_COUNT
                </label>
                <input
                  type="number"
                  min={1}
                  max={26}
                  value={rows}
                  onChange={(e) => setRows(Math.min(26, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] text-white font-mono px-4 py-3 rounded focus:outline-none focus:border-[var(--circuit-green)]"
                />
              </div>
              <div>
                <label className="block text-[var(--text-secondary)] text-sm mb-2 font-mono">
                  <span className="text-[var(--circuit-green)]">&gt;</span> COLUMN_COUNT
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={columns}
                  onChange={(e) => setColumns(Math.min(20, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] text-white font-mono px-4 py-3 rounded focus:outline-none focus:border-[var(--circuit-green)]"
                />
              </div>
            </div>

            {/* Locker Size */}
            <div>
              <label className="block text-[var(--text-secondary)] text-sm mb-2 font-mono">
                <span className="text-[var(--circuit-green)]">&gt;</span> NODE_SIZE_CLASS
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['small', 'medium', 'large'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setLockerSize(size)}
                    className={`
                      px-4 py-3 rounded font-mono text-sm border transition-all
                      ${lockerSize === size
                        ? 'border-[var(--circuit-green)] text-[var(--circuit-green)] bg-[var(--circuit-green)] bg-opacity-10'
                        : 'border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--circuit-green)]'}
                    `}
                  >
                    {size.toUpperCase()}
                  </button>
                ))}
              </div>
              <p className="text-xs font-mono text-[var(--text-muted)] mt-2">
                DIMENSIONS: {lockerSize === 'small' ? '30x30x50' : lockerSize === 'medium' ? '40x40x60' : '50x50x80'} cm
              </p>
            </div>

            {/* Summary */}
            <div className="p-4 bg-[var(--deep-navy)] rounded border border-[var(--border-color)]">
              <p className="text-sm font-mono text-[var(--text-muted)] mb-2">BLUEPRINT_SUMMARY:</p>
              <div className="grid grid-cols-2 gap-2 text-sm font-mono">
                <span className="text-[var(--text-muted)]">TOTAL_NODES:</span>
                <span className="text-[var(--circuit-green)]">{rows * columns}</span>
                <span className="text-[var(--text-muted)]">GRID_SIZE:</span>
                <span className="text-white">{rows} × {columns}</span>
                <span className="text-[var(--text-muted)]">NODE_TYPE:</span>
                <span className="text-white">{lockerSize.toUpperCase()}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button className="flex-1" onClick={handleCreate} glowing>
                DEPLOY_BLUEPRINT
              </Button>
              <Button variant="ghost" onClick={() => window.history.back()}>
                CANCEL
              </Button>
            </div>
          </div>
        </TerminalWindow>

        {/* Wireframe Preview */}
        <TerminalWindow title="WIREFRAME_RENDER // REAL_TIME">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[var(--text-muted)]">PREVIEW_MODE: ACTIVE</span>
              <span className="text-[var(--circuit-green)]">SCALE: 1:10</span>
            </div>

            {/* Grid Wireframe */}
            <div className="overflow-auto max-h-96 p-4 bg-[var(--deep-navy)] rounded border border-[var(--border-color)]">
              <div 
                className="grid gap-1"
                style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
              >
                {previewGrid.flat().map((nodeId, index) => (
                  <div
                    key={index}
                    className="aspect-square border border-[var(--circuit-green)] border-opacity-50 rounded flex items-center justify-center text-[8px] font-mono text-[var(--circuit-green)] opacity-70 hover:opacity-100 hover:border-opacity-100 transition-all"
                    style={{ minWidth: '24px' }}
                  >
                    {nodeId}
                  </div>
                ))}
              </div>
            </div>

            {/* Grid Info */}
            <div className="text-xs font-mono text-[var(--text-muted)] space-y-1">
              <p>ROW_LABELS: A-{String.fromCharCode(64 + rows)}</p>
              <p>COL_LABELS: 01-{columns.toString().padStart(2, '0')}</p>
              <p>RENDER_STATUS: <span className="text-[var(--circuit-green)]">OK</span></p>
            </div>
          </div>
        </TerminalWindow>
      </div>
    </div>
  );
}
