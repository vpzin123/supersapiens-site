'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Send, Loader2, ChevronRight, Terminal, Wifi } from 'lucide-react';

// DESIGN 4: TERMINAL/HACKER - Matrix style, green on black, typing effect
export const QuestionnaireTerminal = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [bootComplete, setBootComplete] = useState(false);
  const [bootText, setBootText] = useState<string[]>([]);

  const bootSequence = [
    '> SUPERSAPIENS SYSTEM v2.0',
    '> Initializing neural interface...',
    '> Loading anamnese protocol...',
    '> Establishing secure connection...',
    '> System ready.',
    '> "Never bet against technology"',
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootSequence.length) {
        setBootText(prev => [...prev, bootSequence[i]]);
        i++;
      } else {
        setBootComplete(true);
        clearInterval(interval);
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const sections = ['[01]_DADOS', '[02]_HÁBITOS', '[03]_CLÍNICOS', '[04]_NUTRIÇÃO', '[05]_24H'];

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

  const inputClass = "w-full bg-transparent border-b-2 border-green-500/50 px-0 py-2 text-green-400 placeholder-green-700 focus:outline-none focus:border-green-400 transition-all font-mono text-sm";
  const labelClass = "block text-xs font-mono text-green-600 mb-1 uppercase";

  if (!bootComplete) {
    return (
      <main className="min-h-screen bg-black p-8 font-mono">
        <div className="max-w-2xl mx-auto">
          <div className="text-green-500 space-y-1">
            {bootText.map((line, i) => (
              <p key={i} className={`${i === bootText.length - 1 ? 'animate-pulse' : ''}`}>{line}</p>
            ))}
            <span className="inline-block w-3 h-5 bg-green-500 animate-pulse" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-green-500 font-mono p-4 md:p-6 relative overflow-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');
        body { font-family: 'JetBrains Mono', monospace; }
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
      `}</style>

      {/* Scanline effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-full h-[2px] bg-green-500/10" style={{animation: 'scanline 8s linear infinite'}} />
      </div>

      {/* Grid background */}
      <div className="fixed inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(green 1px, transparent 1px), linear-gradient(90deg, green 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }} />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        <header className="border border-green-500/30 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Terminal className="w-6 h-6" />
              <div>
                <h1 className="text-xl font-bold tracking-wider">SUPERSAPIENS://</h1>
                <p className="text-xs text-green-600">anamnese_protocol_v2.0</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1"><Wifi className="w-3 h-3" /> CONNECTED</span>
              <span className="text-green-600">|</span>
              <span>user: VP</span>
            </div>
          </div>
        </header>

        {/* Status bar */}
        <div className="flex items-center gap-2 mb-4 text-xs text-green-600 overflow-x-auto">
          {sections.map((section, index) => (
            <button
              key={section}
              onClick={() => setActiveSection(index)}
              className={`px-3 py-1 border transition-all whitespace-nowrap ${
                activeSection === index
                  ? 'border-green-400 text-green-400 bg-green-500/10'
                  : 'border-green-500/30 hover:border-green-500/50'
              }`}
            >
              {section}
            </button>
          ))}
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-green-600 mb-1">
            <span>PROGRESS</span>
            <span>{Math.round(((activeSection + 1) / sections.length) * 100)}%</span>
          </div>
          <div className="h-1 bg-green-500/20">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${((activeSection + 1) / sections.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="border border-green-500/30 p-6">
            <div className="text-xs text-green-600 mb-4">
              {'>'} executing section_{activeSection + 1}.sh
            </div>

            {activeSection === 0 && (
              <div className="space-y-4">
                <p className="text-green-600 text-sm mb-6"># Dados Pessoais - Identificação do usuário</p>
                <div><label className={labelClass}>$ nome_completo:</label><input type="text" name="nome" required className={inputClass} placeholder="string" /></div>
                <div><label className={labelClass}>$ email:</label><input type="email" name="email" required className={inputClass} placeholder="user@domain.com" /></div>
                <div><label className={labelClass}>$ whatsapp:</label><input type="tel" name="whatsapp" required className={inputClass} placeholder="+55..." /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={labelClass}>$ data_nascimento:</label><input type="date" name="data_nascimento" required className={`${inputClass} [color-scheme:dark]`} /></div>
                  <div><label className={labelClass}>$ idade:</label><input type="number" name="idade" required className={inputClass} placeholder="int" /></div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div><label className={labelClass}>$ sexo:</label>
                    <select name="sexo" required className={`${inputClass} bg-black`}>
                      <option value="">null</option>
                      <option value="M">M</option>
                      <option value="F">F</option>
                    </select>
                  </div>
                  <div><label className={labelClass}>$ altura_cm:</label><input type="number" name="altura" required className={inputClass} placeholder="int" /></div>
                  <div><label className={labelClass}>$ peso_kg:</label><input type="number" name="peso" required step="0.1" className={inputClass} placeholder="float" /></div>
                </div>
                <div><label className={labelClass}>$ objetivo_principal:</label><textarea name="objetivo_principal" required rows={3} className={inputClass} placeholder="// descreva seu objetivo" /></div>
              </div>
            )}

            {activeSection === 1 && (
              <div className="space-y-4">
                <p className="text-green-600 text-sm mb-6"># Hábitos de Vida - Análise comportamental</p>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={labelClass}>$ horario_acordar:</label><input type="time" name="horario_acordar" className={`${inputClass} [color-scheme:dark]`} /></div>
                  <div><label className={labelClass}>$ horario_dormir:</label><input type="time" name="horario_dormir" className={`${inputClass} [color-scheme:dark]`} /></div>
                </div>
                <div className="border border-green-500/20 p-4">
                  <p className="text-xs text-green-600 mb-3">// performance_metrics (0-10)</p>
                  <div className="grid grid-cols-5 gap-2">
                    {[['sono', 'SONO'], ['stress', 'STRESS'], ['ansiedade', 'ANSIED'], ['perfeccionismo', 'PERFEC'], ['imediatismo', 'IMMED']].map(([name, label]) => (
                      <div key={name}>
                        <label className="text-[10px] text-green-600 block">{label}</label>
                        <input type="number" name={`nivel_${name}`} min="0" max="10" className="w-full bg-black border border-green-500/30 p-1 text-center text-sm text-green-400" />
                      </div>
                    ))}
                  </div>
                </div>
                <div><label className={labelClass}>$ exercicios:</label><textarea name="exercicios" rows={2} className={inputClass} placeholder="// tipo e frequência" /></div>
                <div><label className={labelClass}>$ obstaculos:</label><textarea name="motivos_dificuldade" rows={3} className={inputClass} placeholder="// análise de dificuldades" /></div>
              </div>
            )}

            {activeSection === 2 && (
              <div className="space-y-4">
                <p className="text-green-600 text-sm mb-6"># Dados Clínicos - Diagnóstico do sistema</p>
                <div className="grid grid-cols-2 gap-4">
                  {[['mastigacao', 'MASTIGAÇÃO', ['lenta', 'normal', 'rapida']],
                    ['apetite', 'APETITE', ['diminuido', 'normal', 'aumentado']],
                    ['habito_intestinal', 'INTESTINO', ['diario', '2-3_dias', 'constipado']],
                    ['consistencia_fezes', 'FEZES', ['mole', 'normal', 'endurecida']]
                  ].map(([name, label, options]) => (
                    <div key={name as string}>
                      <label className={labelClass}>$ {name}:</label>
                      <select name={name as string} className={`${inputClass} bg-black`}>
                        <option value="">null</option>
                        {(options as string[]).map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
                <div><label className={labelClass}>$ doencas:</label><textarea name="doencas" rows={2} className={inputClass} placeholder="// array de doenças" /></div>
                <div><label className={labelClass}>$ medicamentos:</label><textarea name="medicamentos" rows={2} className={inputClass} placeholder="// array de medicamentos" /></div>
              </div>
            )}

            {activeSection === 3 && (
              <div className="space-y-4">
                <p className="text-green-600 text-sm mb-6"># Histórico Nutricional - Padrões alimentares</p>
                <div><label className={labelClass}>$ dieta_especial:</label><textarea name="dieta_especial" rows={2} className={inputClass} placeholder="// vegetariana, low_carb, etc" /></div>
                <div><label className={labelClass}>$ alergias:</label><textarea name="alergias" rows={2} className={inputClass} placeholder="// array de alergias" /></div>
                <div><label className={labelClass}>$ alimentos_rejeitados:</label><textarea name="alimentos_nao_gosta" rows={2} className={inputClass} placeholder="// blacklist" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={labelClass}>$ refeicoes_dia:</label><input type="number" name="refeicoes_dia" className={inputClass} placeholder="int" /></div>
                  <div><label className={labelClass}>$ agua_litros:</label><input type="number" name="agua_litros" step="0.1" className={inputClass} placeholder="float" /></div>
                </div>
                <div><label className={labelClass}>$ alimentos_favoritos:</label><textarea name="alimentos_ama" rows={2} className={inputClass} placeholder="// whitelist" /></div>
              </div>
            )}

            {activeSection === 4 && (
              <div className="space-y-4">
                <p className="text-green-600 text-sm mb-6"># Recordatório 24h - Log alimentar</p>
                <div className="border border-green-400/50 p-3 text-xs text-green-400 mb-4">
                  [INFO] Formato: timestamp - local - descrição
                </div>
                {[1,2,3,4,5,6].map(n => (
                  <div key={n}><label className={labelClass}>$ refeicao[{n-1}]:</label><textarea name={`refeicao_${n}`} rows={2} className={inputClass} placeholder={`// ${String(6+n*3).padStart(2,'0')}:00 - local - alimentos`} /></div>
                ))}
                <div><label className={labelClass}>$ observacoes:</label><textarea name="observacoes" rows={3} className={inputClass} placeholder="// comentários adicionais" /></div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-4 border-t border-green-500/20">
              <button
                type="button"
                onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
                className={`text-green-600 hover:text-green-400 text-sm ${activeSection === 0 ? 'opacity-0' : ''}`}
              >
                {'<'} back
              </button>

              {activeSection < 4 ? (
                <button
                  type="button"
                  onClick={() => setActiveSection(activeSection + 1)}
                  className="flex items-center gap-2 px-4 py-2 border border-green-500 text-green-400 hover:bg-green-500/10 transition-all text-sm"
                >
                  next <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-2 bg-green-500 text-black font-bold hover:bg-green-400 transition-all text-sm disabled:opacity-50"
                >
                  {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> TRANSMITTING...</> : <><Send className="w-4 h-4" /> SUBMIT</>}
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Footer */}
        <footer className="mt-6 text-center text-xs text-green-700">
          <p>SUPERSAPIENS™ // performance.neuroscience.protocol</p>
          <p className="mt-1">connection: secure | encryption: enabled</p>
        </footer>
      </div>
    </main>
  );
};
