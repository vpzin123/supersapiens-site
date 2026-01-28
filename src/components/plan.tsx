import { Check, Shield, ArrowRight } from 'lucide-react';

const included = [
  'Protocolo nutricional 100% individualizado',
  'Cálculo preciso de macronutrientes',
  'Tabela de substituições alimentares',
  'Acompanhamento quinzenal',
  'Suporte via WhatsApp',
  'Ajustes conforme evolução',
  'Lista de compras estruturada',
  'Orientações práticas detalhadas',
];

export const Plan = () => {
  return (
    <section id="investimento" className="relative py-24 sm:py-32">
      {/* Divider */}
      <div className="divider-gradient mb-24" />

      <div className="max-w-3xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="tag text-primary font-semibold mb-4 block">
            Investimento
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Consultoria{' '}
            <span className="gradient-text">mensal</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Acompanhamento completo para você alcançar seus objetivos
            de forma estruturada e sustentável.
          </p>
        </div>

        {/* Plan Card */}
        <div className="glass-strong rounded-3xl overflow-hidden glow-subtle">
          {/* Price Header */}
          <div className="p-8 sm:p-10 text-center border-b border-white/5">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-gray-400 text-lg">R$</span>
              <span className="font-display text-6xl sm:text-7xl font-bold text-white">120</span>
              <span className="text-gray-400 text-lg">/mês</span>
            </div>
            <p className="text-gray-500 text-sm mt-3">
              Acompanhamento mensal completo
            </p>
          </div>

          {/* Features */}
          <div className="p-8 sm:p-10">
            <p className="text-sm text-gray-400 uppercase tracking-wider font-medium mb-6">
              O que está incluso
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {included.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="https://wa.me/5512997015595?text=Olá! Gostaria de iniciar a consultoria nutricional mensal."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-modern w-full bg-primary hover:bg-primary-light text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-3"
            >
              Iniciar consultoria
              <ArrowRight className="w-5 h-5" />
            </a>

            {/* Guarantee */}
            <div className="mt-6 flex items-center justify-center gap-2 text-gray-500">
              <Shield className="w-4 h-4 text-green-500/70" />
              <span className="text-sm">
                Garantia de 30 dias ou reembolso integral
              </span>
            </div>
          </div>
        </div>

        {/* Additional note */}
        <p className="text-center text-gray-500 text-sm mt-8">
          Dúvidas sobre o processo?{' '}
          <a
            href="https://wa.me/5512997015595?text=Olá! Tenho algumas dúvidas sobre a consultoria."
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-light"
          >
            Entre em contato
          </a>
        </p>
      </div>
    </section>
  );
};
