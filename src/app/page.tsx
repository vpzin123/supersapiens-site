'use client';

import { useEffect, useState } from 'react';
import { Construction } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
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

        @keyframes icon-pulse {
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

        .icon-container {
          animation: icon-pulse 2s ease-in-out infinite;
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

      {/* Main Content */}
      <div className="relative z-10 text-center px-6">
        {/* Icon */}
        <div className="icon-container w-28 h-28 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mx-auto mb-10">
          <Construction className="w-14 h-14 text-orange-500" />
        </div>

        {/* SUPERSAPIENS */}
        <h1 className="text-glow text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
          SUPERSAPIENS
        </h1>

        {/* EM CONSTRUÇÃO */}
        <p className="text-xl md:text-2xl lg:text-3xl text-orange-500 font-semibold tracking-widest mb-4">
          EM CONSTRUÇÃO
        </p>

        <p className="text-neutral-500 text-sm md:text-base max-w-md mx-auto">
          Estamos preparando algo incrível para você.
        </p>

        {/* Decorative Line */}
        <div className="mt-10 flex items-center justify-center gap-2">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-orange-500/50" />
          <div className="w-2 h-2 bg-orange-500/50 rounded-full" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-orange-500/50" />
        </div>

        {/* Link to questionnaire */}
        <div className="mt-12">
          <Link
            href="/invite"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 hover:border-orange-500/50 text-orange-500 font-medium rounded-xl transition-all text-sm"
          >
            Acessar Questionário
          </Link>
        </div>
      </div>
    </main>
  );
}
