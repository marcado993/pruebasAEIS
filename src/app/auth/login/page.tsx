'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TerminalWindow, Button, Input, Logo, StatusBadge } from '@/components/ui';

export default function LoginPage() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [particles, setParticles] = useState<Array<{ left: string; top: string; delay: string; duration: string }>>([]);

  const bootSequence = [
    '> SYSTEM_BOOT_SEQUENCE_INIT...',
    '> DETECTING_HARDWARE... [AEIS_CORE]',
    '> LOADING_SECURITY_PROTOCOLS...',
    '> INITIALIZING_AUTH_MODULE...',
    '> ACCESS_LEVEL: GUEST',
    '> AWAITING_CREDENTIALS...',
  ];

  const [currentLine, setCurrentLine] = useState(0);

  // Generar partículas solo en cliente
  useEffect(() => {
    const newParticles = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
      duration: `${3 + Math.random() * 4}s`,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    if (currentLine < bootSequence.length) {
      const timer = setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setShowForm(true), 500);
    }
  }, [currentLine, bootSequence.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulación de autenticación
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (email && password) {
      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } else {
      setError('INVALID_CREDENTIALS');
      setLoading(false);
    }
  };

  // Colores locales
  const colors = {
    deepNavy: '#0A192F',
    circuitGreen: '#00FF9D',
    circuitGreenGlow: 'rgba(0, 255, 157, 0.3)',
    borderColor: '#233554',
    textMuted: '#495670',
  };

  // Keyframes locales
  const keyframesStyle = `
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes scanline {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(100vh); }
    }
  `;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div 
        className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden"
        style={{ background: colors.deepNavy }}
      >
        {/* Background circuit pattern */}
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${colors.borderColor} 1px, transparent 1px), linear-gradient(90deg, ${colors.borderColor} 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />
        
        {/* Scanline effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute left-0 right-0 h-1"
            style={{
              background: `linear-gradient(to bottom, transparent, ${colors.circuitGreenGlow}, transparent)`,
              animation: 'scanline 8s linear infinite',
            }}
          />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full opacity-30"
              style={{
                background: colors.circuitGreen,
                left: particle.left,
                top: particle.top,
                animation: `float ${particle.duration} ease-in-out infinite`,
                animationDelay: particle.delay,
              }}
            />
          ))}
        </div>

        <div className="w-full max-w-lg relative z-10">
          {/* Logo */}
          <div className="flex justify-center mb-10 sm:mb-12">
            <Logo size="xl" animated={true} />
          </div>

          <TerminalWindow title="SECURE_SHELL // AUTH_GATEWAY">
            {/* Boot sequence */}
            <div className="mb-8 space-y-1.5">
              {bootSequence.slice(0, currentLine).map((line, index) => (
                <p
                  key={index}
                  className="text-xs sm:text-sm font-mono text-[var(--circuit-green)] opacity-70"
                >
                  {line}
                </p>
              ))}
              {currentLine < bootSequence.length && (
                <span className="cursor animate-blink" />
              )}
            </div>

            {/* Login Form */}
            {showForm && (
              <form 
                onSubmit={handleSubmit} 
                className="space-y-8"
                style={{ animation: 'fadeIn 0.4s ease-out' }}
              >
                <div className="border-t border-[var(--border-color)] pt-8">
                  <h2 className="text-lg sm:text-xl font-mono text-[var(--circuit-green)] mb-8">
                    <span className="text-[var(--text-muted)]">&gt;</span> AUTHENTICATION_REQUIRED
                  </h2>

                  <div className="space-y-6">
                    <Input
                      label="USER_ID"
                      type="email"
                      placeholder="user@aeis.edu.mx"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading || success}
                      inputSize="lg"
                    />

                    <Input
                      label="ACCESS_KEY"
                      type="password"
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading || success}
                      inputSize="lg"
                    />
                  </div>

                  {/* Status Messages */}
                  {error && (
                    <div className="mt-6">
                      <StatusBadge status="error" message={error} />
                    </div>
                  )}

                  {success && (
                    <div className="mt-6">
                      <StatusBadge status="success" message="ACCESS_GRANTED" />
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="mt-8">
                    <Button
                      type="submit"
                      className="w-full"
                      loading={loading}
                      disabled={loading || success}
                      glowing={!loading && !success}
                      size="lg"
                    >
                      {loading ? 'AUTHENTICATING...' : success ? 'REDIRECTING...' : 'INITIATE_LOGIN'}
                    </Button>
                  </div>

                  {/* Links */}
                  <div className="mt-8 pt-6 border-t border-[var(--border-color)] text-center space-y-3">
                    <p className="text-sm text-[var(--text-muted)] font-mono">
                      <span className="text-[var(--circuit-green)]">&gt;</span>{' '}
                      <a
                        href="/auth/register"
                        className="text-[var(--text-secondary)] hover:text-[var(--circuit-green)] transition-colors"
                      >
                        NEW_USER? REGISTER_HERE
                      </a>
                    </p>
                    <p className="text-sm text-[var(--text-muted)] font-mono">
                      <span className="text-[var(--circuit-green)]">&gt;</span>{' '}
                      <a
                        href="/auth/forgot-password"
                        className="text-[var(--text-secondary)] hover:text-[var(--circuit-green)] transition-colors"
                      >
                        FORGOT_CREDENTIALS?
                      </a>
                    </p>
                  </div>
                </div>
              </form>
            )}
          </TerminalWindow>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs sm:text-sm text-[var(--text-muted)] font-mono">
              AEIS_MAINFRAME v1.0.0 | SECURE_CONNECTION_ESTABLISHED
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
