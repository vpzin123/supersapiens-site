'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, Loader2, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

// DESIGN 5: AURORA/MESH GRADIENT - Flowing gradients, modern Apple-style, elegant
export const QuestionnaireAurora = () => {
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

  const inputClass = "w-full bg-black/30 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-black/40 transition-all text-base backdrop-blur-sm";
  const labelClass = "block text-sm font-medium text-white/50 mb-2";

  return (
    <main className="min-h-screen relative overflow-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=SF+Pro+Display:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
        @keyframes aurora {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10%, 10%) rotate(5deg); }
          50% { transform: translate(-5%, 15%) rotate(-5deg); }
          75% { transform: translate(-10%, 5%) rotate(3deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>

      {/* Animated mesh gradient background */}
      <div className="fixed inset-0 bg-black">
        <div className="absolute inset-0 opacity-60">
          <div className="absolute top-0 left-0 w-[80%] h-[80%] bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 rounded-full blur-[120px]" style={{animation: 'aurora 20s ease-in-out infinite'}} />
          <div className="absolute bottom-0 right-0 w-[70%] h-[70%] bg-gradient-to-br from-purple-600 via-violet-600 to-blue-600 rounded-full blur-[120px]" style={{animation: 'aurora 25s ease-in-out infinite reverse', animationDelay: '5s'}} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 rounded-full blur-[150px] opacity-50" style={{animation: 'aurora 30s ease-in-out infinite', animationDelay: '10s'}} />
        </div>
      </div>

      {/* Noise overlay */}
      <div className="fixed inset-0 opacity-[0.03]" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")'}} />

      {/* Content */}
      <div className="relative z-10 min-h-screen p-4 md:p-8">
        {/* Header */}
        <header className="max-w-2xl mx-auto mb-12 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center" style={{animation: 'float 6s ease-in-out infinite'}}>
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white tracking-tight">SUPERSAPIENS</h1>
                <p className="text-xs text-white/40">Performance & Neurociência</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-white/70">VP</p>
              <p className="text-xs text-white/30">vpneuroscience@icloud.com</p>
            </div>
          </div>
        </header>

        {/* Quote */}
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight leading-tight">
            Never bet against<br/>
            <span className="font-semibold bg-gradient-to-r from-orange-400 via-pink-400 to-violet-400 text-transparent bg-clip-text">technology</span>
          </h2>
        </div>

        {/* Steps indicator */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-2">
            {sections.map((section, index) => (
              <button
                key={section}
                onClick={() => setActiveSection(index)}
                className="group flex items-center"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-500 ${
                  activeSection === index
                    ? 'bg-white text-black scale-110'
                    : index < activeSection
                    ? 'bg-white/20 text-white'
                    : 'bg-white/5 text-white/40'
                }`}>
                  {index + 1}
                </div>
                {index < sections.length - 1 && (
                  <div className={`w-8 h-[2px] mx-1 transition-all duration-500 ${index < activeSection ? 'bg-white/30' : 'bg-white/10'}`} />
                )}
              </button>
            ))}
          </div>
          <p className="text-center text-white/40 text-sm mt-4">{sections[activeSection]}</p>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 md:p-10">

              {activeSection === 0 && (
                <div className="space-y-5">
                  <div><label className={labelClass}>Nome completo</label><input type="text" name="nome" required className={inputClass} placeholder="Como você se chama?" /></div>
                  <div><label className={labelClass}>E-mail</label><input type="email" name="email" required className={inputClass} placeholder="seu@email.com" /></div>
                  <div><label className={labelClass}>WhatsApp</label><input type="tel" name="whatsapp" required className={inputClass} placeholder="(00) 00000-0000" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className={labelClass}>Data de nascimento</label><input type="date" name="data_nascimento" required className={`${inputClass} [color-scheme:dark]`} /></div>
                    <div><label className={labelClass}>Idade</label><input type="number" name="idade" required className={inputClass} placeholder="25" /></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div><label className={labelClass}>Sexo</label>
                      <select name="sexo" required className={inputClass}>
                        <option value="" className="bg-black">Selecione</option>
                        <option value="M" className="bg-black">Masculino</option>
                        <option value="F" className="bg-black">Feminino</option>
                      </select>
                    </div>
                    <div><label className={labelClass}>Altura (cm)</label><input type="number" name="altura" required className={inputClass} placeholder="170" /></div>
                    <div><label className={labelClass}>Peso (kg)</label><input type="number" name="peso" required step="0.1" className={inputClass} placeholder="70" /></div>
                  </div>
                  <div><label className={labelClass}>Qual é o seu objetivo?</label><textarea name="objetivo_principal" required rows={4} className={inputClass} placeholder="Conte-nos o que você deseja alcançar..." /></div>
                </div>
              )}

              {activeSection === 1 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className={labelClass}>Horário que acorda</label><input type="time" name="horario_acordar" className={`${inputClass} [color-scheme:dark]`} /></div>
                    <div><label className={labelClass}>Horário que dorme</label><input type="time" name="horario_dormir" className={`${inputClass} [color-scheme:dark]`} /></div>
                  </div>
                  <div className="bg-gradient-to-br from-white/5 to-white/0 rounded-2xl p-5 border border-white/5">
                    <p className="text-white/50 text-sm mb-4">Como você se sente? (0 a 10)</p>
                    <div className="grid grid-cols-5 gap-3">
                      {[['Sono', 'qualidade_sono'], ['Stress', 'nivel_stress'], ['Ansiedade', 'nivel_ansiedade'], ['Perfeccion.', 'nivel_perfeccionismo'], ['Imediatismo', 'nivel_imediatismo']].map(([label, name]) => (
                        <div key={name} className="text-center">
                          <input type="number" name={name} min="0" max="10" className="w-full bg-black/30 border border-white/10 rounded-xl py-3 text-center text-white text-lg font-medium focus:outline-none focus:border-white/30" placeholder="0" />
                          <label className="text-[10px] text-white/30 mt-1 block">{label}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div><label className={labelClass}>Exercícios que pratica</label><textarea name="exercicios" rows={2} className={inputClass} placeholder="Conte sobre sua rotina de exercícios..." /></div>
                  <div><label className={labelClass}>O que te impede de alcançar seus objetivos?</label><textarea name="motivos_dificuldade" rows={3} className={inputClass} placeholder="Compartilhe suas dificuldades..." /></div>
                </div>
              )}

              {activeSection === 2 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    {[['Mastigação', 'mastigacao', ['Lenta', 'Normal', 'Rápida']],
                      ['Apetite', 'apetite', ['Diminuído', 'Normal', 'Aumentado']],
                      ['Hábito intestinal', 'habito_intestinal', ['Diário', '2-3 dias', 'Constipado']],
                      ['Consistência', 'consistencia_fezes', ['Mole', 'Normal', 'Endurecida']]
                    ].map(([label, name, options]) => (
                      <div key={name as string}>
                        <label className={labelClass}>{label as string}</label>
                        <select name={name as string} className={inputClass}>
                          <option value="" className="bg-black">Selecione</option>
                          {(options as string[]).map(opt => <option key={opt} value={opt.toLowerCase()} className="bg-black">{opt}</option>)}
                        </select>
                      </div>
                    ))}
                  </div>
                  <div><label className={labelClass}>Possui alguma doença?</label><textarea name="doencas" rows={2} className={inputClass} placeholder="Liste suas condições de saúde..." /></div>
                  <div><label className={labelClass}>Medicamentos em uso</label><textarea name="medicamentos" rows={2} className={inputClass} placeholder="Quais medicamentos você toma?" /></div>
                </div>
              )}

              {activeSection === 3 && (
                <div className="space-y-5">
                  <div><label className={labelClass}>Segue alguma dieta especial?</label><textarea name="dieta_especial" rows={2} className={inputClass} placeholder="Vegetariana, low carb, sem glúten..." /></div>
                  <div><label className={labelClass}>Alergias alimentares</label><textarea name="alergias" rows={2} className={inputClass} placeholder="Liste suas alergias..." /></div>
                  <div><label className={labelClass}>Alimentos que você não gosta</label><textarea name="alimentos_nao_gosta" rows={2} className={inputClass} placeholder="O que você evita comer?" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className={labelClass}>Refeições por dia</label><input type="number" name="refeicoes_dia" className={inputClass} placeholder="4" /></div>
                    <div><label className={labelClass}>Litros de água/dia</label><input type="number" name="agua_litros" step="0.1" className={inputClass} placeholder="2.0" /></div>
                  </div>
                  <div><label className={labelClass}>Comidas que você ama</label><textarea name="alimentos_ama" rows={2} className={inputClass} placeholder="Suas favoritas..." /></div>
                </div>
              )}

              {activeSection === 4 && (
                <div className="space-y-5">
                  <div className="bg-gradient-to-r from-orange-500/10 via-pink-500/10 to-violet-500/10 rounded-2xl p-4 border border-white/5">
                    <p className="text-white/70 text-sm">Descreva cada refeição com horário, local e quantidade aproximada.</p>
                  </div>
                  {[1,2,3,4,5,6].map(n => (
                    <div key={n}><label className={labelClass}>{n}ª Refeição</label><textarea name={`refeicao_${n}`} rows={2} className={inputClass} placeholder="Horário - Local - O que comeu..." /></div>
                  ))}
                  <div><label className={labelClass}>Algo mais que gostaria de compartilhar?</label><textarea name="observacoes" rows={3} className={inputClass} placeholder="Observações adicionais..." /></div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-10">
                <button
                  type="button"
                  onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-all ${activeSection === 0 ? 'opacity-0 pointer-events-none' : ''}`}
                >
                  <ArrowLeft className="w-4 h-4" /> Voltar
                </button>

                {activeSection < 4 ? (
                  <button
                    type="button"
                    onClick={() => setActiveSection(activeSection + 1)}
                    className="flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-all shadow-2xl shadow-white/20"
                  >
                    Continuar <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 text-white font-semibold rounded-full hover:scale-105 transition-all shadow-2xl shadow-pink-500/30 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Enviando...</> : <><Send className="w-4 h-4" /> Enviar</>}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <footer className="max-w-2xl mx-auto mt-12 text-center">
          <p className="text-white/20 text-sm">SUPERSAPIENS • Performance & Neurociência</p>
        </footer>
      </div>
    </main>
  );
};
