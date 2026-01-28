'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, Loader2, ChevronRight, User, Activity, Stethoscope, Apple, ClipboardList } from 'lucide-react';

export const QuestionnaireModel2 = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    { id: 'dados', icon: User, title: 'Dados' },
    { id: 'habitos', icon: Activity, title: 'Hábitos' },
    { id: 'clinicos', icon: Stethoscope, title: 'Clínicos' },
    { id: 'nutricional', icon: Apple, title: 'Nutricional' },
    { id: 'recordatorio', icon: ClipboardList, title: 'Recordatório' },
  ];

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
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        router.push('/obrigado');
      } else {
        setError('Erro ao enviar. Tente novamente.');
      }
    } catch {
      setError('Erro ao enviar. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:bg-white/10 transition-all text-sm";
  const labelClass = "block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide";
  const selectClass = "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-all appearance-none cursor-pointer text-sm";

  return (
    <main className="min-h-screen bg-[#1a1a1a] font-['Montserrat',sans-serif] relative">
      {/* Google Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&display=swap');
      `}</style>

      {/* Corner Decorations */}
      <div className="fixed top-3 left-3 w-16 h-16 md:w-20 md:h-20 border-l-2 border-t-2 border-amber-500/10 pointer-events-none" />
      <div className="fixed top-3 right-3 w-16 h-16 md:w-20 md:h-20 border-r-2 border-t-2 border-amber-500/10 pointer-events-none" />
      <div className="fixed bottom-3 left-3 w-16 h-16 md:w-20 md:h-20 border-l-2 border-b-2 border-amber-500/10 pointer-events-none" />
      <div className="fixed bottom-3 right-3 w-16 h-16 md:w-20 md:h-20 border-r-2 border-b-2 border-amber-500/10 pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm border-b-2" style={{ borderImage: 'linear-gradient(90deg, #FFD700, #FFA500, #FFD700) 1' }}>
        <div className="max-w-4xl mx-auto px-4 py-4 md:py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
            <a href="/" className="flex flex-col">
              <span
                className="text-2xl md:text-3xl font-black tracking-wider"
                style={{
                  background: 'linear-gradient(180deg, #FFD700 0%, #FFA500 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                SUPERSAPIENS
              </span>
              <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-[0.2em]">
                Performance & Neurociência
              </span>
            </a>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-amber-400">Vitor Paulo</p>
              <p className="text-xs text-gray-500">Especialista em Performance</p>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Navigation */}
      <div className="sticky top-[73px] md:top-[81px] z-40 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center gap-1.5 md:gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {sections.map((section, index) => (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveSection(index)}
                className={`flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-full whitespace-nowrap transition-all text-xs md:text-sm ${
                  activeSection === index
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                <section.icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span className="font-medium">{section.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* DADOS PESSOAIS */}
          <section className={activeSection === 0 ? 'block' : 'hidden'}>
            <div className="mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-1">Dados Pessoais</h2>
              <p className="text-gray-500 text-sm">Informações básicas para seu protocolo</p>
            </div>
            <div className="space-y-4 bg-white/[0.02] border border-white/5 rounded-xl p-4 md:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Nome completo *</label>
                  <input type="text" name="nome" required className={inputClass} placeholder="Seu nome" />
                </div>
                <div>
                  <label className={labelClass}>E-mail *</label>
                  <input type="email" name="email" required className={inputClass} placeholder="seu@email.com" />
                </div>
                <div>
                  <label className={labelClass}>WhatsApp *</label>
                  <input type="tel" name="whatsapp" required className={inputClass} placeholder="(00) 00000-0000" />
                </div>
                <div>
                  <label className={labelClass}>Data de nascimento *</label>
                  <input type="date" name="data_nascimento" required className={`${inputClass} [color-scheme:dark]`} />
                </div>
                <div>
                  <label className={labelClass}>Idade *</label>
                  <input type="number" name="idade" required className={inputClass} placeholder="25" />
                </div>
                <div>
                  <label className={labelClass}>Sexo biológico *</label>
                  <select name="sexo" required className={selectClass}>
                    <option value="" className="bg-[#1a1a1a]">Selecione</option>
                    <option value="masculino" className="bg-[#1a1a1a]">Masculino</option>
                    <option value="feminino" className="bg-[#1a1a1a]">Feminino</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Estatura (cm) *</label>
                  <input type="number" name="altura" required className={inputClass} placeholder="170" />
                </div>
                <div>
                  <label className={labelClass}>Peso atual (kg) *</label>
                  <input type="number" name="peso" required step="0.1" className={inputClass} placeholder="70.0" />
                </div>
                <div>
                  <label className={labelClass}>Profissão *</label>
                  <input type="text" name="profissao" required className={inputClass} placeholder="Sua profissão" />
                </div>
                <div>
                  <label className={labelClass}>Peso desejado (kg)</label>
                  <input type="number" name="peso_desejado" step="0.1" className={inputClass} placeholder="65.0" />
                </div>
              </div>
              <div>
                <label className={labelClass}>Principal objetivo *</label>
                <textarea name="objetivo_principal" required rows={3} className={inputClass} placeholder="Descreva seu objetivo principal..." />
              </div>
            </div>
          </section>

          {/* HÁBITOS DE VIDA */}
          <section className={activeSection === 1 ? 'block' : 'hidden'}>
            <div className="mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-1">Hábitos de Vida</h2>
              <p className="text-gray-500 text-sm">Sua rotina e estilo de vida</p>
            </div>
            <div className="space-y-4 bg-white/[0.02] border border-white/5 rounded-xl p-4 md:p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Horário que acorda</label>
                  <input type="time" name="horario_acordar" className={`${inputClass} [color-scheme:dark]`} />
                </div>
                <div>
                  <label className={labelClass}>Horário que dorme</label>
                  <input type="time" name="horario_dormir" className={`${inputClass} [color-scheme:dark]`} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Horários diferentes durante a semana?</label>
                <textarea name="horarios_variados" rows={2} className={inputClass} placeholder="Especifique se houver variação..." />
              </div>
              <div className="grid grid-cols-5 gap-2 md:gap-4">
                <div>
                  <label className={`${labelClass} text-[10px]`}>Sono (0-10)</label>
                  <input type="number" name="qualidade_sono" min="0" max="10" className={inputClass} placeholder="7" />
                </div>
                <div>
                  <label className={`${labelClass} text-[10px]`}>Stress</label>
                  <input type="number" name="nivel_stress" min="0" max="10" className={inputClass} placeholder="5" />
                </div>
                <div>
                  <label className={`${labelClass} text-[10px]`}>Ansiedade</label>
                  <input type="number" name="nivel_ansiedade" min="0" max="10" className={inputClass} placeholder="5" />
                </div>
                <div>
                  <label className={`${labelClass} text-[10px]`}>Perfecc.</label>
                  <input type="number" name="nivel_perfeccionismo" min="0" max="10" className={inputClass} placeholder="5" />
                </div>
                <div>
                  <label className={`${labelClass} text-[10px]`}>Imediatis.</label>
                  <input type="number" name="nivel_imediatismo" min="0" max="10" className={inputClass} placeholder="5" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Disposição durante o dia</label>
                  <select name="disposicao_diaria" className={selectClass}>
                    <option value="" className="bg-[#1a1a1a]">Selecione</option>
                    <option value="bem_disposto" className="bg-[#1a1a1a]">Bem disposto(a)</option>
                    <option value="cansaco_leve" className="bg-[#1a1a1a]">Cansaço leve</option>
                    <option value="cansaco_moderado" className="bg-[#1a1a1a]">Cansaço moderado</option>
                    <option value="muito_cansaco" className="bg-[#1a1a1a]">Muito cansaço</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Período mais disposto</label>
                  <select name="periodo_mais_disposto" className={selectClass}>
                    <option value="" className="bg-[#1a1a1a]">Selecione</option>
                    <option value="manha" className="bg-[#1a1a1a]">Manhã</option>
                    <option value="tarde" className="bg-[#1a1a1a]">Tarde</option>
                    <option value="noite" className="bg-[#1a1a1a]">Noite</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Fuma?</label>
                  <select name="fuma" className={selectClass}>
                    <option value="" className="bg-[#1a1a1a]">Selecione</option>
                    <option value="nao" className="bg-[#1a1a1a]">Não</option>
                    <option value="sim" className="bg-[#1a1a1a]">Sim</option>
                    <option value="ex_fumante" className="bg-[#1a1a1a]">Ex-fumante</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Consome álcool?</label>
                  <select name="consome_alcool" className={selectClass}>
                    <option value="" className="bg-[#1a1a1a]">Selecione</option>
                    <option value="nao" className="bg-[#1a1a1a]">Não</option>
                    <option value="raramente" className="bg-[#1a1a1a]">Raramente</option>
                    <option value="socialmente" className="bg-[#1a1a1a]">Socialmente</option>
                    <option value="frequentemente" className="bg-[#1a1a1a]">Frequentemente</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={labelClass}>Detalhes sobre álcool (tipo, quantidade, frequência)</label>
                <textarea name="detalhes_alcool" rows={2} className={inputClass} placeholder="Ex: Cerveja, 2-3 latas nos FDS..." />
              </div>
              <div>
                <label className={labelClass}>Exercícios praticados (tipo e frequência)</label>
                <textarea name="exercicios" rows={2} className={inputClass} placeholder="Ex: Musculação 4x/semana..." />
              </div>
              <div>
                <label className={labelClass}>Por que você acha que não consegue atingir seus objetivos?</label>
                <textarea name="motivos_dificuldade" rows={3} className={inputClass} placeholder="Descreva suas dificuldades..." />
              </div>
            </div>
          </section>

          {/* DADOS CLÍNICOS */}
          <section className={activeSection === 2 ? 'block' : 'hidden'}>
            <div className="mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-1">Dados Clínicos</h2>
              <p className="text-gray-500 text-sm">Informações sobre sua saúde</p>
            </div>
            <div className="space-y-4 bg-white/[0.02] border border-white/5 rounded-xl p-4 md:p-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className={labelClass}>Mastigação</label>
                  <select name="mastigacao" className={selectClass}>
                    <option value="" className="bg-[#1a1a1a]">Selecione</option>
                    <option value="lenta" className="bg-[#1a1a1a]">Lenta</option>
                    <option value="normal" className="bg-[#1a1a1a]">Normal</option>
                    <option value="rapida" className="bg-[#1a1a1a]">Rápida</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Apetite</label>
                  <select name="apetite" className={selectClass}>
                    <option value="" className="bg-[#1a1a1a]">Selecione</option>
                    <option value="diminuido" className="bg-[#1a1a1a]">Diminuído</option>
                    <option value="normal" className="bg-[#1a1a1a]">Normal</option>
                    <option value="aumentado" className="bg-[#1a1a1a]">Aumentado</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Intestino</label>
                  <select name="habito_intestinal" className={selectClass}>
                    <option value="" className="bg-[#1a1a1a]">Selecione</option>
                    <option value="diario" className="bg-[#1a1a1a]">Diário</option>
                    <option value="2_3_dias" className="bg-[#1a1a1a]">2-3 dias</option>
                    <option value="constipado" className="bg-[#1a1a1a]">Constipado</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Fezes</label>
                  <select name="consistencia_fezes" className={selectClass}>
                    <option value="" className="bg-[#1a1a1a]">Selecione</option>
                    <option value="mole" className="bg-[#1a1a1a]">Mole</option>
                    <option value="normal" className="bg-[#1a1a1a]">Normal</option>
                    <option value="endurecida" className="bg-[#1a1a1a]">Endurecida</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Cor da urina</label>
                  <select name="cor_urina" className={selectClass}>
                    <option value="" className="bg-[#1a1a1a]">Selecione</option>
                    <option value="clara" className="bg-[#1a1a1a]">Clara</option>
                    <option value="levemente_amarelada" className="bg-[#1a1a1a]">Lev. amarelada</option>
                    <option value="amarela" className="bg-[#1a1a1a]">Amarela</option>
                    <option value="muito_amarela" className="bg-[#1a1a1a]">Muito amarela</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Queda cabelo?</label>
                  <select name="queda_cabelo" className={selectClass}>
                    <option value="" className="bg-[#1a1a1a]">Selecione</option>
                    <option value="nao" className="bg-[#1a1a1a]">Não</option>
                    <option value="sim" className="bg-[#1a1a1a]">Sim</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Unhas fracas?</label>
                  <select name="unhas_quebradicas" className={selectClass}>
                    <option value="" className="bg-[#1a1a1a]">Selecione</option>
                    <option value="nao" className="bg-[#1a1a1a]">Não</option>
                    <option value="sim" className="bg-[#1a1a1a]">Sim</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Acne?</label>
                  <select name="acne" className={selectClass}>
                    <option value="" className="bg-[#1a1a1a]">Selecione</option>
                    <option value="nao" className="bg-[#1a1a1a]">Não</option>
                    <option value="pouca" className="bg-[#1a1a1a]">Pouca</option>
                    <option value="moderada" className="bg-[#1a1a1a]">Moderada</option>
                    <option value="muita" className="bg-[#1a1a1a]">Muita</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={labelClass}>Possui alguma doença?</label>
                <textarea name="doencas" rows={2} className={inputClass} placeholder="Diabetes, hipertensão, tireoide..." />
              </div>
              <div>
                <label className={labelClass}>Histórico de doença familiar</label>
                <textarea name="historico_familiar" rows={2} className={inputClass} placeholder="Ex: Pai diabético..." />
              </div>
              <div>
                <label className={labelClass}>Medicamentos em uso</label>
                <textarea name="medicamentos" rows={2} className={inputClass} placeholder="Liste todos os medicamentos..." />
              </div>
            </div>
          </section>

          {/* HISTÓRICO NUTRICIONAL */}
          <section className={activeSection === 3 ? 'block' : 'hidden'}>
            <div className="mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-1">Histórico Nutricional</h2>
              <p className="text-gray-500 text-sm">Preferências e hábitos alimentares</p>
            </div>
            <div className="space-y-4 bg-white/[0.02] border border-white/5 rounded-xl p-4 md:p-6">
              <div>
                <label className={labelClass}>Segue alguma dieta especial?</label>
                <textarea name="dieta_especial" rows={2} className={inputClass} placeholder="Vegetariana, low carb, etc..." />
              </div>
              <div>
                <label className={labelClass}>Já teve acompanhamento nutricional? Como foi?</label>
                <textarea name="acompanhamento_anterior" rows={2} className={inputClass} placeholder="Pontos positivos e negativos..." />
              </div>
              <div>
                <label className={labelClass}>Alergias alimentares</label>
                <textarea name="alergias" rows={2} className={inputClass} placeholder="Liste suas alergias..." />
              </div>
              <div>
                <label className={labelClass}>Alimentos que causam mal-estar</label>
                <textarea name="alimentos_mal" rows={2} className={inputClass} placeholder="Gases, azia, etc..." />
              </div>
              <div>
                <label className={labelClass}>Alimentos que NÃO gosta</label>
                <textarea name="alimentos_nao_gosta" rows={2} className={inputClass} placeholder="Liste os alimentos..." />
              </div>
              <div>
                <label className={labelClass}>Industrializados que costuma comer</label>
                <textarea name="industrializados" rows={2} className={inputClass} placeholder="Biscoitos, refrigerantes..." />
              </div>
              <div>
                <label className={labelClass}>Vegetais que mais gosta</label>
                <textarea name="vegetais_gosta" rows={2} className={inputClass} placeholder="Legumes, verduras preferidos..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Refeições por dia</label>
                  <input type="number" name="refeicoes_dia" className={inputClass} placeholder="4" />
                </div>
                <div>
                  <label className={labelClass}>Água (litros/dia)</label>
                  <input type="number" name="agua_litros" step="0.1" className={inputClass} placeholder="2.0" />
                </div>
              </div>
              <div>
                <label className={labelClass}>Refeições fora de casa? Quais?</label>
                <textarea name="refeicoes_fora" rows={2} className={inputClass} placeholder="Almoço no trabalho, etc..." />
              </div>
              <div>
                <label className={labelClass}>Leva marmita ou come na rua?</label>
                <textarea name="marmita" rows={2} className={inputClass} placeholder="Descreva sua situação..." />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className={labelClass}>Café (xíc/dia)</label>
                  <input type="text" name="cafe" className={inputClass} placeholder="3" />
                </div>
                <div>
                  <label className={labelClass}>Óleo cozinha</label>
                  <input type="text" name="oleo" className={inputClass} placeholder="Azeite" />
                </div>
                <div>
                  <label className={labelClass}>Açúcar</label>
                  <input type="text" name="acucar" className={inputClass} placeholder="2 col." />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Paladar preferido</label>
                  <select name="paladar" className={selectClass}>
                    <option value="" className="bg-[#1a1a1a]">Selecione</option>
                    <option value="doce" className="bg-[#1a1a1a]">Doce</option>
                    <option value="salgado" className="bg-[#1a1a1a]">Salgado</option>
                    <option value="azedo" className="bg-[#1a1a1a]">Azedo</option>
                    <option value="amargo" className="bg-[#1a1a1a]">Amargo</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Horário com mais fome</label>
                  <input type="text" name="horario_mais_fome" className={inputClass} placeholder="17h" />
                </div>
              </div>
              <div>
                <label className={labelClass}>O que come de "besteira"? Frequência?</label>
                <textarea name="besteiras" rows={2} className={inputClass} placeholder="Chocolate, fast food..." />
              </div>
              <div>
                <label className={labelClass}>Refeições mais difíceis de fazer</label>
                <textarea name="refeicoes_dificeis" rows={2} className={inputClass} placeholder="Café da manhã, sem tempo..." />
              </div>
              <div>
                <label className={labelClass}>Alimentação nos finais de semana</label>
                <textarea name="alimentacao_fds" rows={2} className={inputClass} placeholder="Como você come nos FDS..." />
              </div>
              <div>
                <label className={labelClass}>Comidas que você AMA</label>
                <textarea name="alimentos_ama" rows={2} className={inputClass} placeholder="Suas comidas favoritas..." />
              </div>
            </div>
          </section>

          {/* RECORDATÓRIO */}
          <section className={activeSection === 4 ? 'block' : 'hidden'}>
            <div className="mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-1">Recordatório Alimentar</h2>
              <p className="text-gray-500 text-sm">O que você come em um dia típico</p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 mb-4">
              <p className="text-xs text-amber-200">
                <strong>Instruções:</strong> Descreva o que você come em um dia (24h), desde acordar até dormir. Mencione local e quantidade aproximada.
              </p>
            </div>
            <div className="space-y-3 bg-white/[0.02] border border-white/5 rounded-xl p-4 md:p-6">
              <div>
                <label className={labelClass}>1ª Refeição - Horário e descrição</label>
                <textarea name="refeicao_1" rows={2} className={inputClass} placeholder="7h - Casa - 2 fatias pão, 1 ovo..." />
              </div>
              <div>
                <label className={labelClass}>2ª Refeição</label>
                <textarea name="refeicao_2" rows={2} className={inputClass} placeholder="10h - Trabalho - 1 fruta..." />
              </div>
              <div>
                <label className={labelClass}>3ª Refeição</label>
                <textarea name="refeicao_3" rows={2} className={inputClass} placeholder="12h30 - Restaurante - Arroz, feijão..." />
              </div>
              <div>
                <label className={labelClass}>4ª Refeição</label>
                <textarea name="refeicao_4" rows={2} className={inputClass} placeholder="16h - Casa - Lanche..." />
              </div>
              <div>
                <label className={labelClass}>5ª Refeição</label>
                <textarea name="refeicao_5" rows={2} className={inputClass} placeholder="20h - Casa - Jantar..." />
              </div>
              <div>
                <label className={labelClass}>6ª Refeição (se houver)</label>
                <textarea name="refeicao_6" rows={2} className={inputClass} placeholder="Preencha se fizer..." />
              </div>
              <div>
                <label className={labelClass}>Observações finais</label>
                <textarea name="observacoes" rows={3} className={inputClass} placeholder="Algo mais que queira contar..." />
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
              className={`px-4 md:px-6 py-2.5 rounded-lg font-medium transition-all text-sm ${
                activeSection === 0
                  ? 'opacity-0 pointer-events-none'
                  : 'bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              Anterior
            </button>

            {activeSection < 4 ? (
              <button
                type="button"
                onClick={() => setActiveSection(activeSection + 1)}
                className="px-4 md:px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-semibold rounded-lg flex items-center gap-2 transition-all text-sm"
              >
                Próximo
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 md:px-8 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 text-black font-bold rounded-lg flex items-center gap-2 transition-all text-sm"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar Anamnese
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
              {error}
            </div>
          )}
        </form>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 mt-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 md:gap-6 text-xs text-gray-500">
              <a href="tel:+5512997015595" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                <svg className="w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                (12) 99701-5595
              </a>
              <a href="mailto:vpneuroscience@icloud.com" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                <svg className="w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                vpneuroscience@icloud.com
              </a>
              <a href="https://instagram.com/vitorpaulo1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                <svg className="w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
                @vitorpaulo1
              </a>
            </div>
            <div className="text-center sm:text-right">
              <span
                className="text-sm font-bold tracking-wider"
                style={{
                  background: 'linear-gradient(180deg, #FFD700 0%, #FFA500 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                SUPERSAPIENS
              </span>
              <p className="text-[10px] text-gray-600 mt-0.5">Performance & Neurociência</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};
