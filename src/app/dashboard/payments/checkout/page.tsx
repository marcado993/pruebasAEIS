'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { TerminalWindow, Button, Input, StatusBadge } from '@/components/ui';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const lockerId = searchParams.get('locker') || 'A-05';
  
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState(0);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const processingSteps = [
    'INITIATING_SECURE_TUNNEL...',
    'ENCRYPTING_PAYLOAD...',
    'CONNECTING_TO_PAYMENT_GATEWAY...',
    'VALIDATING_CREDENTIALS...',
    'PROCESSING_TRANSACTION...',
    'AWAITING_CONFIRMATION...',
  ];

  const orderDetails = {
    lockerId,
    block: 'BLOCK_A',
    size: 'Medium (40x40x60 cm)',
    period: 'Semester (6 months)',
    price: 150.00,
    tax: 24.00,
    total: 174.00,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    for (let i = 0; i < processingSteps.length; i++) {
      setStep(i);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Redirect to result page
    window.location.href = `/dashboard/payments/result?status=success&locker=${lockerId}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-mono text-[var(--circuit-green)] mb-1">
          &gt; ASSET_TRANSFER
        </h1>
        <p className="text-sm font-mono text-[var(--text-muted)]">
          SECURE_TUNNEL // PAYMENT_PROTOCOL
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Form */}
        <div className="lg:col-span-2">
          <TerminalWindow title="SECURE_PAYMENT_GATEWAY">
            {!processing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Security Notice */}
                <div className="flex items-center gap-3 p-3 bg-[var(--deep-navy)] rounded border border-[var(--circuit-green)]">
                  <span className="text-2xl">🔒</span>
                  <div>
                    <p className="text-sm font-mono text-[var(--circuit-green)]">
                      ENCRYPTED_CONNECTION
                    </p>
                    <p className="text-xs font-mono text-[var(--text-muted)]">
                      256-bit SSL encryption active
                    </p>
                  </div>
                </div>

                {/* Card Details */}
                <div className="space-y-4">
                  <h3 className="text-sm font-mono text-[var(--text-secondary)]">
                    <span className="text-[var(--circuit-green)]">&gt;</span> PAYMENT_CREDENTIALS
                  </h3>

                  <Input
                    label="CARD_NUMBER"
                    placeholder="4242 4242 4242 4242"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim())}
                    maxLength={19}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="EXPIRY_DATE"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      maxLength={5}
                    />
                    <Input
                      label="SECURITY_CODE"
                      placeholder="CVV"
                      type="password"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      maxLength={4}
                    />
                  </div>
                </div>

                {/* Billing Address */}
                <div className="space-y-4">
                  <h3 className="text-sm font-mono text-[var(--text-secondary)]">
                    <span className="text-[var(--circuit-green)]">&gt;</span> BILLING_DATA
                  </h3>

                  <Input
                    label="CARDHOLDER_NAME"
                    placeholder="JOHN DOE"
                  />

                  <Input
                    label="BILLING_EMAIL"
                    type="email"
                    placeholder="user@aeis.edu.mx"
                  />
                </div>

                {/* Submit */}
                <div className="pt-4 border-t border-[var(--border-color)]">
                  <Button type="submit" className="w-full" glowing>
                    INITIATE_TRANSFER // ${orderDetails.total.toFixed(2)} MXN
                  </Button>
                  <p className="text-xs text-center font-mono text-[var(--text-muted)] mt-3">
                    By proceeding, you accept our Terms of Service
                  </p>
                </div>
              </form>
            ) : (
              /* Processing Animation */
              <div className="py-8">
                <div className="flex justify-center mb-8">
                  <div className="w-20 h-20 border-4 border-[var(--circuit-green)] border-t-transparent rounded-full animate-spin" />
                </div>

                <div className="space-y-2 font-mono text-sm">
                  {processingSteps.slice(0, step + 1).map((stepText, index) => (
                    <p
                      key={index}
                      className={`
                        ${index === step ? 'text-[var(--circuit-green)]' : 'text-[var(--text-muted)]'}
                      `}
                    >
                      {index === step ? '> ' : '  '}
                      [{index < step ? 'DONE' : index === step ? 'RUNNING' : 'PENDING'}] {stepText}
                    </p>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <p className="text-xs font-mono text-[var(--text-muted)]">
                    DO_NOT_CLOSE_THIS_WINDOW
                  </p>
                </div>
              </div>
            )}
          </TerminalWindow>
        </div>

        {/* Order Summary */}
        <div>
          <TerminalWindow title="ORDER_MANIFEST">
            <div className="space-y-4 font-mono text-sm">
              {/* Node Preview */}
              <div className="flex justify-center py-4">
                <div className="w-16 h-20 border-2 border-[var(--circuit-green)] rounded flex items-center justify-center">
                  <span className="text-[var(--circuit-green)]">{orderDetails.lockerId}</span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-[var(--border-color)]">
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">NODE_ID:</span>
                  <span className="text-[var(--circuit-green)]">{orderDetails.lockerId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">BLOCK:</span>
                  <span className="text-white">{orderDetails.block}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">SIZE:</span>
                  <span className="text-white">{orderDetails.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">PERIOD:</span>
                  <span className="text-white">{orderDetails.period}</span>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-[var(--border-color)]">
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">SUBTOTAL:</span>
                  <span className="text-white">${orderDetails.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">TAX (16%):</span>
                  <span className="text-white">${orderDetails.tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--circuit-green)]">
                <div className="flex justify-between text-lg">
                  <span className="text-[var(--circuit-green)]">TOTAL:</span>
                  <span className="text-[var(--circuit-green)] font-bold">
                    ${orderDetails.total.toFixed(2)} MXN
                  </span>
                </div>
              </div>
            </div>
          </TerminalWindow>

          {/* Security Badges */}
          <div className="mt-4 p-4 border border-[var(--border-color)] rounded-lg">
            <div className="flex items-center justify-center gap-4 text-[var(--text-muted)]">
              <span className="text-2xl">🔐</span>
              <span className="text-2xl">💳</span>
              <span className="text-2xl">✓</span>
            </div>
            <p className="text-xs font-mono text-center text-[var(--text-muted)] mt-2">
              SECURE_PAYMENT_VERIFIED
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="space-y-6">
      <div className="h-8 bg-[var(--deep-navy-light)] rounded animate-pulse" />
      <div className="h-64 bg-[var(--deep-navy-light)] rounded animate-pulse" />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CheckoutContent />
    </Suspense>
  );
}
