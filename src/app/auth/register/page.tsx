'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TerminalWindow, Button, Input, Logo, PasswordStrength, StatusBadge } from '@/components/ui';

export default function RegisterPage() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);

  const bootSequence = [
    '> INITIALIZING_USER_INJECTION_PROTOCOL...',
    '> LOADING_BIOS_INTERFACE...',
    '> PREPARING_DATABASE_CONNECTION...',
    '> READY_FOR_DATA_INPUT...',
  ];

  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (currentLine < bootSequence.length) {
      const timer = setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setShowForm(true), 400);
    }
  }, [currentLine]);

  const processingSteps = [
    'VALIDATING_INPUT_DATA...',
    'ENCRYPTING_CREDENTIALS...',
    'GENERATING_USER_HASH...',
    'INJECTING_TO_DATABASE...',
    'USER_CREATION_COMPLETE',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      setError('PASSWORD_MISMATCH');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('PASSWORD_TOO_SHORT');
      setLoading(false);
      return;
    }

    // Simulación de proceso de registro con pasos
    for (let i = 0; i < processingSteps.length; i++) {
      setProcessingStep(i);
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    setSuccess(true);
    setTimeout(() => {
      router.push('/auth/login');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--deep-navy)] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 circuit-pattern opacity-5" />
      <div className="absolute inset-0 scanline pointer-events-none" />

      <div className="w-full max-w-lg relative z-10">
        {/* Logo animado */}
        <div className="flex justify-center mb-6">
          <div className={`${loading ? 'animate-pulse-glow' : ''}`}>
            <Logo size="lg" animated={loading} />
          </div>
        </div>

        <TerminalWindow title="USER_INJECTION // BIOS_INTERFACE">
          {/* Boot sequence */}
          <div className="mb-4 space-y-1">
            {bootSequence.slice(0, currentLine).map((line, index) => (
              <p key={index} className="text-xs font-mono text-[var(--circuit-green)] opacity-60">
                {line}
              </p>
            ))}
          </div>

          {/* Registration Form */}
          {showForm && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="border-t border-[var(--border-color)] pt-4">
                <h2 className="text-base font-mono text-[var(--circuit-green)] mb-4">
                  <span className="text-[var(--text-muted)]">&gt;</span> NEW_USER_REGISTRATION
                </h2>

                {/* Form fields in BIOS style */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="FULL_NAME"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={loading || success}
                    />
                    <Input
                      label="STUDENT_ID"
                      name="studentId"
                      placeholder="A01234567"
                      value={formData.studentId}
                      onChange={handleChange}
                      disabled={loading || success}
                    />
                  </div>

                  <Input
                    label="EMAIL_ADDRESS"
                    name="email"
                    type="email"
                    placeholder="user@aeis.edu.mx"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading || success}
                  />

                  <Input
                    label="ACCESS_KEY"
                    name="password"
                    type="password"
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading || success}
                  />

                  {/* Password Strength Meter */}
                  {formData.password && (
                    <div className="px-1">
                      <PasswordStrength password={formData.password} />
                    </div>
                  )}

                  <Input
                    label="CONFIRM_KEY"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={loading || success}
                  />
                </div>

                {/* Processing Steps */}
                {loading && !success && (
                  <div className="mt-4 p-3 bg-[var(--deep-navy)] rounded border border-[var(--border-color)]">
                    <p className="text-xs text-[var(--text-muted)] mb-2 font-mono">
                      PROCESSING_STATUS:
                    </p>
                    {processingSteps.slice(0, processingStep + 1).map((step, index) => (
                      <p
                        key={index}
                        className={`text-xs font-mono ${
                          index === processingStep
                            ? 'text-[var(--circuit-green)]'
                            : 'text-[var(--text-muted)]'
                        }`}
                      >
                        {index === processingStep && '> '}
                        [{index < processingStep ? 'DONE' : index === processingStep ? 'RUNNING' : 'PENDING'}] {step}
                      </p>
                    ))}
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="mt-4">
                    <StatusBadge status="error" message={error} />
                  </div>
                )}

                {/* Success Message */}
                {success && (
                  <div className="mt-4">
                    <StatusBadge status="success" message="USER_CREATED_SUCCESSFULLY" />
                    <p className="text-xs text-[var(--text-muted)] mt-2 font-mono">
                      REDIRECTING_TO_LOGIN...
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="mt-6">
                  <Button
                    type="submit"
                    className="w-full"
                    loading={loading}
                    disabled={loading || success}
                  >
                    {loading
                      ? 'PROCESSING...'
                      : success
                      ? 'USER_INJECTED'
                      : 'INJECT_USER'}
                  </Button>
                </div>

                {/* Link to login */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-[var(--text-muted)] font-mono">
                    <span className="text-[var(--circuit-green)]">&gt;</span>{' '}
                    <a
                      href="/auth/login"
                      className="text-[var(--text-secondary)] hover:text-[var(--circuit-green)] transition-colors"
                    >
                      EXISTING_USER? LOGIN_HERE
                    </a>
                  </p>
                </div>
              </div>
            </form>
          )}
        </TerminalWindow>

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="text-xs text-[var(--text-muted)] font-mono">
            AEIS_MAINFRAME v1.0.0 | DATA_ENCRYPTION: AES-256
          </p>
        </div>
      </div>
    </div>
  );
}
