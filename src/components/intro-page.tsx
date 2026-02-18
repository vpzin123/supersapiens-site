'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Zap, Menu, X } from 'lucide-react';

export const IntroPage = () => {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [phase, setPhase] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const menuItems = [
    'PEPTÍDEOS',
    'ESTEROIDES',
    'SUPLEMENTOS',
    'FITOTERÁPICOS',
    'CALCULADORAS',
    'HABITS TRACKER',
    'DEEPSCIENCE',
    'NEWS'
  ];

  // Sequência de animação inicial
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),   // Logo aparece
      setTimeout(() => setPhase(2), 1500),  // Frase 1
      setTimeout(() => setPhase(3), 3000),  // Frase 2
      setTimeout(() => setPhase(4), 4500),  // Input aparece
      setTimeout(() => setShowInput(true), 4800),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  const handleStart = () => {
    if (nome.trim().length < 2) return;

    setIsTransitioning(true);

    // Salva o nome no localStorage
    localStorage.setItem('supersapiens_nome', nome.trim());

    // Transição dramática
    setTimeout(() => {
      router.push(`/anamnese?nome=${encodeURIComponent(nome.trim())}`);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleStart();
    }
  };

  return (
    <main className={`min-h-screen bg-black text-white overflow-hidden relative transition-all duration-1000 shock-effect ${isTransitioning ? 'opacity-0' : ''}`}>
      {/* Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }

        @keyframes scan-line {
          0% { top: -10%; }
          100% { top: 110%; }
        }

        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        @keyframes reveal {
          from { clip-path: inset(0 100% 0 0); }
          to { clip-path: inset(0 0 0 0); }
        }

        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(249,115,22,0.3); }
          50% { box-shadow: 0 0 40px rgba(249,115,22,0.6); }
        }

        @keyframes shock {
          0%, 100% { opacity: 1; filter: brightness(1); }
          5% { opacity: 0.8; filter: brightness(1.5); }
          10% { opacity: 1; filter: brightness(1); }
          15% { opacity: 0.6; filter: brightness(2); }
          20% { opacity: 1; filter: brightness(1); }
          50% { opacity: 1; filter: brightness(1); }
          52% { opacity: 0.7; filter: brightness(1.8); }
          54% { opacity: 1; filter: brightness(1); }
          90% { opacity: 1; filter: brightness(1); }
          92% { opacity: 0.85; filter: brightness(1.3); }
          94% { opacity: 1; filter: brightness(1); }
        }

        .shock-effect {
          animation: shock 4s ease-in-out infinite;
        }

        .scan-effect::before {
          content: '';
          position: absolute;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(249,115,22,0.8), transparent);
          animation: scan-line 3s linear infinite;
        }
      `}</style>

      {/* Background Elements */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Glow orbs */}
      <div className="fixed top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[150px] pointer-events-none"
        style={{ animation: 'pulse-glow 8s ease-in-out infinite' }}
      />
      <div className="fixed bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none"
        style={{ animation: 'pulse-glow 10s ease-in-out infinite 2s' }}
      />

      {/* Floating geometric shapes */}
      <div className="fixed top-20 right-20 w-16 h-16 border border-orange-500/20 rounded-lg pointer-events-none"
        style={{ animation: 'float 8s ease-in-out infinite' }}
      />
      <div className="fixed bottom-32 left-20 w-10 h-10 border border-orange-500/10 rounded-full pointer-events-none"
        style={{ animation: 'float 12s ease-in-out infinite 2s' }}
      />
      <div className="fixed top-1/2 right-32 w-6 h-6 bg-orange-500/10 rounded-sm pointer-events-none"
        style={{ animation: 'float 10s ease-in-out infinite 1s' }}
      />

      {/* Diagonal lines */}
      <div className="fixed top-0 left-20 w-px h-[600px] bg-gradient-to-b from-orange-500/20 via-orange-500/5 to-transparent pointer-events-none"
        style={{ transform: 'rotate(15deg)' }}
      />
      <div className="fixed bottom-0 right-20 w-px h-[500px] bg-gradient-to-t from-orange-500/15 via-orange-500/5 to-transparent pointer-events-none"
        style={{ transform: 'rotate(-15deg)' }}
      />

      {/* Scan effect overlay */}
      <div className="fixed inset-0 pointer-events-none scan-effect" />

      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center justify-center gap-6">
            {menuItems.map((item) => (
              <Link
                key={item}
                href="/manutencao"
                className="text-xs font-medium text-neutral-400 hover:text-orange-500 transition-colors tracking-wide"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center justify-between">
            <span className="text-xs text-neutral-500">MENU</span>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-neutral-400 hover:text-orange-500 transition-colors"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="lg:hidden bg-black/95 border-t border-white/5 py-4">
            <nav className="flex flex-col items-center gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item}
                  href="/manutencao"
                  className="text-sm font-medium text-neutral-400 hover:text-orange-500 transition-colors tracking-wide"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-16">

        {/* Logo */}
        <div className={`transition-all duration-1000 ${phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-8 h-8 text-orange-500" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white text-center drop-shadow-[0_0_30px_rgba(249,115,22,0.4)]">
            SUPERSAPIENS
          </h1>
          <p className="text-white font-black text-sm md:text-base tracking-tight text-right -mt-1">
            PWRD BY VP
          </p>
        </div>

        {/* Tagline 1 */}
        <div className={`mt-8 transition-all duration-1000 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <p className="text-orange-500/80 text-sm md:text-base font-medium tracking-wide uppercase text-center">"NEVER BET AGAINST SCIENCE"</p>
        </div>

        {/* ATP - Adenosina Trifosfato - A molécula da energia */}
        <div className={`mt-8 transition-all duration-1000 ${phase >= 3 ? 'opacity-100' : 'opacity-0'}`}>
          <svg width="420" height="160" viewBox="0 0 420 160" className="mx-auto">

            {/* === ADENINA (base nitrogenada - anel duplo) === */}
            {/* Anel de 6 membros (pirimidina) */}
            <line x1="40" y1="60" x2="60" y2="45" stroke="#f97316" strokeWidth="2" opacity="0.6" />
            <line x1="60" y1="45" x2="85" y2="50" stroke="#f97316" strokeWidth="2" opacity="0.6" />
            <line x1="85" y1="50" x2="90" y2="75" stroke="#f97316" strokeWidth="2" opacity="0.6" />
            <line x1="90" y1="75" x2="70" y2="90" stroke="#f97316" strokeWidth="2" opacity="0.6" />
            <line x1="70" y1="90" x2="45" y2="80" stroke="#f97316" strokeWidth="2" opacity="0.6" />
            <line x1="45" y1="80" x2="40" y2="60" stroke="#f97316" strokeWidth="2" opacity="0.6" />

            {/* Anel de 5 membros (imidazol) - fundido */}
            <line x1="85" y1="50" x2="110" y2="55" stroke="#f97316" strokeWidth="2" opacity="0.6" />
            <line x1="110" y1="55" x2="115" y2="80" stroke="#f97316" strokeWidth="2" opacity="0.6" />
            <line x1="115" y1="80" x2="90" y2="75" stroke="#f97316" strokeWidth="2" opacity="0.6" />

            {/* Grupo NH2 da adenina */}
            <line x1="60" y1="45" x2="60" y2="20" stroke="#f97316" strokeWidth="2" opacity="0.6" />

            {/* Átomos da Adenina */}
            <circle cx="40" cy="60" r="6" fill="none" stroke="#f97316" strokeWidth="2" className="animate-pulse" />
            <circle cx="40" cy="60" r="2.5" fill="#f97316" className="animate-pulse" />

            <circle cx="60" cy="45" r="5" fill="none" stroke="#f97316" strokeWidth="1.5" opacity="0.8" className="animate-pulse" style={{ animationDelay: '0.1s' }} />
            <circle cx="60" cy="45" r="2" fill="#f97316" className="animate-pulse" style={{ animationDelay: '0.1s' }} />

            <circle cx="85" cy="50" r="6" fill="none" stroke="#f97316" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
            <circle cx="85" cy="50" r="2.5" fill="#f97316" className="animate-pulse" style={{ animationDelay: '0.2s' }} />

            <circle cx="90" cy="75" r="5" fill="none" stroke="#f97316" strokeWidth="1.5" opacity="0.8" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
            <circle cx="90" cy="75" r="2" fill="#f97316" className="animate-pulse" style={{ animationDelay: '0.3s' }} />

            <circle cx="70" cy="90" r="6" fill="none" stroke="#f97316" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
            <circle cx="70" cy="90" r="2.5" fill="#f97316" className="animate-pulse" style={{ animationDelay: '0.4s' }} />

            <circle cx="45" cy="80" r="5" fill="none" stroke="#f97316" strokeWidth="1.5" opacity="0.8" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
            <circle cx="45" cy="80" r="2" fill="#f97316" className="animate-pulse" style={{ animationDelay: '0.5s' }} />

            <circle cx="110" cy="55" r="6" fill="none" stroke="#f97316" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
            <circle cx="110" cy="55" r="2.5" fill="#f97316" className="animate-pulse" style={{ animationDelay: '0.3s' }} />

            <circle cx="115" cy="80" r="5" fill="none" stroke="#f97316" strokeWidth="1.5" opacity="0.8" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
            <circle cx="115" cy="80" r="2" fill="#f97316" className="animate-pulse" style={{ animationDelay: '0.4s' }} />

            {/* NH2 */}
            <circle cx="60" cy="20" r="7" fill="none" stroke="#f97316" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
            <circle cx="60" cy="20" r="3" fill="#f97316" className="animate-pulse" style={{ animationDelay: '0.2s' }} />

            {/* === RIBOSE (açúcar - pentagonal) === */}
            <line x1="115" y1="80" x2="150" y2="85" stroke="#f97316" strokeWidth="2" opacity="0.6" />

            {/* Anel da ribose */}
            <line x1="150" y1="85" x2="170" y2="70" stroke="#f97316" strokeWidth="2" opacity="0.6" />
            <line x1="170" y1="70" x2="190" y2="85" stroke="#f97316" strokeWidth="2" opacity="0.6" />
            <line x1="190" y1="85" x2="180" y2="110" stroke="#f97316" strokeWidth="2" opacity="0.6" />
            <line x1="180" y1="110" x2="155" y2="105" stroke="#f97316" strokeWidth="2" opacity="0.6" />
            <line x1="155" y1="105" x2="150" y2="85" stroke="#f97316" strokeWidth="2" opacity="0.6" />

            {/* OH da ribose */}
            <line x1="180" y1="110" x2="195" y2="125" stroke="#f97316" strokeWidth="1.5" opacity="0.5" />
            <line x1="155" y1="105" x2="140" y2="120" stroke="#f97316" strokeWidth="1.5" opacity="0.5" />

            {/* Átomos da Ribose */}
            <circle cx="150" cy="85" r="5" fill="none" stroke="#f97316" strokeWidth="1.5" opacity="0.8" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
            <circle cx="150" cy="85" r="2" fill="#f97316" className="animate-pulse" style={{ animationDelay: '0.5s' }} />

            <circle cx="170" cy="70" r="6" fill="none" stroke="#ff6b35" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
            <circle cx="170" cy="70" r="2.5" fill="#ff6b35" className="animate-pulse" style={{ animationDelay: '0.6s' }} />

            <circle cx="190" cy="85" r="5" fill="none" stroke="#f97316" strokeWidth="1.5" opacity="0.8" className="animate-pulse" style={{ animationDelay: '0.7s' }} />
            <circle cx="190" cy="85" r="2" fill="#f97316" className="animate-pulse" style={{ animationDelay: '0.7s' }} />

            <circle cx="180" cy="110" r="5" fill="none" stroke="#f97316" strokeWidth="1.5" opacity="0.8" className="animate-pulse" style={{ animationDelay: '0.8s' }} />
            <circle cx="180" cy="110" r="2" fill="#f97316" className="animate-pulse" style={{ animationDelay: '0.8s' }} />

            <circle cx="155" cy="105" r="5" fill="none" stroke="#f97316" strokeWidth="1.5" opacity="0.8" className="animate-pulse" style={{ animationDelay: '0.9s' }} />
            <circle cx="155" cy="105" r="2" fill="#f97316" className="animate-pulse" style={{ animationDelay: '0.9s' }} />

            {/* OH pequenos */}
            <circle cx="195" cy="125" r="5" fill="none" stroke="#ff6b35" strokeWidth="1.5" opacity="0.7" className="animate-pulse" style={{ animationDelay: '1s' }} />
            <circle cx="195" cy="125" r="2" fill="#ff6b35" className="animate-pulse" style={{ animationDelay: '1s' }} />

            <circle cx="140" cy="120" r="5" fill="none" stroke="#ff6b35" strokeWidth="1.5" opacity="0.7" className="animate-pulse" style={{ animationDelay: '1.1s' }} />
            <circle cx="140" cy="120" r="2" fill="#ff6b35" className="animate-pulse" style={{ animationDelay: '1.1s' }} />

            {/* === TRIFOSFATO (3 grupos fosfato - A ENERGIA!) === */}
            <line x1="190" y1="85" x2="230" y2="80" stroke="#f97316" strokeWidth="2" opacity="0.7" />

            {/* Fosfato 1 (alfa) */}
            <line x1="230" y1="80" x2="270" y2="80" stroke="#f97316" strokeWidth="3" opacity="0.8" />
            <line x1="250" y1="80" x2="250" y2="55" stroke="#f97316" strokeWidth="2" opacity="0.6" />
            <line x1="250" y1="80" x2="250" y2="105" stroke="#f97316" strokeWidth="2" opacity="0.6" />

            {/* Fosfato 2 (beta) */}
            <line x1="270" y1="80" x2="310" y2="80" stroke="#f97316" strokeWidth="3" opacity="0.8" />
            <line x1="290" y1="80" x2="290" y2="55" stroke="#f97316" strokeWidth="2" opacity="0.6" />
            <line x1="290" y1="80" x2="290" y2="105" stroke="#f97316" strokeWidth="2" opacity="0.6" />

            {/* Fosfato 3 (gama) - ALTA ENERGIA */}
            <line x1="310" y1="80" x2="350" y2="80" stroke="#f97316" strokeWidth="3" opacity="0.8" />
            <line x1="330" y1="80" x2="330" y2="55" stroke="#f97316" strokeWidth="2" opacity="0.6" />
            <line x1="330" y1="80" x2="330" y2="105" stroke="#f97316" strokeWidth="2" opacity="0.6" />
            <line x1="350" y1="80" x2="380" y2="80" stroke="#f97316" strokeWidth="2" opacity="0.6" />

            {/* Átomos de Fósforo - ENERGIA! */}
            <circle cx="250" cy="80" r="10" fill="none" stroke="#f97316" strokeWidth="2.5" className="animate-pulse" style={{ animationDelay: '0.8s' }} />
            <circle cx="250" cy="80" r="4" fill="#f97316" className="animate-pulse" style={{ animationDelay: '0.8s' }} />

            <circle cx="290" cy="80" r="10" fill="none" stroke="#f97316" strokeWidth="2.5" className="animate-pulse" style={{ animationDelay: '1s' }} />
            <circle cx="290" cy="80" r="4" fill="#f97316" className="animate-pulse" style={{ animationDelay: '1s' }} />

            <circle cx="330" cy="80" r="12" fill="none" stroke="#f97316" strokeWidth="3" className="animate-pulse" style={{ animationDelay: '1.2s' }} />
            <circle cx="330" cy="80" r="5" fill="#f97316" className="animate-pulse" style={{ animationDelay: '1.2s' }} />

            {/* Oxigênios dos fosfatos */}
            <circle cx="250" cy="55" r="5" fill="none" stroke="#ff6b35" strokeWidth="1.5" opacity="0.7" className="animate-pulse" style={{ animationDelay: '0.9s' }} />
            <circle cx="250" cy="55" r="2" fill="#ff6b35" className="animate-pulse" style={{ animationDelay: '0.9s' }} />

            <circle cx="250" cy="105" r="5" fill="none" stroke="#ff6b35" strokeWidth="1.5" opacity="0.7" className="animate-pulse" style={{ animationDelay: '0.9s' }} />
            <circle cx="250" cy="105" r="2" fill="#ff6b35" className="animate-pulse" style={{ animationDelay: '0.9s' }} />

            <circle cx="290" cy="55" r="5" fill="none" stroke="#ff6b35" strokeWidth="1.5" opacity="0.7" className="animate-pulse" style={{ animationDelay: '1.1s' }} />
            <circle cx="290" cy="55" r="2" fill="#ff6b35" className="animate-pulse" style={{ animationDelay: '1.1s' }} />

            <circle cx="290" cy="105" r="5" fill="none" stroke="#ff6b35" strokeWidth="1.5" opacity="0.7" className="animate-pulse" style={{ animationDelay: '1.1s' }} />
            <circle cx="290" cy="105" r="2" fill="#ff6b35" className="animate-pulse" style={{ animationDelay: '1.1s' }} />

            <circle cx="330" cy="55" r="5" fill="none" stroke="#ff6b35" strokeWidth="1.5" opacity="0.7" className="animate-pulse" style={{ animationDelay: '1.3s' }} />
            <circle cx="330" cy="55" r="2" fill="#ff6b35" className="animate-pulse" style={{ animationDelay: '1.3s' }} />

            <circle cx="330" cy="105" r="5" fill="none" stroke="#ff6b35" strokeWidth="1.5" opacity="0.7" className="animate-pulse" style={{ animationDelay: '1.3s' }} />
            <circle cx="330" cy="105" r="2" fill="#ff6b35" className="animate-pulse" style={{ animationDelay: '1.3s' }} />

            <circle cx="380" cy="80" r="6" fill="none" stroke="#ff6b35" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '1.4s' }} />
            <circle cx="380" cy="80" r="2.5" fill="#ff6b35" className="animate-pulse" style={{ animationDelay: '1.4s' }} />

            {/* Energia fluindo pela molécula! */}
            <circle r="3" fill="#f97316">
              <animateMotion dur="2s" repeatCount="indefinite" path="M60 45 L85 50 L110 55 L115 80 L150 85 L190 85 L230 80 L250 80 L290 80 L330 80 L380 80" />
            </circle>
            <circle r="2.5" fill="#f97316">
              <animateMotion dur="3s" repeatCount="indefinite" begin="0.5s" path="M40 60 L60 45 L85 50 L90 75 L70 90 L45 80 L40 60" />
            </circle>
            <circle r="2" fill="#f97316" opacity="0.8">
              <animateMotion dur="1.5s" repeatCount="indefinite" begin="1s" path="M250 80 L290 80 L330 80 L380 80" />
            </circle>

            {/* Glow no fosfato de alta energia */}
            <circle cx="330" cy="80" r="20" fill="none" stroke="#f97316" strokeWidth="1" opacity="0.3" className="animate-ping" />

          </svg>
        </div>

        {/* Input Section */}
        <div className={`mt-8 w-full max-w-md transition-all duration-1000 ${phase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

          <label className="block text-center text-neutral-300 text-sm mb-4 tracking-wider">
            DIGITE SEU NOME COMPLETO
          </label>

          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Seu nome completo"
              className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-6 py-4 text-white text-lg text-center placeholder-neutral-600 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all"
              style={showInput && nome.length > 0 ? { animation: 'glow-pulse 2s ease-in-out infinite' } : {}}
            />

            {/* Glow effect when typing */}
            {nome.length > 0 && (
              <div className="absolute inset-0 rounded-xl bg-orange-500/10 blur-xl pointer-events-none" />
            )}
          </div>

          {/* Name preview */}
          {nome.length > 2 && (
            <div className="mt-6 text-center transition-all duration-500">
              <p className="text-neutral-500 text-sm">Bem-vindo(a),</p>
              <p className="text-2xl font-bold text-orange-500 mt-1">{nome.split(' ')[0]}</p>
            </div>
          )}

          {/* Start Button */}
          <button
            onClick={handleStart}
            disabled={nome.trim().length < 2}
            className={`mt-8 w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-500 ${
              nome.trim().length >= 2
                ? 'bg-orange-500 hover:bg-orange-400 text-black shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02]'
                : 'bg-white/5 text-neutral-600 cursor-not-allowed'
            }`}
          >
            INICIAR
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

        {/* Footer note */}
        <div className={`mt-12 transition-all duration-1000 delay-500 ${phase >= 4 ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-orange-500 text-sm md:text-base text-center font-medium">
            vpneuroscience@icloud.com
          </p>
          <p className="text-neutral-500 text-sm text-center mt-1">
            (serious business only)
          </p>
        </div>

      </div>
    </main>
  );
};
