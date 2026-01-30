'use client';

import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ObrigadoPage() {
  const [isShocking, setIsShocking] = useState(false);

  useEffect(() => {
    const shockInterval = setInterval(() => {
      setIsShocking(true);
      setTimeout(() => setIsShocking(false), 150);
    }, 3000);

    return () => clearInterval(shockInterval);
  }, []);

  return (
    <main className={`min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden transition-all duration-75 ${isShocking ? 'brightness-150 contrast-125' : ''}`}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes energy-flow {
          0% { stroke-dashoffset: 1000; opacity: 0; }
          50% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }

        @keyframes check-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.4); }
          50% { transform: scale(1.05); box-shadow: 0 0 40px 10px rgba(249, 115, 22, 0.2); }
        }

        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(249, 115, 22, 0.3); }
          50% { text-shadow: 0 0 40px rgba(249, 115, 22, 0.6), 0 0 60px rgba(249, 115, 22, 0.3); }
        }

        .glow-orb {
          animation: pulse-glow 4s ease-in-out infinite;
        }

        .floating-shape {
          animation: float 6s ease-in-out infinite;
        }

        .energy-line {
          stroke-dasharray: 1000;
          animation: energy-flow 4s ease-in-out infinite;
        }

        .check-container {
          animation: check-pulse 2s ease-in-out infinite;
        }

        .text-glow {
          animation: text-glow 3s ease-in-out infinite;
        }
      `}</style>

      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(249, 115, 22, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(249, 115, 22, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Glow Orbs */}
      <div className="glow-orb absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px]" />
      <div className="glow-orb absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-600/10 rounded-full blur-[80px]" style={{ animationDelay: '2s' }} />
      <div className="glow-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px]" />

      {/* Floating Shapes */}
      <div className="floating-shape absolute top-20 right-20 w-2 h-2 bg-orange-500/40 rounded-full" />
      <div className="floating-shape absolute bottom-32 left-16 w-3 h-3 bg-orange-500/30 rounded-full" style={{ animationDelay: '1s' }} />
      <div className="floating-shape absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-orange-500/50 rounded-full" style={{ animationDelay: '2s' }} />
      <div className="floating-shape absolute bottom-1/4 left-1/3 w-2 h-2 bg-orange-500/40 rounded-full" style={{ animationDelay: '3s' }} />

      {/* Energy Lines SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.15 }}>
        <path
          className="energy-line"
          d="M0,200 Q200,100 400,200 T800,200"
          fill="none"
          stroke="url(#energyGradient)"
          strokeWidth="1"
        />
        <path
          className="energy-line"
          d="M0,400 Q300,300 600,400 T1200,400"
          fill="none"
          stroke="url(#energyGradient)"
          strokeWidth="1"
          style={{ animationDelay: '1s' }}
        />
        <path
          className="energy-line"
          d="M0,600 Q250,500 500,600 T1000,600"
          fill="none"
          stroke="url(#energyGradient)"
          strokeWidth="1"
          style={{ animationDelay: '2s' }}
        />
        <defs>
          <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6">
        {/* Check Icon */}
        <div className="check-container w-28 h-28 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mx-auto mb-10">
          <CheckCircle className="w-14 h-14 text-orange-500" />
        </div>

        {/* OBRIGADO */}
        <h1 className="text-glow text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight">
          OBRIGADO!
        </h1>

        {/* AGUARDE CONTATO */}
        <p className="text-xl md:text-2xl lg:text-3xl text-orange-500 font-semibold tracking-widest">
          AGUARDE CONTATO
        </p>

        {/* Decorative Line */}
        <div className="mt-10 flex items-center justify-center gap-2">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-orange-500/50" />
          <div className="w-2 h-2 bg-orange-500/50 rounded-full" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-orange-500/50" />
        </div>
      </div>

      {/* Bottom Branding */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <Link href="/invite" className="text-neutral-600 hover:text-orange-500 transition-colors text-sm tracking-widest">
          SUPERSAPIENS
        </Link>
      </div>
    </main>
  );
}
