'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { TerminalWindow, Button, Logo } from '@/components/ui';

function PaymentResultContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status') || 'success';
  const lockerId = searchParams.get('locker') || 'A-05';
  
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 500);
  }, []);

  const isSuccess = status === 'success';

  const transactionDetails = {
    id: 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    timestamp: new Date().toISOString(),
    amount: '$174.00 MXN',
    method: 'VISA ****4242',
    lockerId,
    accessCode: Math.random().toString().substr(2, 6),
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Animated Logo */}
        <div className={`flex justify-center mb-8 transition-all duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          <div className={isSuccess ? 'animate-glow' : ''}>
            <Logo size="xl" animated={isSuccess} />
          </div>
        </div>

        <TerminalWindow title={isSuccess ? 'TRANSACTION_LOG // SUCCESS' : 'TRANSACTION_LOG // FAILED'}>
          {/* Status Animation */}
          <div className={`text-center py-8 transition-all duration-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {isSuccess ? (
              <>
                {/* Success Animation */}
                <div className="w-24 h-24 mx-auto mb-6 relative">
                  <div className="absolute inset-0 border-4 border-[var(--circuit-green)] rounded-full animate-ping opacity-20" />
                  <div className="absolute inset-0 border-4 border-[var(--circuit-green)] rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-[var(--circuit-green)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>

                <h2 className="text-2xl font-mono text-[var(--circuit-green)] mb-2">
                  [PACKET_RECEIVED]
                </h2>
                <p className="text-lg font-mono text-white mb-1">
                  ACCESS AUTHORIZED
                </p>
                <p className="text-sm font-mono text-[var(--text-muted)]">
                  Transaction completed successfully
                </p>
              </>
            ) : (
              <>
                {/* Failure Animation */}
                <div className="w-24 h-24 mx-auto mb-6 relative animate-pulse">
                  <div className="absolute inset-0 border-4 border-[var(--error-red)] rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-[var(--error-red)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>

                <h2 className="text-2xl font-mono text-[var(--error-red)] mb-2">
                  [CONNECTION_RESET]
                </h2>
                <p className="text-lg font-mono text-white mb-1">
                  TRANSACTION FAILED
                </p>
                <p className="text-sm font-mono text-[var(--text-muted)]">
                  Payment could not be processed
                </p>
              </>
            )}
          </div>

          {/* Transaction Details */}
          {isSuccess && showContent && (
            <div className="border-t border-[var(--border-color)] pt-6 space-y-3">
              <h3 className="text-sm font-mono text-[var(--text-secondary)] mb-4">
                <span className="text-[var(--circuit-green)]">&gt;</span> TRANSACTION_DETAILS
              </h3>

              <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                <div>
                  <p className="text-[var(--text-muted)]">TRANSACTION_ID:</p>
                  <p className="text-[var(--circuit-green)]">{transactionDetails.id}</p>
                </div>
                <div>
                  <p className="text-[var(--text-muted)]">TIMESTAMP:</p>
                  <p className="text-white">{new Date().toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[var(--text-muted)]">AMOUNT:</p>
                  <p className="text-white">{transactionDetails.amount}</p>
                </div>
                <div>
                  <p className="text-[var(--text-muted)]">METHOD:</p>
                  <p className="text-white">{transactionDetails.method}</p>
                </div>
              </div>

              {/* Access Code - Highlighted */}
              <div className="mt-6 p-4 bg-[var(--deep-navy)] rounded border-2 border-[var(--circuit-green)] text-center">
                <p className="text-xs font-mono text-[var(--text-muted)] mb-2">
                  YOUR_ACCESS_CODE:
                </p>
                <p className="text-3xl font-mono font-bold text-[var(--circuit-green)] tracking-widest">
                  {transactionDetails.accessCode}
                </p>
                <p className="text-xs font-mono text-[var(--text-muted)] mt-2">
                  SAVE_THIS_CODE_FOR_LOCKER_ACCESS
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            {isSuccess ? (
              <>
                <Button className="flex-1" onClick={() => window.location.href = '/dashboard/my-locker'}>
                  VIEW_MY_NODE
                </Button>
                <Button variant="ghost" className="flex-1" onClick={() => window.print()}>
                  PRINT_RECEIPT
                </Button>
              </>
            ) : (
              <>
                <Button className="flex-1" onClick={() => window.location.href = '/dashboard/payments/checkout'}>
                  RETRY_TRANSACTION
                </Button>
                <Button variant="ghost" className="flex-1" onClick={() => window.location.href = '/dashboard'}>
                  RETURN_TO_HUB
                </Button>
              </>
            )}
          </div>

          {/* Terminal Footer */}
          <div className="mt-6 pt-4 border-t border-[var(--border-color)]">
            <p className="text-xs font-mono text-[var(--text-muted)] text-center">
              {isSuccess 
                ? '> TRANSACTION_COMPLETE. THANK_YOU_FOR_USING_AEIS_MAINFRAME.'
                : '> ERROR_LOG_SAVED. CONTACT_SUPPORT_IF_ISSUE_PERSISTS.'}
              <span className="cursor animate-blink ml-1" />
            </p>
          </div>
        </TerminalWindow>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="h-96 bg-[var(--deep-navy-light)] rounded animate-pulse" />
      </div>
    </div>
  );
}

export default function PaymentResultPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PaymentResultContent />
    </Suspense>
  );
}
