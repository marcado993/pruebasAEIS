'use client';

import { useEffect, useState, useRef } from 'react';
import { Logo, Button } from '@/components/ui';

// Colores locales del componente
const colors = {
  deepNavy: '#0A192F',
  deepNavyLight: '#112240',
  circuitGreen: '#00FF9D',
  circuitGreenGlow: 'rgba(0, 255, 157, 0.3)',
  borderColor: '#233554',
  cardBg: 'rgba(17, 34, 64, 0.8)',
  textPrimary: '#FFFFFF',
  textSecondary: '#8892B0',
  textMuted: '#495670',
  warningYellow: '#FFD93D',
};

// Componente TerminalWindow local
const LandingTerminal = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div 
    className="rounded-xl overflow-hidden backdrop-blur-sm"
    style={{ 
      background: colors.cardBg, 
      border: `1px solid ${colors.circuitGreen}`,
      boxShadow: `0 0 25px ${colors.circuitGreenGlow}` 
    }}
  >
    <div 
      className="px-5 py-4 flex items-center gap-3"
      style={{ background: colors.deepNavyLight, borderBottom: `1px solid ${colors.borderColor}` }}
    >
      <span className="w-3.5 h-3.5 rounded-full" style={{ background: '#FF5F56' }} />
      <span className="w-3.5 h-3.5 rounded-full" style={{ background: '#FFBD2E' }} />
      <span className="w-3.5 h-3.5 rounded-full" style={{ background: '#27C93F' }} />
      <span className="ml-4 text-sm font-mono" style={{ color: colors.textSecondary }}>{title}</span>
    </div>
    <div className="p-6 sm:p-8">{children}</div>
  </div>
);

// Componente Card local
const FeatureCard = ({ icon, title, description }: { icon: string; title: string; description: string }) => (
  <div 
    className="p-6 sm:p-8 md:p-10 rounded-2xl transition-all duration-300 hover:scale-[1.02] group"
    style={{ 
      background: colors.cardBg, 
      border: `2px solid ${colors.borderColor}`,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = colors.circuitGreen;
      e.currentTarget.style.boxShadow = `0 0 30px ${colors.circuitGreenGlow}`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = colors.borderColor;
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    <span className="text-5xl sm:text-6xl mb-5 sm:mb-6 block transition-transform group-hover:scale-110">
      {icon}
    </span>
    <h3 
      className="text-lg sm:text-xl md:text-2xl font-mono font-bold mb-4"
      style={{ color: colors.circuitGreen }}
    >
      {title}
    </h3>
    <p 
      className="text-sm sm:text-base md:text-lg font-mono leading-relaxed"
      style={{ color: colors.textSecondary }}
    >
      {description}
    </p>
  </div>
);

// Componente Stat Card
const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div 
    className="p-4 sm:p-6 md:p-7 rounded-xl transition-all duration-300"
    style={{ 
      background: colors.cardBg, 
      border: `1px solid ${colors.borderColor}`,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = colors.circuitGreen;
      e.currentTarget.style.boxShadow = `0 0 15px ${colors.circuitGreenGlow}`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = colors.borderColor;
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    <p 
      className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold mb-1"
      style={{ color: colors.circuitGreen }}
    >
      {value}
    </p>
    <p 
      className="text-xs sm:text-sm font-mono"
      style={{ color: colors.textMuted }}
    >
      {label}
    </p>
  </div>
);

// Componente Step Card
const StepCard = ({ step, title, description, showArrow }: { step: string; title: string; description: string; showArrow: boolean }) => (
  <div className="relative h-full">
    <div 
      className="p-6 sm:p-8 md:p-10 rounded-2xl transition-all duration-300 h-full"
      style={{ 
        background: colors.cardBg, 
        border: `2px solid ${colors.borderColor}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = colors.circuitGreen;
        e.currentTarget.style.boxShadow = `0 0 25px ${colors.circuitGreenGlow}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = colors.borderColor;
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div 
        className="text-6xl sm:text-7xl font-mono font-bold mb-5 sm:mb-6 opacity-30"
        style={{ color: colors.circuitGreen }}
      >
        {step}
      </div>
      <h3 
        className="text-xl sm:text-2xl font-mono font-bold mb-4"
        style={{ color: colors.textPrimary }}
      >
        {title}
      </h3>
      <p 
        className="text-sm sm:text-base md:text-lg font-mono leading-relaxed"
        style={{ color: colors.textSecondary }}
      >
        {description}
      </p>
    </div>
    {showArrow && (
      <div 
        className="hidden lg:flex absolute top-1/2 -right-6 transform -translate-y-1/2 text-4xl items-center justify-center w-12 h-12"
        style={{ color: colors.circuitGreen }}
      >
        →
      </div>
    )}
  </div>
);

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [particles, setParticles] = useState<Array<{ left: string; top: string; delay: string; duration: string }>>([]);
  const featuresRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);

  const bootLines = [
    '> SYSTEM_BOOT_SEQUENCE_INIT...',
    '> DETECTING_HARDWARE... [AEIS_CORE]',
    '> LOADING_COLOR_PROFILE: [DEEP_NAVY_#0A192F] + [CIRCUIT_GREEN_#00FF9D]',
    '> INITIALIZING_SECURITY_PROTOCOLS...',
    '> LOADING_UI_MODULES...',
    '> SYSTEM_READY.',
    '> WELCOME_TO_AEIS_LOCKER_SYSTEM...',
  ];

  const [currentLine, setCurrentLine] = useState(0);

  // Generar partículas solo en cliente
  useEffect(() => {
    const newParticles = [...Array(40)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
      duration: `${3 + Math.random() * 4}s`,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    if (currentLine < bootLines.length) {
      const timer = setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
      }, 250);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => {
        setBootComplete(true);
        setTimeout(() => setShowContent(true), 400);
      }, 400);
    }
  }, [currentLine, bootLines.length]);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    { value: '500+', label: 'CASILLEROS' },
    { value: '1200+', label: 'USUARIOS' },
    { value: '99.9%', label: 'UPTIME' },
    { value: '24/7', label: 'SOPORTE' },
  ];

  const features = [
    {
      icon: '▦',
      title: 'GRID_VISUALIZATION',
      description: 'Visualiza en tiempo real la disponibilidad de todos los casilleros en un mapa interactivo.',
    },
    {
      icon: '⟐',
      title: 'SECURE_PAYMENTS',
      description: 'Procesa pagos de forma segura con encriptación AES-256.',
    },
    {
      icon: '◉',
      title: 'REAL_TIME_TRACKING',
      description: 'Monitorea el estado de tu casillero y pagos pendientes en tiempo real.',
    },
    {
      icon: '⚡',
      title: 'INSTANT_RESERVATION',
      description: 'Reserva tu casillero en segundos con confirmación inmediata.',
    },
    {
      icon: '🔐',
      title: 'ACCESS_CONTROL',
      description: 'Sistema de autenticación multi-factor para máxima seguridad.',
    },
    {
      icon: '📊',
      title: 'ADMIN_DASHBOARD',
      description: 'Panel completo para gestionar usuarios, pagos y reportes.',
    },
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'REGISTER',
      description: 'Crea tu cuenta con tu correo institucional.',
    },
    {
      step: '02',
      title: 'SELECT',
      description: 'Elige tu casillero en el mapa interactivo.',
    },
    {
      step: '03',
      title: 'PAY',
      description: 'Realiza el pago de forma segura.',
    },
    {
      step: '04',
      title: 'ACCESS',
      description: '¡Listo! Usa tu casillero todo el semestre.',
    },
  ];

  // Estilos de keyframes inline
  const keyframesStyle = `
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
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
        className="min-h-screen relative overflow-x-hidden"
        style={{ background: colors.deepNavy }}
      >
        {/* Background Pattern */}
        <div 
          className="fixed inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage: `linear-gradient(${colors.borderColor} 1px, transparent 1px), linear-gradient(90deg, ${colors.borderColor} 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />
        
        {/* Scanline Effect */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute left-0 right-0 h-1"
            style={{
              background: `linear-gradient(to bottom, transparent, ${colors.circuitGreenGlow}, transparent)`,
              animation: 'scanline 8s linear infinite',
            }}
          />
        </div>
        
        {/* Floating particles */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full opacity-20"
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

        {/* Navigation */}
        {showContent && (
          <nav 
            className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
            style={{ 
              background: `${colors.deepNavy}E6`,
              borderBottom: `1px solid ${colors.borderColor}` 
            }}
          >
            <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28 py-4 sm:py-5 flex items-center justify-between">
              <Logo size="sm" animated={false} />
              <div className="hidden md:flex items-center gap-6 lg:gap-10">
                {[
                  { label: 'FEATURES', ref: featuresRef },
                  { label: 'ABOUT', ref: aboutRef },
                  { label: 'HOW_IT_WORKS', ref: howItWorksRef },
                ].map((item) => (
                  <button 
                    key={item.label}
                    onClick={() => scrollToSection(item.ref)}
                    className="text-sm lg:text-base font-mono transition-colors"
                    style={{ color: colors.textSecondary }}
                    onMouseEnter={(e) => e.currentTarget.style.color = colors.circuitGreen}
                    onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <Button 
                onClick={() => window.location.href = '/auth/login'}
                size="sm"
              >
                <span className="hidden sm:inline">ACCEDER</span>
                <span className="sm:hidden">→</span>
              </Button>
            </div>
          </nav>
        )}

        {/* Boot Sequence */}
        {!bootComplete && (
          <div className="min-h-screen flex items-center justify-center p-4">
            <div 
              className="text-left w-full max-w-xl p-4 sm:p-6 rounded-lg"
              style={{ 
                background: colors.cardBg,
                border: `1px solid ${colors.borderColor}` 
              }}
            >
              {bootLines.slice(0, currentLine).map((line, index) => (
                <p
                  key={index}
                  className="text-xs sm:text-sm font-mono opacity-80"
                  style={{ color: colors.circuitGreen }}
                >
                  {line}
                </p>
              ))}
              {currentLine < bootLines.length && (
                <span 
                  className="inline-block w-2 h-4 sm:h-5 ml-0.5 align-middle"
                  style={{ 
                    background: colors.circuitGreen,
                    animation: 'blink 1s step-end infinite' 
                  }}
                />
              )}
            </div>
          </div>
        )}

        {/* Main Content */}
        {showContent && (
          <main 
            className="relative z-10"
            style={{ animation: 'fadeIn 0.5s ease-out' }}
          >
            {/* Hero Section */}
            <section className="min-h-screen flex flex-col items-center justify-center px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28 pt-24 sm:pt-28">
              <div className="text-center w-full max-w-6xl mx-auto">
                {/* Logo */}
                <div className="flex justify-center mb-8 sm:mb-10 md:mb-12">
                  <Logo size="xl" animated={true} />
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-mono font-bold mb-5 sm:mb-8" style={{ color: colors.textPrimary }}>
                  <span style={{ color: colors.circuitGreen }}>AEIS</span> LOCKER
                  <br />
                  <span 
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl block mt-2 sm:mt-4"
                    style={{ color: colors.textSecondary }}
                  >
                    MANAGEMENT_SYSTEM
                  </span>
                </h1>
                
                <p 
                  className="text-base sm:text-lg md:text-xl font-mono mb-4 sm:mb-6 max-w-3xl mx-auto px-2 leading-relaxed"
                  style={{ color: colors.textSecondary }}
                >
                  Sistema integral de gestión de casilleros para la 
                  <span style={{ color: colors.circuitGreen }}> Asociación de Estudiantes de Ingeniería en Sistemas</span>
                </p>
                
                <p 
                  className="text-sm sm:text-base font-mono mb-10 sm:mb-14"
                  style={{ color: colors.textMuted }}
                >
                  [ SECURE • EFFICIENT • RELIABLE ] — v2.0.0
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-14 sm:mb-20 px-4">
                  <Button 
                    onClick={() => window.location.href = '/auth/login'}
                    glowing
                    size="lg"
                  >
                    🚀 INGRESAR_AL_SISTEMA
                  </Button>
                  <Button 
                    variant="ghost"
                    onClick={() => scrollToSection(featuresRef)}
                    size="lg"
                  >
                    📖 EXPLORAR
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-4">
                  {stats.map((stat, index) => (
                    <StatCard key={index} value={stat.value} label={stat.label} />
                  ))}
                </div>

                {/* Scroll indicator */}
                <div className="mt-14 sm:mt-20 animate-bounce">
                  <span className="text-2xl sm:text-3xl" style={{ color: colors.circuitGreen }}>↓</span>
                  <p className="text-xs sm:text-sm font-mono mt-2" style={{ color: colors.textMuted }}>SCROLL</p>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section ref={featuresRef} className="py-20 sm:py-28 md:py-36 lg:py-44 px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28">
              <div className="w-full">
                <div className="text-center mb-20 sm:mb-28 md:mb-32">
                  <p className="text-sm sm:text-base font-mono mb-5" style={{ color: colors.circuitGreen }}>
                    {'>'} LOADING_FEATURES_MODULE...
                  </p>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono font-bold mb-8 sm:mb-10" style={{ color: colors.textPrimary }}>
                    SYSTEM_<span style={{ color: colors.circuitGreen }}>CAPABILITIES</span>
                  </h2>
                  <p className="font-mono max-w-3xl mx-auto text-base sm:text-lg md:text-xl px-4 leading-relaxed" style={{ color: colors.textSecondary }}>
                    Descubre todas las funcionalidades del sistema AEIS Locker.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 sm:gap-12 md:gap-14 lg:gap-16">
                  {features.map((feature, index) => (
                    <FeatureCard 
                      key={index}
                      icon={feature.icon}
                      title={feature.title}
                      description={feature.description}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Spacer */}
            <div className="h-12 sm:h-16 md:h-20 lg:h-24" style={{ background: colors.deepNavy }} />

            {/* About Section */}
            <section 
              ref={aboutRef} 
              className="py-20 sm:py-28 md:py-36 lg:py-44 px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28"
              style={{ background: colors.deepNavyLight }}
            >
              <div className="w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 xl:gap-28 items-center">
                  <div>
                    <p className="text-sm sm:text-base font-mono mb-3" style={{ color: colors.circuitGreen }}>
                      {'>'} ABOUT_AEIS...
                    </p>
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-mono font-bold mb-6 sm:mb-8" style={{ color: colors.textPrimary }}>
                      ¿QUÉ ES <span style={{ color: colors.circuitGreen }}>AEIS</span>?
                    </h2>
                    <div className="space-y-4 sm:space-y-6 font-mono text-base sm:text-lg leading-relaxed" style={{ color: colors.textSecondary }}>
                      <p>
                        La <span style={{ color: colors.circuitGreen }}>Asociación de Estudiantes de Ingeniería en Sistemas (AEIS)</span> es una organización estudiantil dedicada a mejorar la experiencia universitaria.
                      </p>
                      <p>
                        El sistema de casilleros es uno de nuestros servicios principales, diseñado para guardar pertenencias de forma segura.
                      </p>
                      <p>
                        Hemos modernizado completamente el proceso de renta y gestión de casilleros, eliminando el papeleo.
                      </p>
                    </div>
                    <div className="mt-8 sm:mt-10">
                      <Button 
                        onClick={() => window.location.href = '/auth/register'}
                        size="lg"
                      >
                        ÚNETE_AHORA
                      </Button>
                    </div>
                  </div>
                  <div>
                    <LandingTerminal title="AEIS_INFO.log">
                      <div className="space-y-2 sm:space-y-3 text-sm sm:text-base font-mono">
                        <p style={{ color: colors.circuitGreen }}>{'>'} cat /etc/aeis/info.conf</p>
                        <p style={{ color: colors.textMuted }}>-----------------------------------</p>
                        <p><span style={{ color: colors.warningYellow }}>ORGANIZATION:</span> <span style={{ color: colors.textPrimary }}>AEIS</span></p>
                        <p><span style={{ color: colors.warningYellow }}>FOUNDED:</span> <span style={{ color: colors.textPrimary }}>2015</span></p>
                        <p><span style={{ color: colors.warningYellow }}>MEMBERS:</span> <span style={{ color: colors.textPrimary }}>1200+</span></p>
                        <p><span style={{ color: colors.warningYellow }}>LOCKERS:</span> <span style={{ color: colors.textPrimary }}>500+ disponibles</span></p>
                        <p><span style={{ color: colors.warningYellow }}>LOCATIONS:</span> <span style={{ color: colors.textPrimary }}>Edificio T-3, T-5</span></p>
                        <p style={{ color: colors.textMuted }}>-----------------------------------</p>
                        <p style={{ color: colors.circuitGreen }}>{'>'} STATUS: OPERATIONAL ✓</p>
                      </div>
                    </LandingTerminal>
                  </div>
                </div>
              </div>
            </section>

            {/* Spacer */}
            <div className="h-12 sm:h-16 md:h-20 lg:h-24" style={{ background: colors.deepNavyLight }} />

            {/* How It Works Section */}
            <section ref={howItWorksRef} className="py-20 sm:py-28 md:py-36 lg:py-44 px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28">
              <div className="w-full">
                <div className="text-center mb-20 sm:mb-28 md:mb-32">
                  <p className="text-sm sm:text-base font-mono mb-5" style={{ color: colors.circuitGreen }}>
                    {'>'} LOADING_INSTRUCTIONS...
                  </p>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono font-bold mb-8 sm:mb-10" style={{ color: colors.textPrimary }}>
                    HOW_IT_<span style={{ color: colors.circuitGreen }}>WORKS</span>
                  </h2>
                  <p className="font-mono max-w-3xl mx-auto text-base sm:text-lg md:text-xl px-4 leading-relaxed" style={{ color: colors.textSecondary }}>
                    Obtener tu casillero es fácil. Sigue estos simples pasos.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 sm:gap-12 lg:gap-16">
                  {howItWorks.map((item, index) => (
                    <StepCard 
                      key={index}
                      step={item.step}
                      title={item.title}
                      description={item.description}
                      showArrow={index < howItWorks.length - 1}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Spacer */}
            <div className="h-12 sm:h-16 md:h-20 lg:h-24" style={{ background: colors.deepNavy }} />

            {/* CTA Section */}
            <section 
              className="py-20 sm:py-28 md:py-36 lg:py-44 px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28"
              style={{ background: colors.deepNavyLight }}
            >
              <div className="max-w-5xl mx-auto text-center">
                <div 
                  className="p-10 sm:p-14 md:p-20 rounded-2xl"
                  style={{ 
                    background: colors.cardBg,
                    border: `2px solid ${colors.circuitGreen}`,
                    boxShadow: `0 0 40px ${colors.circuitGreenGlow}` 
                  }}
                >
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono font-bold mb-6 sm:mb-8" style={{ color: colors.textPrimary }}>
                    ¿LISTO PARA <span style={{ color: colors.circuitGreen }}>COMENZAR</span>?
                  </h2>
                  <p className="font-mono mb-10 sm:mb-14 max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed" style={{ color: colors.textSecondary }}>
                    Únete a más de 1,200 estudiantes que ya gestionan sus casilleros de forma digital.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 justify-center">
                    <Button 
                      onClick={() => window.location.href = '/auth/login'}
                      glowing
                      size="lg"
                    >
                      🔑 INICIAR_SESIÓN
                    </Button>
                    <Button 
                      variant="ghost"
                      onClick={() => window.location.href = '/auth/register'}
                      size="lg"
                    >
                      📝 CREAR_CUENTA
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer 
              className="py-20 sm:py-28 md:py-32 px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28"
              style={{ borderTop: `1px solid ${colors.borderColor}` }}
            >
              <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 lg:gap-16 mb-12 sm:mb-16">
                  <div className="sm:col-span-2 lg:col-span-2">
                    <Logo size="md" animated={false} />
                    <p className="text-sm sm:text-base md:text-lg font-mono mt-6 sm:mt-8 max-w-lg leading-relaxed" style={{ color: colors.textMuted }}>
                      Sistema de gestión de casilleros desarrollado por y para estudiantes de Ingeniería en Sistemas.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-mono font-bold mb-5 sm:mb-6" style={{ color: colors.circuitGreen }}>
                      QUICK_LINKS
                    </h4>
                    <ul className="space-y-4">
                      {[
                        { href: '/auth/login', label: 'Login' },
                        { href: '/auth/register', label: 'Registro' },
                      ].map((link) => (
                        <li key={link.href}>
                          <a 
                            href={link.href} 
                            className="text-sm sm:text-base md:text-lg font-mono transition-colors"
                            style={{ color: colors.textSecondary }}
                            onMouseEnter={(e) => e.currentTarget.style.color = colors.circuitGreen}
                            onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
                          >
                            {'>'} {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-mono font-bold mb-5 sm:mb-6" style={{ color: colors.circuitGreen }}>
                      CONTACT
                    </h4>
                    <ul className="space-y-4 text-sm sm:text-base md:text-lg font-mono" style={{ color: colors.textSecondary }}>
                      <li>{'>'} aeis@universidad.edu</li>
                      <li>{'>'} Edificio T-3</li>
                    </ul>
                  </div>
                </div>
                <div 
                  className="pt-10 sm:pt-12 text-center"
                  style={{ borderTop: `1px solid ${colors.borderColor}` }}
                >
                  <p className="text-sm sm:text-base font-mono" style={{ color: colors.textMuted }}>
                    © 2025 AEIS - Asociación de Estudiantes de Ingeniería en Sistemas
                  </p>
                  <p className="text-sm sm:text-base font-mono mt-3" style={{ color: colors.textMuted }}>
                    SECURE_CONNECTION | AES-256 | ONLINE
                  </p>
                </div>
              </div>
            </footer>
          </main>
        )}
      </div>
    </>
  );
}
