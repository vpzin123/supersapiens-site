import { Flame, TrendingUp, Activity, ArrowUpRight } from 'lucide-react';

const objectives = [
  {
    icon: Flame,
    tag: 'Redução de gordura',
    title: 'Emagrecimento',
    description:
      'Déficit calórico estratégico com preservação de massa magra. Periodização nutricional para otimização do metabolismo e resultados sustentáveis a longo prazo.',
    metrics: ['Déficit calculado', 'Preservação muscular', 'Metabolismo ativo'],
  },
  {
    icon: TrendingUp,
    tag: 'Ganho de massa',
    title: 'Hipertrofia',
    description:
      'Superávit calórico controlado com distribuição proteica otimizada. Timing nutricional estratégico para maximizar a síntese proteica muscular.',
    metrics: ['Macros precisos', 'Timing otimizado', 'Ganho limpo'],
  },
  {
    icon: Activity,
    tag: 'Bem-estar geral',
    title: 'Qualidade de vida',
    description:
      'Equilíbrio nutricional para energia, disposição e saúde metabólica. Alimentação funcional adaptada à sua rotina e preferências individuais.',
    metrics: ['Energia estável', 'Saúde metabólica', 'Flexibilidade'],
  },
];

export const Benefits = () => {
  return (
    <section id="metodologia" className="relative py-24 sm:py-32">
      {/* Divider */}
      <div className="divider-gradient mb-24" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="tag text-primary font-semibold mb-4 block">
            Áreas de atuação
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Objetivos tratados com{' '}
            <span className="gradient-text">rigor científico</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Cada protocolo é desenvolvido individualmente, considerando sua fisiologia,
            objetivos e contexto de vida. Sem fórmulas prontas.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {objectives.map((item, index) => (
            <div
              key={index}
              className="card-modern glass rounded-2xl p-8 group"
            >
              {/* Icon & Tag */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="tag text-gray-500 font-medium">
                  {item.tag}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display text-xl font-semibold text-white mb-4">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {item.description}
              </p>

              {/* Metrics */}
              <div className="flex flex-wrap gap-2">
                {item.metrics.map((metric, i) => (
                  <span
                    key={i}
                    className="text-xs bg-white/5 text-gray-400 px-3 py-1.5 rounded-full"
                  >
                    {metric}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://wa.me/5512997015595?text=Olá! Quero saber qual protocolo é ideal para meu objetivo."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-light font-medium transition-colors text-sm"
          >
            Descobrir qual protocolo é ideal para você
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
