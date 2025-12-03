'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--deep-navy)]">
      <Sidebar 
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      
      {/* Main content - adjusts based on sidebar state */}
      <main 
        className={`
          min-h-screen transition-all duration-300 ease-in-out
          lg:ml-72
          ${isCollapsed ? 'lg:ml-20' : 'lg:ml-72'}
        `}
      >
        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-[var(--deep-navy)]/95 backdrop-blur-md border-b border-[var(--border-color)]">
          <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 text-[var(--text-muted)] hover:text-[var(--circuit-green)] hover:bg-[var(--deep-navy-light)] rounded-lg transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm font-mono flex-1">
              <span className="text-[var(--circuit-green)]">$</span>
              <span className="text-[var(--text-muted)] hidden sm:inline">~/aeis</span>
              <span className="text-[var(--text-secondary)]">/dashboard</span>
              <span className="w-2 h-5 bg-[var(--circuit-green)] animate-pulse" />
            </div>

            {/* Right side info */}
            <div className="flex items-center gap-4">
              <div className="text-xs font-mono text-[var(--text-muted)] hidden md:block">
                SESSION_TIME: <span className="text-[var(--circuit-green)]">00:45:32</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[var(--circuit-green)] rounded-full animate-pulse" />
                <span className="text-xs font-mono text-[var(--text-secondary)] hidden sm:inline">CONNECTED</span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Content area */}
        <div className="p-4 sm:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
