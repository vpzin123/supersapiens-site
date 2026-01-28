'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'Como funciona a consultoria online?',
    answer:
      'Após a contratação, você responde um questionário detalhado sobre histórico de saúde, exames, objetivos, rotina e preferências alimentares. Com base nessa análise, desenvolvo seu protocolo nutricional personalizado. O material é enviado por WhatsApp/email e você tem suporte direto comigo para dúvidas.',
  },
  {
    question: 'As estratégias são baseadas em evidências?',
    answer:
      'Sim. Todas as recomendações são fundamentadas em literatura científica atual e diretrizes de sociedades de nutrição. Não utilizo modismos ou estratégias sem comprovação. O objetivo é sempre otimizar resultados de forma segura e sustentável.',
  },
  {
    question: 'Qual a diferença de uma dieta genérica?',
    answer:
      'Uma dieta genérica não considera suas particularidades metabólicas, preferências, restrições e contexto de vida. Na consultoria, cada variável é analisada para criar um protocolo que seja efetivo e, principalmente, aplicável à sua realidade.',
  },
  {
    question: 'Em quanto tempo posso esperar resultados?',
    answer:
      'Resultados dependem de múltiplos fatores: adesão ao protocolo, ponto de partida, objetivo e individualidade metabólica. Geralmente, mudanças iniciais são perceptíveis em 2-4 semanas. Resultados mais expressivos surgem a partir de 8-12 semanas de consistência.',
  },
  {
    question: 'Como funciona o acompanhamento?',
    answer:
      'A cada 15 dias, você envia um relatório de evolução com peso, medidas, fotos (opcional) e feedback sobre como está sendo seguir o protocolo. Com base nesses dados, faço os ajustes necessários para otimizar seus resultados.',
  },
  {
    question: 'Posso tirar dúvidas a qualquer momento?',
    answer:
      'Sim. Você tem acesso a suporte via WhatsApp de segunda a quinta para dúvidas sobre o protocolo, substituições, situações específicas e orientações gerais. Respondo pessoalmente, sem intermediários.',
  },
  {
    question: 'Atende restrições alimentares específicas?',
    answer:
      'Sim. O protocolo é adaptado para vegetarianos, veganos, intolerantes à lactose, celíacos e outras condições. A análise inicial mapeia todas as suas restrições para garantir um plano 100% adequado.',
  },
  {
    question: 'E se eu não ficar satisfeito?',
    answer:
      'Você tem garantia de 30 dias. Se por qualquer motivo não estiver satisfeito com a consultoria, solicite o reembolso integral sem questionamentos. O objetivo é que você tenha total segurança ao investir.',
  },
];

export const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32 bg-[#080808]">
      <div className="max-w-3xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="tag text-primary font-semibold mb-4 block">
            Perguntas frequentes
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Dúvidas <span className="gradient-text">comuns</span>
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass rounded-xl overflow-hidden"
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-white pr-4 text-sm sm:text-base">
                  {faq.question}
                </span>
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">
                  {openIndex === index ? (
                    <Minus className="w-3 h-3 text-primary" />
                  ) : (
                    <Plus className="w-3 h-3 text-gray-400" />
                  )}
                </div>
              </button>
              <div className={`faq-content ${openIndex === index ? 'open' : ''}`}>
                <div className="px-6 pb-5 text-gray-400 text-sm leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Outras dúvidas?{' '}
            <a
              href="https://wa.me/5512997015595?text=Olá! Tenho uma dúvida sobre a consultoria."
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-light"
            >
              Entre em contato
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
