import { ArrowRight, Beaker, Brain, TrendingUp } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20">
      {/* Background */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8">
            <Beaker className="w-4 h-4 text-primary" />
            <span className="tag text-gray-400 font-medium">
              Nutrição baseada em evidências científicas
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
            <span className="text-white">Protocolos nutricionais</span>
            <br />
            <span className="gradient-text">personalizados</span>
            <span className="text-white"> para</span>
            <br />
            <span className="text-white">resultados </span>
            <span className="gradient-text">mensuráveis</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Consultoria nutricional individualizada fundamentada em ciência.
            Otimização metabólica, composição corporal e performance através
            de estratégias validadas pela literatura.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="https://wa.me/5512997015595?text=Olá! Gostaria de iniciar minha consultoria nutricional."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-modern bg-primary hover:bg-primary-light text-white font-semibold py-4 px-8 rounded-full flex items-center gap-3"
            >
              Agendar consultoria
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#metodologia"
              className="text-gray-400 hover:text-white font-medium py-4 px-6 transition-colors text-sm"
            >
              Conhecer metodologia
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Brain className="w-5 h-5 text-primary mr-2" />
                <span className="text-2xl sm:text-3xl font-bold text-white font-display">100%</span>
              </div>
              <span className="text-xs sm:text-sm text-gray-500">Personalizado</span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Beaker className="w-5 h-5 text-primary mr-2" />
                <span className="text-2xl sm:text-3xl font-bold text-white font-display">Online</span>
              </div>
              <span className="text-xs sm:text-sm text-gray-500">Atendimento</span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-primary mr-2" />
                <span className="text-2xl sm:text-3xl font-bold text-white font-display">30d</span>
              </div>
              <span className="text-xs sm:text-sm text-gray-500">Garantia</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />
    </section>
  );
};
