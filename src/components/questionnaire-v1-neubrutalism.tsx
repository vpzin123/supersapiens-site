'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, Loader2, ArrowRight, ArrowLeft } from 'lucide-react';

// DESIGN 1: NEUBRUTALISM - Bold, raw, chunky borders, offset shadows, vibrant
export const QuestionnaireNeubrutalism = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  const sections = ['DADOS', 'HÁBITOS', 'SAÚDE', 'NUTRIÇÃO', '24H'];

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

  const inputClass = "w-full bg-white border-4 border-black px-4 py-3 text-black placeholder-gray-500 focus:outline-none focus:bg-yellow-100 transition-all text-lg font-medium";
  const labelClass = "block text-sm font-black text-black mb-2 uppercase";

  return (
    <main className="min-h-screen bg-[#FF6B35] p-4 md:p-8">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        body { font-family: 'Space Grotesk', sans-serif; }
      `}</style>

      {/* Header Card */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="bg-black text-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_#FFE66D]">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">SUPERSAPIENS</h1>
              <p className="text-[#FFE66D] font-bold mt-1">ANAMNESE NUTRICIONAL</p>
            </div>
            <div className="text-right">
              <p className="text-[#FFE66D] font-bold">VP</p>
              <p className="text-xs text-gray-400">vpneuroscience@icloud.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quote */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="bg-[#FFE66D] border-4 border-black p-4 shadow-[6px_6px_0px_0px_#000] rotate-[-1deg]">
          <p className="text-xl md:text-2xl font-black text-black text-center">
            "NEVER BET AGAINST TECHNOLOGY"
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex gap-2">
          {sections.map((section, index) => (
            <button
              key={section}
              onClick={() => setActiveSection(index)}
              className={`flex-1 py-3 border-4 border-black font-black text-xs md:text-sm transition-all ${
                activeSection === index
                  ? 'bg-black text-white shadow-[4px_4px_0px_0px_#FFE66D]'
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              {section}
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] p-6 md:p-8">

            {activeSection === 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-black border-b-4 border-black pb-2 mb-6">DADOS PESSOAIS</h2>
                <div><label className={labelClass}>Nome completo</label><input type="text" name="nome" required className={inputClass} /></div>
                <div><label className={labelClass}>E-mail</label><input type="email" name="email" required className={inputClass} /></div>
                <div><label className={labelClass}>WhatsApp</label><input type="tel" name="whatsapp" required className={inputClass} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={labelClass}>Idade</label><input type="number" name="idade" required className={inputClass} /></div>
                  <div><label className={labelClass}>Sexo</label>
                    <select name="sexo" required className={inputClass}>
                      <option value="">Selecione</option>
                      <option value="M">Masculino</option>
                      <option value="F">Feminino</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={labelClass}>Altura (cm)</label><input type="number" name="altura" required className={inputClass} /></div>
                  <div><label className={labelClass}>Peso (kg)</label><input type="number" name="peso" required step="0.1" className={inputClass} /></div>
                </div>
                <div><label className={labelClass}>Objetivo Principal</label><textarea name="objetivo_principal" required rows={3} className={inputClass} /></div>
              </div>
            )}

            {activeSection === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-black border-b-4 border-black pb-2 mb-6">HÁBITOS DE VIDA</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={labelClass}>Acorda</label><input type="time" name="horario_acordar" className={`${inputClass} [color-scheme:light]`} /></div>
                  <div><label className={labelClass}>Dorme</label><input type="time" name="horario_dormir" className={`${inputClass} [color-scheme:light]`} /></div>
                </div>
                <div className="bg-[#FFE66D] border-4 border-black p-4">
                  <p className="font-black mb-4">AVALIE 0-10:</p>
                  <div className="grid grid-cols-5 gap-2">
                    {['Sono', 'Stress', 'Ansied.', 'Perfec.', 'Immed.'].map((item, i) => (
                      <div key={i}>
                        <label className="text-xs font-bold block mb-1">{item}</label>
                        <input type="number" name={`nivel_${item.toLowerCase()}`} min="0" max="10" className="w-full border-2 border-black p-2 text-center font-bold" />
                      </div>
                    ))}
                  </div>
                </div>
                <div><label className={labelClass}>Exercícios</label><textarea name="exercicios" rows={2} className={inputClass} /></div>
                <div><label className={labelClass}>Dificuldades para atingir objetivos</label><textarea name="motivos_dificuldade" rows={3} className={inputClass} /></div>
              </div>
            )}

            {activeSection === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-black border-b-4 border-black pb-2 mb-6">DADOS CLÍNICOS</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[['Mastigação', 'mastigacao', ['Lenta', 'Normal', 'Rápida']],
                    ['Apetite', 'apetite', ['Diminuído', 'Normal', 'Aumentado']],
                    ['Intestino', 'habito_intestinal', ['Diário', '2-3 dias', 'Constipado']],
                    ['Fezes', 'consistencia_fezes', ['Mole', 'Normal', 'Endurecida']]
                  ].map(([label, name, options]) => (
                    <div key={name as string}>
                      <label className={labelClass}>{label as string}</label>
                      <select name={name as string} className={inputClass}>
                        <option value="">Selecione</option>
                        {(options as string[]).map(opt => <option key={opt} value={opt.toLowerCase()}>{opt}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
                <div><label className={labelClass}>Doenças</label><textarea name="doencas" rows={2} className={inputClass} /></div>
                <div><label className={labelClass}>Medicamentos</label><textarea name="medicamentos" rows={2} className={inputClass} /></div>
              </div>
            )}

            {activeSection === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-black border-b-4 border-black pb-2 mb-6">HISTÓRICO NUTRICIONAL</h2>
                <div><label className={labelClass}>Dieta especial?</label><textarea name="dieta_especial" rows={2} className={inputClass} /></div>
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
              <div className="space-y-6">
                <h2 className="text-2xl font-black border-b-4 border-black pb-2 mb-6">RECORDATÓRIO 24H</h2>
                <div className="bg-[#FF6B35] text-white border-4 border-black p-3 mb-4">
                  <p className="font-bold text-sm">Descreva cada refeição: horário, local, quantidade</p>
                </div>
                {[1,2,3,4,5,6].map(n => (
                  <div key={n}>
                    <label className={labelClass}>{n}ª Refeição</label>
                    <textarea name={`refeicao_${n}`} rows={2} className={inputClass} />
                  </div>
                ))}
                <div><label className={labelClass}>Observações</label><textarea name="observacoes" rows={3} className={inputClass} /></div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t-4 border-black">
              <button
                type="button"
                onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
                className={`flex items-center gap-2 px-6 py-3 bg-white border-4 border-black font-black hover:shadow-[4px_4px_0px_0px_#000] transition-all ${activeSection === 0 ? 'opacity-0' : ''}`}
              >
                <ArrowLeft className="w-5 h-5" /> VOLTAR
              </button>

              {activeSection < 4 ? (
                <button
                  type="button"
                  onClick={() => setActiveSection(activeSection + 1)}
                  className="flex items-center gap-2 px-6 py-3 bg-[#FFE66D] border-4 border-black font-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                >
                  PRÓXIMO <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-3 bg-black text-white border-4 border-black font-black shadow-[4px_4px_0px_0px_#FFE66D] hover:shadow-[6px_6px_0px_0px_#FFE66D] transition-all"
                >
                  {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> ENVIANDO...</> : <><Send className="w-5 h-5" /> ENVIAR</>}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="max-w-2xl mx-auto mt-8 text-center">
        <p className="text-black font-bold">SUPERSAPIENS • PERFORMANCE & NEUROCIÊNCIA</p>
      </div>
    </main>
  );
};
