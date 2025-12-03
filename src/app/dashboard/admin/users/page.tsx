'use client';

import React, { useState } from 'react';
import { TerminalWindow, Button, Input, StatusBadge } from '@/components/ui';

interface User {
  id: string;
  name: string;
  email: string;
  studentId: string;
  status: 'active' | 'inactive' | 'suspended';
  locker?: string;
  role: 'user' | 'admin' | 'root';
}

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchResults, setSearchResults] = useState<User[]>([]);

  // Sample users data
  const allUsers: User[] = [
    { id: '001', name: 'Juan Pérez', email: 'juan@aeis.edu.mx', studentId: 'A01234567', status: 'active', locker: 'A-05', role: 'user' },
    { id: '002', name: 'María García', email: 'maria@aeis.edu.mx', studentId: 'A01234568', status: 'active', locker: 'B-12', role: 'user' },
    { id: '003', name: 'Carlos López', email: 'carlos@aeis.edu.mx', studentId: 'A01234569', status: 'inactive', role: 'user' },
    { id: '004', name: 'Ana Martínez', email: 'ana@aeis.edu.mx', studentId: 'A01234570', status: 'suspended', locker: 'C-03', role: 'user' },
    { id: '005', name: 'Admin User', email: 'admin@aeis.edu.mx', studentId: 'ADMIN001', status: 'active', role: 'admin' },
  ];

  const handleSearch = () => {
    const results = allUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.studentId.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-mono text-[var(--circuit-green)] mb-1">
          &gt; USER_OVERRIDE
        </h1>
        <p className="text-sm font-mono text-[var(--text-muted)]">
          MANUAL_OVERRIDE // USER_MANAGEMENT_CONSOLE
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search Panel */}
        <div className="lg:col-span-2">
          <TerminalWindow title="COMMAND_LINE_SEARCH">
            {/* Search Input */}
            <div className="flex gap-2 mb-6">
              <div className="flex-1 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--circuit-green)] font-mono">
                  SEARCH_QUERY: &gt;
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="name, email, or student_id..."
                  className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--circuit-green)] font-mono pl-40 pr-4 py-3 rounded focus:outline-none focus:border-[var(--circuit-green)] focus:shadow-[0_0_10px_var(--circuit-green-glow)]"
                />
              </div>
              <Button onClick={handleSearch}>EXECUTE</Button>
            </div>

            {/* Results */}
            {searchResults.length > 0 ? (
              <div className="space-y-2">
                <p className="text-xs font-mono text-[var(--text-muted)] mb-3">
                  FOUND: {searchResults.length} RECORD(S)
                </p>
                {searchResults.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className={`
                      w-full text-left p-3 rounded border transition-all font-mono text-sm
                      ${selectedUser?.id === user.id
                        ? 'border-[var(--circuit-green)] bg-[var(--circuit-green)] bg-opacity-10'
                        : 'border-[var(--border-color)] hover:border-[var(--circuit-green)]'}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[var(--circuit-green)]">[{user.studentId}]</span>
                        <span className="text-white ml-2">{user.name}</span>
                      </div>
                      <StatusBadge
                        status={user.status === 'active' ? 'success' : user.status === 'inactive' ? 'info' : 'error'}
                        message={user.status.toUpperCase()}
                      />
                    </div>
                    <p className="text-[var(--text-muted)] text-xs mt-1">{user.email}</p>
                  </button>
                ))}
              </div>
            ) : searchQuery ? (
              <div className="text-center py-8">
                <p className="text-[var(--text-muted)] font-mono">
                  NO_RECORDS_FOUND
                </p>
                <p className="text-xs text-[var(--text-muted)] font-mono mt-2">
                  Try a different search query
                </p>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-[var(--circuit-green)] font-mono">
                  AWAITING_QUERY...
                </p>
                <p className="text-xs text-[var(--text-muted)] font-mono mt-2">
                  Enter a search term and press EXECUTE or ENTER
                </p>
              </div>
            )}
          </TerminalWindow>
        </div>

        {/* User Details Panel */}
        <div>
          <TerminalWindow title="USER_DETAILS">
            {selectedUser ? (
              <div className="space-y-4">
                <div className="text-center pb-4 border-b border-[var(--border-color)]">
                  <div className="w-16 h-16 mx-auto bg-[var(--deep-navy-lighter)] rounded-full flex items-center justify-center mb-2">
                    <span className="text-2xl">👤</span>
                  </div>
                  <p className="font-mono text-white">{selectedUser.name}</p>
                  <p className="font-mono text-xs text-[var(--text-muted)]">{selectedUser.studentId}</p>
                </div>

                <div className="space-y-3 text-sm font-mono">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">USER_ID:</span>
                    <span className="text-[var(--circuit-green)]">#{selectedUser.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">EMAIL:</span>
                    <span className="text-white">{selectedUser.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">STATUS:</span>
                    <StatusBadge
                      status={selectedUser.status === 'active' ? 'success' : selectedUser.status === 'inactive' ? 'info' : 'error'}
                      message={selectedUser.status.toUpperCase()}
                    />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">ROLE:</span>
                    <span className="text-[var(--warning-yellow)]">{selectedUser.role.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">ASSIGNED_NODE:</span>
                    <span className="text-white">{selectedUser.locker || 'NONE'}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 space-y-2">
                  <Button className="w-full" size="sm">
                    MODIFY_USER
                  </Button>
                  <Button variant="warning" className="w-full" size="sm">
                    RESET_PASSWORD
                  </Button>
                  {selectedUser.status === 'active' ? (
                    <Button variant="danger" className="w-full" size="sm">
                      SUSPEND_USER
                    </Button>
                  ) : (
                    <Button className="w-full" size="sm">
                      ACTIVATE_USER
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-[var(--text-muted)] font-mono">
                  SELECT_USER_TO_VIEW_DETAILS
                </p>
              </div>
            )}
          </TerminalWindow>
        </div>
      </div>
    </div>
  );
}
