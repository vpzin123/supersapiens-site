'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, Loader2, ArrowRight, User, Activity, Heart, Apple, Clock, Zap } from 'lucide-react';

// DESIGN 3: BENTO GRID - Japanese-inspired grid, asymmetric cards, clean
export const QuestionnaireBento = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    { icon: User, title: 'Dados', color: 'from-orange-500 to-red-500' },
    { icon: Activity, title: 'Hábitos', color: 'from-blue-500 to-cyan-500' },
    { icon: Heart, title: 'Saúde', color: 'from-pink-500 to-rose-500' },
    { icon: Apple, title: 'Nutrição', color: 'from-green-500 to-emerald-500' },
    { icon: Clock, title: '24h', color: 'from-violet-500 to-purple-500' },
  ];

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

  const inputClass = "w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 focus:bg-neutral-800 transition-all";
  const labelClass = "block text-xs font-medium text-neutral-400 mb-1.5 uppercase tracking-wider";

  return (
    <main className="min-h-screen bg-neutral-950 text-white p-4 md:p-6">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Bento Header Grid */}
        <div className="grid grid-cols-4 md:grid-cols-6 gap-3 mb-6">
          {/* Logo Card */}
          <div className="col-span-2 row-span-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">SUPER<br/>SAPIENS</h1>
              <p className="text-white/70 text-sm mt-2">Performance & Neurociência</p>
            </div>
            <Zap className="w-8 h-8 text-white/50" />
          </div>

          {/* Quote Card */}
          <div className="col-span-2 md:col-span-3 bg-neutral-900 rounded-3xl p-5 border border-neutral-800">
            <p className="text-lg md:text-xl font-medium text-white/90">"Never bet against technology"</p>
            <p className="text-neutral-500 text-sm mt-2">Anamnese Nutricional</p>
          </div>

          {/* Contact Card */}
          <div className="col-span-2 md:col-span-1 bg-neutral-900 rounded-3xl p-4 border border-neutral-800 flex flex-col justify-center">
            <p className="text-orange-400 font-semibold">VP</p>
            <p className="text-neutral-500 text-[10px] mt-1 break-all">vpneuroscience@icloud.com</p>
          </div>

          {/* Nav Cards */}
          {sections.map((section, index) => (
            <button
              key={section.title}
              onClick={() => setActiveSection(index)}
              className={`aspect-square rounded-2xl p-3 flex flex-col items-center justify-center gap-2 transition-all ${
                activeSection === index
                  ? `bg-gradient-to-br ${section.color} shadow-lg`
                  : 'bg-neutral-900 border border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <section.icon className={`w-5 h-5 ${activeSection === index ? 'text-white' : 'text-neutral-500'}`} />
              <span className={`text-[10px] font-medium ${activeSection === index ? 'text-white' : 'text-neutral-500'}`}>{section.title}</span>
            </button>
          ))}

          {/* Progress indicator */}
          <div className="col-span-4 md:col-span-1 bg-neutral-900 rounded-2xl p-3 border border-neutral-800 flex items-center justify-center">
            <div className="text-center">
              <span className="text-2xl font-bold text-white">{activeSection + 1}</span>
              <span className="text-neutral-500">/5</span>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit}>
          <div className="bg-neutral-900 rounded-3xl p-6 md:p-8 border border-neutral-800">

            {activeSection === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 mb-4">
                  <h2 className="text-xl font-semibold flex items-center gap-3">
                    <span className={`w-10 h-10 bg-gradient-to-br ${sections[0].color} rounded-xl flex items-center justify-center`}>
                      <User className="w-5 h-5" />
                    </span>
                    Dados Pessoais
                  </h2>
                </div>
                <div className="md:col-span-2"><label className={labelClass}>Nome completo</label><input type="text" name="nome" required className={inputClass} /></div>
                <div><label className={labelClass}>E-mail</label><input type="email" name="email" required className={inputClass} /></div>
                <div><label className={labelClass}>WhatsApp</label><input type="tel" name="whatsapp" required className={inputClass} /></div>
                <div><label className={labelClass}>Data Nascimento</label><input type="date" name="data_nascimento" required className={`${inputClass} [color-scheme:dark]`} /></div>
                <div><label className={labelClass}>Idade</label><input type="number" name="idade" required className={inputClass} /></div>
                <div><label className={labelClass}>Sexo</label>
                  <select name="sexo" required className={inputClass}>
                    <option value="" className="bg-neutral-900">Selecione</option>
                    <option value="M" className="bg-neutral-900">Masculino</option>
                    <option value="F" className="bg-neutral-900">Feminino</option>
                  </select>
                </div>
                <div><label className={labelClass}>Profissão</label><input type="text" name="profissao" required className={inputClass} /></div>
                <div><label className={labelClass}>Altura (cm)</label><input type="number" name="altura" required className={inputClass} /></div>
                <div><label className={labelClass}>Peso atual (kg)</label><input type="number" name="peso" required step="0.1" className={inputClass} /></div>
                <div className="md:col-span-2"><label className={labelClass}>Objetivo Principal</label><textarea name="objetivo_principal" required rows={3} className={inputClass} /></div>
              </div>
            )}

            {activeSection === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-3 mb-6">
                  <span className={`w-10 h-10 bg-gradient-to-br ${sections[1].color} rounded-xl flex items-center justify-center`}>
                    <Activity className="w-5 h-5" />
                  </span>
                  Hábitos de Vida
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={labelClass}>Horário acordar</label><input type="time" name="horario_acordar" className={`${inputClass} [color-scheme:dark]`} /></div>
                  <div><label className={labelClass}>Horário dormir</label><input type="time" name="horario_dormir" className={`${inputClass} [color-scheme:dark]`} /></div>
                </div>
                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-4 border border-blue-500/20">
                  <p className="text-sm text-blue-300 mb-3">Avalie de 0 a 10:</p>
                  <div className="grid grid-cols-5 gap-2">
                    {['Sono', 'Stress', 'Ansied.', 'Perfec.', 'Immed.'].map((item) => (
                      <div key={item} className="text-center">
                        <label className="text-[10px] text-neutral-400 block mb-1">{item}</label>
                        <input type="number" name={`nivel_${item.toLowerCase()}`} min="0" max="10" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg py-2 text-center text-sm" />
                      </div>
                    ))}
                  </div>
                </div>
                <div><label className={labelClass}>Exercícios praticados</label><textarea name="exercicios" rows={2} className={inputClass} /></div>
                <div><label className={labelClass}>Dificuldades para objetivos</label><textarea name="motivos_dificuldade" rows={3} className={inputClass} /></div>
              </div>
            )}

            {activeSection === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-3 mb-6">
                  <span className={`w-10 h-10 bg-gradient-to-br ${sections[2].color} rounded-xl flex items-center justify-center`}>
                    <Heart className="w-5 h-5" />
                  </span>
                  Dados Clínicos
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[['Mastigação', 'mastigacao', ['Lenta', 'Normal', 'Rápida']],
                    ['Apetite', 'apetite', ['Diminuído', 'Normal', 'Aumentado']],
                    ['Intestino', 'habito_intestinal', ['Diário', '2-3 dias', 'Constipado']],
                    ['Fezes', 'consistencia_fezes', ['Mole', 'Normal', 'Endurecida']]
                  ].map(([label, name, options]) => (
                    <div key={name as string}>
                      <label className={labelClass}>{label as string}</label>
                      <select name={name as string} className={inputClass}>
                        <option value="" className="bg-neutral-900">-</option>
                        {(options as string[]).map(opt => <option key={opt} value={opt.toLowerCase()} className="bg-neutral-900">{opt}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
                <div><label className={labelClass}>Doenças</label><textarea name="doencas" rows={2} className={inputClass} /></div>
                <div><label className={labelClass}>Medicamentos</label><textarea name="medicamentos" rows={2} className={inputClass} /></div>
              </div>
            )}

            {activeSection === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-3 mb-6">
                  <span className={`w-10 h-10 bg-gradient-to-br ${sections[3].color} rounded-xl flex items-center justify-center`}>
                    <Apple className="w-5 h-5" />
                  </span>
                  Histórico Nutricional
                </h2>
                <div><label className={labelClass}>Dieta especial</label><textarea name="dieta_especial" rows={2} className={inputClass} /></div>
                <div><label className={labelClass}>Alergias</label><textarea name="alergias" rows={2} className={inputClass} /></div>
                <div><label className={labelClass}>Alimentos que NÃO gosta</label><textarea name="alimentos_nao_gosta" rows={2} className={inputClass} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={labelClass}>Refeições/dia</label><input type="number" name="refeicoes_dia" className={inputClass} /></div>
                  <div><label className={labelClass}>Água (L/dia)</label><input type="number" name="agua_litros" step="0.1" className={inputClass} /></div>
                </div>
                <div><label className={labelClass}>Comidas que AMA</label><textarea name="alimentos_ama" rows={2} className={inputClass} /></div>
              </div>
            )}

            {activeSection === 4 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-3 mb-6">
                  <span className={`w-10 h-10 bg-gradient-to-br ${sections[4].color} rounded-xl flex items-center justify-center`}>
                    <Clock className="w-5 h-5" />
                  </span>
                  Recordatório 24h
                </h2>
                <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-3">
                  <p className="text-violet-300 text-sm">Descreva: horário, local, quantidade.</p>
                </div>
                {[1,2,3,4,5,6].map(n => (
                  <div key={n}><label className={labelClass}>{n}ª Refeição</label><textarea name={`refeicao_${n}`} rows={2} className={inputClass} /></div>
                ))}
                <div><label className={labelClass}>Observações</label><textarea name="observacoes" rows={3} className={inputClass} /></div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
                className={`px-5 py-3 text-neutral-400 hover:text-white transition-all ${activeSection === 0 ? 'opacity-0' : ''}`}
              >
                ← Voltar
              </button>

              {activeSection < 4 ? (
                <button
                  type="button"
                  onClick={() => setActiveSection(activeSection + 1)}
                  className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${sections[activeSection].color} text-white font-medium rounded-xl transition-all hover:opacity-90`}
                >
                  Próximo <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white font-medium rounded-xl transition-all hover:opacity-90 disabled:opacity-50"
                >
                  {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Enviando...</> : <><Send className="w-4 h-4" /> Enviar</>}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};
