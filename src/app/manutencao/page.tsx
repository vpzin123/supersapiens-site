'use client';

import Link from 'next/link';
import { ArrowLeft, Wrench } from 'lucide-react';

export default function ManutencaoPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
      `}</style>

      <div className="text-center px-6">
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center">
            <Wrench className="w-10 h-10 text-orange-500" />
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
          EM BREVE
        </h1>

        <p className="text-neutral-400 text-lg mb-8 max-w-md mx-auto">
          Esta seção está em desenvolvimento e será liberada em breve.
        </p>

        <Link
          href="/invite"
          className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-400 text-black font-bold rounded-xl transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </Link>
      </div>
    </main>
  );
}
