'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, Loader2, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

// DESIGN 2: GLASSMORPHISM - Frosted glass, gradients, ethereal, premium
export const QuestionnaireGlass = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  const sections = ['Dados', 'Hábitos', 'Saúde', 'Nutrição', '24h'];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch('https://formspree.io/f/xzdrwvnr', {
        method: 'POST', body: formData, headers: { Accept: 'application/json' },
      });
      if (response.ok) router.push('/obrigado');
    } catch {} finally { setIsSubmitting(false); }
  };

  const inputClass = "w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:border-purple-400/50 focus:bg-white/15 transition-all text-base";
  const labelClass = "block text-sm font-medium text-white/70 mb-2";

  return (
    <main className="min-h-screen relative overflow-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Outfit', sans-serif; }
      `}</style>

      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-violet-950 via-purple-900 to-fuchsia-950" />

      {/* Floating orbs */}
      <div className="fixed top-20 left-20 w-96 h-96 bg-purple-500/30 rounded-full blur-[100px] animate-pulse" />
      <div className="fixed bottom-20 right-20 w-80 h-80 bg-fuchsia-500/30 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '1s'}} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/20 rounded-full blur-[150px]" />

      {/* Content */}
      <div className="relative z-10 min-h-screen p-4 md:p-8">
        {/* Header */}
        <header className="max-w-2xl mx-auto mb-8">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">SUPERSAPIENS</h1>
                <p className="text-purple-300/80 text-sm mt-1">Anamnese Nutricional</p>
              </div>
              <div className="text-right">
                <p className="text-purple-300 font-semibold">VP</p>
                <p className="text-xs text-white/50">vpneuroscience@icloud.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Quote */}
        <div className="max-w-2xl mx-auto mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300/60 text-sm uppercase tracking-widest">Filosofia</span>
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <h2 className="text-2xl md:text-4xl font-light text-white/90 italic">
            "Never bet against technology"
          </h2>
        </div>

        {/* Progress Pills */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex justify-center gap-3 flex-wrap">
            {sections.map((section, index) => (
              <button
                key={section}
                onClick={() => setActiveSection(index)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeSection === index
                    ? 'bg-white/20 backdrop-blur-xl text-white border border-white/30 shadow-lg shadow-purple-500/20'
                    : 'bg-white/5 text-white/50 border border-transparent hover:bg-white/10'
                }`}
              >
                {section}
              </button>
            ))}
          </div>
          {/* Progress line */}
          <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-400 to-fuchsia-400 rounded-full transition-all duration-500"
              style={{ width: `${((activeSection + 1) / sections.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl">

              {activeSection === 0 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-purple-500/30 rounded-lg flex items-center justify-center text-sm">01</span>
                    Dados Pessoais
                  </h2>
                  <div><label className={labelClass}>Nome completo</label><input type="text" name="nome" required className={inputClass} placeholder="Seu nome" /></div>
                  <div><label className={labelClass}>E-mail</label><input type="email" name="email" required className={inputClass} placeholder="email@exemplo.com" /></div>
                  <div><label className={labelClass}>WhatsApp</label><input type="tel" name="whatsapp" required className={inputClass} placeholder="(00) 00000-0000" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className={labelClass}>Data Nascimento</label><input type="date" name="data_nascimento" required className={`${inputClass} [color-scheme:dark]`} /></div>
                    <div><label className={labelClass}>Idade</label><input type="number" name="idade" required className={inputClass} placeholder="25" /></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div><label className={labelClass}>Sexo</label>
                      <select name="sexo" required className={inputClass}>
                        <option value="" className="bg-purple-950">Selecione</option>
                        <option value="M" className="bg-purple-950">Masculino</option>
                        <option value="F" className="bg-purple-950">Feminino</option>
                      </select>
                    </div>
                    <div><label className={labelClass}>Altura (cm)</label><input type="number" name="altura" required className={inputClass} placeholder="170" /></div>
                    <div><label className={labelClass}>Peso (kg)</label><input type="number" name="peso" required step="0.1" className={inputClass} placeholder="70" /></div>
                  </div>
                  <div><label className={labelClass}>Objetivo Principal</label><textarea name="objetivo_principal" required rows={3} className={inputClass} placeholder="Descreva seu objetivo..." /></div>
                </div>
              )}

              {activeSection === 1 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-purple-500/30 rounded-lg flex items-center justify-center text-sm">02</span>
                    Hábitos de Vida
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className={labelClass}>Horário que acorda</label><input type="time" name="horario_acordar" className={`${inputClass} [color-scheme:dark]`} /></div>
                    <div><label className={labelClass}>Horário que dorme</label><input type="time" name="horario_dormir" className={`${inputClass} [color-scheme:dark]`} /></div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                    <p className="text-white/60 text-sm mb-4">Avalie de 0 a 10:</p>
                    <div className="grid grid-cols-5 gap-3">
                      {[['Sono', 'qualidade_sono'], ['Stress', 'nivel_stress'], ['Ansiedade', 'nivel_ansiedade'], ['Perfec.', 'nivel_perfeccionismo'], ['Immed.', 'nivel_imediatismo']].map(([label, name]) => (
                        <div key={name}>
                          <label className="text-xs text-white/50 block mb-1 text-center">{label}</label>
                          <input type="number" name={name} min="0" max="10" className="w-full bg-white/10 border border-white/20 rounded-xl py-2 text-center text-white focus:outline-none focus:border-purple-400" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div><label className={labelClass}>Exercícios praticados</label><textarea name="exercicios" rows={2} className={inputClass} placeholder="Tipo e frequência..." /></div>
                  <div><label className={labelClass}>Dificuldades para atingir objetivos</label><textarea name="motivos_dificuldade" rows={3} className={inputClass} placeholder="Descreva..." /></div>
                </div>
              )}

              {activeSection === 2 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-purple-500/30 rounded-lg flex items-center justify-center text-sm">03</span>
                    Dados Clínicos
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {[['Mastigação', 'mastigacao', ['Lenta', 'Normal', 'Rápida']],
                      ['Apetite', 'apetite', ['Diminuído', 'Normal', 'Aumentado']],
                      ['Intestino', 'habito_intestinal', ['Diário', '2-3 dias', 'Constipado']],
                      ['Fezes', 'consistencia_fezes', ['Mole', 'Normal', 'Endurecida']]
                    ].map(([label, name, options]) => (
                      <div key={name as string}>
                        <label className={labelClass}>{label as string}</label>
                        <select name={name as string} className={inputClass}>
                          <option value="" className="bg-purple-950">Selecione</option>
                          {(options as string[]).map(opt => <option key={opt} value={opt.toLowerCase()} className="bg-purple-950">{opt}</option>)}
                        </select>
                      </div>
                    ))}
                  </div>
                  <div><label className={labelClass}>Doenças diagnosticadas</label><textarea name="doencas" rows={2} className={inputClass} placeholder="Liste suas doenças..." /></div>
                  <div><label className={labelClass}>Medicamentos em uso</label><textarea name="medicamentos" rows={2} className={inputClass} placeholder="Liste os medicamentos..." /></div>
                </div>
              )}

              {activeSection === 3 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-purple-500/30 rounded-lg flex items-center justify-center text-sm">04</span>
                    Histórico Nutricional
                  </h2>
                  <div><label className={labelClass}>Segue dieta especial?</label><textarea name="dieta_especial" rows={2} className={inputClass} placeholder="Vegetariana, low carb..." /></div>
                  <div><label className={labelClass}>Alergias alimentares</label><textarea name="alergias" rows={2} className={inputClass} placeholder="Liste alergias..." /></div>
                  <div><label className={labelClass}>Alimentos que NÃO gosta</label><textarea name="alimentos_nao_gosta" rows={2} className={inputClass} placeholder="Liste..." /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className={labelClass}>Refeições por dia</label><input type="number" name="refeicoes_dia" className={inputClass} placeholder="4" /></div>
                    <div><label className={labelClass}>Água (L/dia)</label><input type="number" name="agua_litros" step="0.1" className={inputClass} placeholder="2.0" /></div>
                  </div>
                  <div><label className={labelClass}>Comidas que AMA</label><textarea name="alimentos_ama" rows={2} className={inputClass} placeholder="Favoritas..." /></div>
                </div>
              )}

              {activeSection === 4 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-purple-500/30 rounded-lg flex items-center justify-center text-sm">05</span>
                    Recordatório 24h
                  </h2>
                  <div className="bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 rounded-2xl p-4 border border-white/10">
                    <p className="text-white/80 text-sm">Descreva cada refeição: horário, local e quantidade aproximada.</p>
                  </div>
                  {[1,2,3,4,5,6].map(n => (
                    <div key={n}><label className={labelClass}>{n}ª Refeição</label><textarea name={`refeicao_${n}`} rows={2} className={inputClass} placeholder={`${6+n*3}:00 - Local - Descrição...`} /></div>
                  ))}
                  <div><label className={labelClass}>Observações finais</label><textarea name="observacoes" rows={3} className={inputClass} placeholder="Algo mais..." /></div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-white/70 hover:bg-white/10 transition-all ${activeSection === 0 ? 'opacity-0' : ''}`}
                >
                  <ChevronLeft className="w-5 h-5" /> Voltar
                </button>

                {activeSection < 4 ? (
                  <button
                    type="button"
                    onClick={() => setActiveSection(activeSection + 1)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-400 hover:to-fuchsia-400 text-white font-medium rounded-2xl transition-all shadow-lg shadow-purple-500/30"
                  >
                    Próximo <ChevronRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-400 hover:to-fuchsia-400 disabled:opacity-50 text-white font-medium rounded-2xl transition-all shadow-lg shadow-purple-500/30"
                  >
                    {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Enviando...</> : <><Send className="w-5 h-5" /> Enviar</>}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <footer className="max-w-2xl mx-auto mt-8 text-center">
          <p className="text-white/30 text-sm">SUPERSAPIENS • Performance & Neurociência</p>
        </footer>
      </div>
    </main>
  );
};
