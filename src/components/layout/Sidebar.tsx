'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/ui';

interface NavItem {
  href: string;
  label: string;
  icon: string;
  permission?: string;
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'COMMAND_CENTER', icon: '⌂' },
  { href: '/dashboard/lockers', label: 'GRID_VIEW', icon: '▦' },
  { href: '/dashboard/my-locker', label: 'MY_NODE', icon: '◉' },
  { href: '/dashboard/payments', label: 'ASSET_TRANSFER', icon: '⟐' },
  { href: '/dashboard/reports', label: 'DATA_DUMP', icon: '≡' },
  { href: '/dashboard/admin', label: 'ADMIN_CONSOLE', icon: '⚙', permission: 'ROOT' },
];

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (value: boolean) => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-full z-50
          bg-[#050d18] border-r border-[var(--border-color)]
          transition-all duration-300 ease-in-out
          
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          ${isCollapsed ? 'lg:w-20' : 'lg:w-72'}
          w-72
        `}
      >
        {/* Header */}
        <div className="h-16 px-4 border-b border-[var(--border-color)] flex items-center justify-between">
          <div className={`transition-opacity duration-200 ${isCollapsed ? 'lg:opacity-0 lg:w-0 lg:overflow-hidden' : 'opacity-100'}`}>
            <Logo size="sm" animated={false} showText={true} />
          </div>
          
          {/* Collapsed logo */}
          {isCollapsed && (
            <div className="hidden lg:block">
              <Logo size="sm" animated={false} showText={false} />
            </div>
          )}
          
          {/* Desktop collapse button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-2 text-[var(--text-muted)] hover:text-[var(--circuit-green)] hover:bg-[var(--deep-navy-light)] rounded-lg transition-all"
            title={isCollapsed ? 'Expandir' : 'Colapsar'}
          >
            <svg 
              className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>

          {/* Mobile close button */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-2 text-[var(--text-muted)] hover:text-[var(--circuit-green)] transition-colors"
          >
            ✕
          </button>
        </div>

        {/* System Status */}
        <div className={`
          border-b border-[var(--border-color)] overflow-hidden transition-all duration-300
          ${isCollapsed ? 'lg:h-0 lg:opacity-0 lg:p-0 lg:border-0' : 'h-auto opacity-100 p-4'}
        `}>
          <div className="text-xs text-[var(--text-muted)] font-mono space-y-1">
            <p>SYSTEM_STATUS: <span className="text-[var(--circuit-green)]">ONLINE</span></p>
            <p>ACCESS_LEVEL: <span className="text-[var(--warning-yellow)]">USER</span></p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
          <div className={`
            text-xs text-[var(--text-muted)] font-mono mb-3 transition-all duration-200
            ${isCollapsed ? 'lg:text-center lg:px-0' : 'px-3'}
          `}>
            {isCollapsed ? <span className="hidden lg:inline">—</span> : null}
            <span className={isCollapsed ? 'lg:hidden' : ''}>NAV_ROOT:</span>
          </div>
          
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/dashboard' && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-3 rounded-lg
                  font-mono text-sm transition-all duration-200
                  relative group
                  ${isCollapsed ? 'lg:justify-center lg:px-2' : ''}
                  ${isActive
                    ? 'bg-[var(--circuit-green)]/10 text-[var(--circuit-green)] border border-[var(--circuit-green)]/30'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--deep-navy-light)] hover:text-[var(--circuit-green)] border border-transparent'
                  }
                `}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[var(--circuit-green)] rounded-r shadow-[0_0_10px_var(--circuit-green)]" />
                )}
                
                <span className={`text-xl ${isCollapsed ? 'lg:text-2xl' : ''}`}>
                  {item.icon}
                </span>
                
                <span className={`flex-1 transition-all duration-200 ${isCollapsed ? 'lg:hidden' : ''}`}>
                  {item.label}
                </span>
                
                {item.permission && !isCollapsed && (
                  <span className="text-xs px-1.5 py-0.5 bg-[var(--error-red)]/20 text-[var(--error-red)] rounded lg:block hidden">
                    {item.permission}
                  </span>
                )}
                {item.permission && (
                  <span className="text-xs px-1.5 py-0.5 bg-[var(--error-red)]/20 text-[var(--error-red)] rounded lg:hidden">
                    {item.permission}
                  </span>
                )}

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <span className="
                    hidden lg:block
                    absolute left-full ml-3 px-3 py-2
                    bg-[var(--deep-navy)] text-[var(--circuit-green)]
                    text-sm rounded-lg whitespace-nowrap
                    opacity-0 group-hover:opacity-100
                    transition-opacity pointer-events-none
                    border border-[var(--circuit-green)]/30
                    shadow-lg shadow-[var(--circuit-green)]/10
                    z-50
                  ">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-[var(--border-color)]">
          <Link
            href="/auth/login"
            className={`
              flex items-center gap-3 px-3 py-3 rounded-lg
              font-mono text-sm text-[var(--error-red)] 
              hover:bg-[var(--error-red)]/10 transition-all
              ${isCollapsed ? 'lg:justify-center lg:px-2' : ''}
            `}
          >
            <span className="text-xl">⏻</span>
            <span className={isCollapsed ? 'lg:hidden' : ''}>LOGOUT</span>
          </Link>
          
          <p className={`
            text-xs text-[var(--text-muted)] font-mono mt-3 px-3 transition-all duration-200
            ${isCollapsed ? 'lg:hidden' : ''}
          `}>
            v1.0.0 | 2024
          </p>
        </div>
      </aside>
    </>
  );
}
