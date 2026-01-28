import { User, RefreshCw, MessageSquare, FileText } from 'lucide-react';

const features = [
  {
    icon: User,
    title: 'Análise individualizada',
    description:
      'Avaliação detalhada do seu histórico, exames, rotina e preferências. Cada protocolo é construído do zero para sua realidade.',
  },
  {
    icon: RefreshCw,
    title: 'Ajustes periódicos',
    description:
      'Acompanhamento quinzenal com análise de evolução. Adaptações contínuas baseadas em seus feedbacks e resultados.',
  },
  {
    icon: MessageSquare,
    title: 'Suporte direto',
    description:
      'Comunicação direta comigo via WhatsApp para dúvidas e orientações. Sem intermediários ou respostas automatizadas.',
  },
  {
    icon: FileText,
    title: 'Protocolo completo',
    description:
      'Plano alimentar detalhado com substituições, lista de compras e orientações práticas para o dia a dia.',
  },
];

export const Differentials = () => {
  return (
    <section id="protocolo" className="relative py-24 sm:py-32 bg-[#080808]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="tag text-primary font-semibold mb-4 block">
            Como funciona
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Metodologia de{' '}
            <span className="gradient-text">trabalho</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Um processo estruturado para garantir que você tenha todo suporte
            necessário para alcançar seus objetivos.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-modern glass-strong rounded-2xl p-8 flex gap-6"
            >
              {/* Number */}
              <div className="flex-shrink-0">
                <span className="font-display text-5xl font-bold text-white/5">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Content */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Science callout */}
        <div className="mt-12 glass rounded-2xl p-8 text-center max-w-3xl mx-auto">
          <p className="text-gray-300 leading-relaxed">
            <span className="text-white font-medium">Abordagem baseada em evidências.</span>{' '}
            Todas as estratégias são fundamentadas em literatura científica atual,
            sem modismos ou promessas irreais. Resultados sustentáveis através de
            métodos comprovados.
          </p>
        </div>
      </div>
    </section>
  );
};
