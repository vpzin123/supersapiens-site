import { ArrowRight } from 'lucide-react';

export const Cta = () => {
  return (
    <section className="relative py-24 sm:py-32">
      {/* Divider */}
      <div className="divider-gradient mb-24" />

      <div className="max-w-3xl mx-auto px-6 text-center">
        {/* Headline */}
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Pronto para começar sua{' '}
          <span className="gradient-text">transformação</span>?
        </h2>

        {/* Description */}
        <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
          Invista em um acompanhamento nutricional sério, fundamentado em ciência
          e personalizado para seus objetivos. Resultados sustentáveis começam com
          o primeiro passo.
        </p>

        {/* CTA */}
        <a
          href="https://wa.me/5512997015595?text=Olá! Gostaria de iniciar minha consultoria nutricional."
          target="_blank"
          rel="noopener noreferrer"
          className="btn-modern inline-flex items-center gap-3 bg-primary hover:bg-primary-light text-white font-semibold py-4 px-10 rounded-full"
        >
          Agendar consultoria
          <ArrowRight className="w-5 h-5" />
        </a>

        {/* Sub info */}
        <p className="mt-6 text-gray-500 text-sm">
          R$120/mês • Garantia de 30 dias • Cancele quando quiser
        </p>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500/50" />
            <span>100% Online</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500/50" />
            <span>Suporte direto</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500/50" />
            <span>Baseado em evidências</span>
          </div>
        </div>
      </div>
    </section>
  );
};
