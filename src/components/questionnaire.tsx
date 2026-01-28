'use client';

import { useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';

export const Questionnaire = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xzdrwvnr', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
      } else {
        setError('Erro ao enviar. Tente novamente ou entre em contato pelo WhatsApp.');
      }
    } catch {
      setError('Erro ao enviar. Tente novamente ou entre em contato pelo WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="questionario" className="relative py-24 sm:py-32 bg-[#080808]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="glass-strong rounded-3xl p-12">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h3 className="font-display text-2xl font-bold text-white mb-4">
              Questionário enviado com sucesso!
            </h3>
            <p className="text-gray-400">
              Recebi suas informações e entrarei em contato em breve pelo WhatsApp.
              Obrigado pela confiança!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="questionario" className="relative py-24 sm:py-32 bg-[#080808]">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="tag text-primary font-semibold mb-4 block">
            Vamos começar
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Questionário <span className="gradient-text">inicial</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Preencha com atenção para que eu possa criar o melhor protocolo para você.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="glass-strong rounded-3xl p-8 sm:p-10 space-y-8">
          {/* Dados Pessoais */}
          <div>
            <h3 className="font-display text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm">1</span>
              Dados Pessoais
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Nome completo *</label>
                <input
                  type="text"
                  name="nome"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">WhatsApp *</label>
                <input
                  type="tel"
                  name="whatsapp"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Idade *</label>
                <input
                  type="number"
                  name="idade"
                  required
                  min="10"
                  max="100"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="25"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Sexo biológico *</label>
                <select
                  name="sexo"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                >
                  <option value="" className="bg-dark">Selecione</option>
                  <option value="masculino" className="bg-dark">Masculino</option>
                  <option value="feminino" className="bg-dark">Feminino</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Profissão</label>
                <input
                  type="text"
                  name="profissao"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="Sua profissão"
                />
              </div>
            </div>
          </div>

          {/* Medidas */}
          <div>
            <h3 className="font-display text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm">2</span>
              Medidas Atuais
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Peso atual (kg) *</label>
                <input
                  type="number"
                  name="peso"
                  required
                  step="0.1"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="70.0"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Altura (cm) *</label>
                <input
                  type="number"
                  name="altura"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="170"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Peso desejado (kg)</label>
                <input
                  type="number"
                  name="peso_desejado"
                  step="0.1"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="65.0"
                />
              </div>
            </div>
          </div>

          {/* Objetivo */}
          <div>
            <h3 className="font-display text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm">3</span>
              Objetivo Principal
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {['Emagrecimento', 'Hipertrofia', 'Qualidade de vida'].map((objetivo) => (
                <label key={objetivo} className="cursor-pointer">
                  <input
                    type="radio"
                    name="objetivo"
                    value={objetivo.toLowerCase()}
                    required
                    className="peer hidden"
                  />
                  <div className="p-4 rounded-xl border border-white/10 text-center text-gray-400 peer-checked:border-primary peer-checked:text-primary peer-checked:bg-primary/10 transition-all hover:border-white/20">
                    {objetivo}
                  </div>
                </label>
              ))}
            </div>
            <div className="mt-4">
              <label className="block text-sm text-gray-400 mb-2">Descreva melhor seu objetivo</label>
              <textarea
                name="objetivo_descricao"
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                placeholder="Ex: Quero perder gordura abdominal, ganhar definição muscular, ter mais energia no dia a dia..."
              />
            </div>
          </div>

          {/* Rotina */}
          <div>
            <h3 className="font-display text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm">4</span>
              Rotina e Atividade Física
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Nível de atividade física *</label>
                <select
                  name="nivel_atividade"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                >
                  <option value="" className="bg-dark">Selecione</option>
                  <option value="sedentario" className="bg-dark">Sedentário (não pratico exercícios)</option>
                  <option value="leve" className="bg-dark">Leve (1-2x por semana)</option>
                  <option value="moderado" className="bg-dark">Moderado (3-4x por semana)</option>
                  <option value="intenso" className="bg-dark">Intenso (5-6x por semana)</option>
                  <option value="muito_intenso" className="bg-dark">Muito intenso (todos os dias)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Quais atividades você pratica?</label>
                <input
                  type="text"
                  name="atividades"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="Ex: Musculação, corrida, natação, crossfit..."
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Como é sua rotina de trabalho?</label>
                <textarea
                  name="rotina_trabalho"
                  rows={2}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  placeholder="Ex: Trabalho sentado 8h por dia, viajo muito, trabalho em turnos..."
                />
              </div>
            </div>
          </div>

          {/* Alimentação */}
          <div>
            <h3 className="font-display text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm">5</span>
              Alimentação
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Quantas refeições você faz por dia?</label>
                <select
                  name="refeicoes_dia"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                >
                  <option value="" className="bg-dark">Selecione</option>
                  <option value="2" className="bg-dark">2 refeições</option>
                  <option value="3" className="bg-dark">3 refeições</option>
                  <option value="4" className="bg-dark">4 refeições</option>
                  <option value="5" className="bg-dark">5 refeições</option>
                  <option value="6+" className="bg-dark">6 ou mais</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Tem alguma restrição alimentar ou alergia?</label>
                <input
                  type="text"
                  name="restricoes"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="Ex: Intolerância à lactose, alergia a frutos do mar, vegetariano..."
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Alimentos que você NÃO gosta ou não come</label>
                <input
                  type="text"
                  name="alimentos_nao_gosta"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="Ex: Berinjela, fígado, peixe..."
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Descreva como é sua alimentação atual</label>
                <textarea
                  name="alimentacao_atual"
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  placeholder="Descreva o que você costuma comer no café da manhã, almoço, jantar e lanches..."
                />
              </div>
            </div>
          </div>

          {/* Saúde */}
          <div>
            <h3 className="font-display text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm">6</span>
              Saúde
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Possui alguma condição de saúde?</label>
                <input
                  type="text"
                  name="condicoes_saude"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="Ex: Diabetes, hipertensão, hipotireoidismo, ansiedade..."
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Usa algum medicamento ou suplemento?</label>
                <input
                  type="text"
                  name="medicamentos"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="Ex: Anticoncepcional, antidepressivo, whey protein, creatina..."
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Como está seu sono?</label>
                <select
                  name="qualidade_sono"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                >
                  <option value="" className="bg-dark">Selecione</option>
                  <option value="ruim" className="bg-dark">Ruim (durmo mal, acordo cansado)</option>
                  <option value="regular" className="bg-dark">Regular (poderia ser melhor)</option>
                  <option value="bom" className="bg-dark">Bom (durmo bem na maioria das noites)</option>
                  <option value="excelente" className="bg-dark">Excelente (durmo muito bem)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Quantas horas você dorme por noite em média?</label>
                <input
                  type="text"
                  name="horas_sono"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="Ex: 6 horas, 7-8 horas..."
                />
              </div>
            </div>
          </div>

          {/* Observações */}
          <div>
            <h3 className="font-display text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm">7</span>
              Observações Finais
            </h3>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Algo mais que você gostaria de me contar?</label>
              <textarea
                name="observacoes"
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                placeholder="Histórico de dietas anteriores, dificuldades, expectativas, dúvidas..."
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-modern w-full bg-primary hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                Enviar questionário
                <Send className="w-5 h-5" />
              </>
            )}
          </button>

          <p className="text-center text-gray-500 text-xs">
            Suas informações são confidenciais e serão usadas apenas para criar seu protocolo.
          </p>
        </form>
      </div>
    </section>
  );
};
