'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, Loader2, ChevronDown, User, Activity, Stethoscope, Apple, ClipboardList } from 'lucide-react';

export const QuestionnaireModel1 = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>(['dados-pessoais']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

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
        setError('Erro ao enviar. Tente novamente ou entre em contato pelo WhatsApp.');
      }
    } catch {
      setError('Erro ao enviar. Tente novamente ou entre em contato pelo WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const SectionHeader = ({ id, icon: Icon, title, subtitle }: { id: string; icon: any; title: string; subtitle: string }) => (
    <button
      type="button"
      onClick={() => toggleSection(id)}
      className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 hover:border-emerald-200 transition-all group"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="text-left">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
      <ChevronDown className={`w-5 h-5 text-emerald-600 transition-transform ${expandedSections.includes(id) ? 'rotate-180' : ''}`} />
    </button>
  );

  const inputClass = "w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all";
  const labelClass = "block text-sm font-medium text-gray-700 mb-2";
  const selectClass = "w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all appearance-none cursor-pointer";

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <span className="text-white font-bold">VP</span>
            </div>
            <div>
              <span className="font-semibold text-gray-800">VP Nutrição</span>
              <span className="block text-xs text-emerald-600">Evidence-Based</span>
            </div>
          </a>
          <div className="text-right">
            <span className="text-xs text-gray-400 uppercase tracking-wider">Anamnese</span>
            <span className="block text-sm font-medium text-gray-600">Nutricional</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2 mb-6">
            <ClipboardList className="w-4 h-4" />
            <span className="text-sm font-medium">Questionário Completo</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Anamnese Nutricional</h1>
          <p className="text-emerald-100 max-w-2xl mx-auto">
            Preencha com atenção todas as informações para que eu possa criar o protocolo nutricional mais adequado para você.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* DADOS PESSOAIS */}
          <div className="bg-white rounded-3xl shadow-sm shadow-gray-200/50 overflow-hidden">
            <SectionHeader id="dados-pessoais" icon={User} title="Dados Pessoais" subtitle="Informações básicas de identificação" />
            {expandedSections.includes('dados-pessoais') && (
              <div className="p-6 pt-0 mt-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Nome completo *</label>
                    <input type="text" name="nome" required className={inputClass} placeholder="Seu nome completo" />
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
                    <input type="date" name="data_nascimento" required className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Idade *</label>
                    <input type="number" name="idade" required min="10" max="100" className={inputClass} placeholder="25" />
                  </div>
                  <div>
                    <label className={labelClass}>Sexo biológico *</label>
                    <select name="sexo" required className={selectClass}>
                      <option value="">Selecione</option>
                      <option value="masculino">Masculino</option>
                      <option value="feminino">Feminino</option>
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
                  <textarea name="objetivo_principal" required rows={3} className={inputClass} placeholder="Descreva seu objetivo principal com a consultoria nutricional..." />
                </div>
              </div>
            )}
          </div>

          {/* HÁBITOS DE VIDA */}
          <div className="bg-white rounded-3xl shadow-sm shadow-gray-200/50 overflow-hidden">
            <SectionHeader id="habitos" icon={Activity} title="Hábitos de Vida" subtitle="Rotina, sono, exercícios e estilo de vida" />
            {expandedSections.includes('habitos') && (
              <div className="p-6 pt-0 mt-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Que horas acorda?</label>
                    <input type="time" name="horario_acordar" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Que horas dorme?</label>
                    <input type="time" name="horario_dormir" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Caso não seja o mesmo horário todos os dias, especifique</label>
                  <textarea name="horarios_variados" rows={2} className={inputClass} placeholder="Ex: Segunda a sexta acordo 6h, fins de semana acordo 9h..." />
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>Qualidade do sono (0-10)</label>
                    <input type="number" name="qualidade_sono" min="0" max="10" className={inputClass} placeholder="7" />
                  </div>
                  <div>
                    <label className={labelClass}>Nível de stress (0-10)</label>
                    <input type="number" name="nivel_stress" min="0" max="10" className={inputClass} placeholder="5" />
                  </div>
                  <div>
                    <label className={labelClass}>Nível de ansiedade (0-10)</label>
                    <input type="number" name="nivel_ansiedade" min="0" max="10" className={inputClass} placeholder="5" />
                  </div>
                  <div>
                    <label className={labelClass}>Nível de perfeccionismo (0-10)</label>
                    <input type="number" name="nivel_perfeccionismo" min="0" max="10" className={inputClass} placeholder="5" />
                  </div>
                  <div>
                    <label className={labelClass}>Nível de imediatismo (0-10)</label>
                    <input type="number" name="nivel_imediatismo" min="0" max="10" className={inputClass} placeholder="5" />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Sente cansaço durante o dia ou passa o dia bem disposto(a)?</label>
                  <select name="disposicao_diaria" className={selectClass}>
                    <option value="">Selecione</option>
                    <option value="bem_disposto">Bem disposto(a) o dia todo</option>
                    <option value="cansaco_leve">Cansaço leve em alguns momentos</option>
                    <option value="cansaco_moderado">Cansaço moderado durante o dia</option>
                    <option value="muito_cansaco">Muito cansaço durante o dia</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Qual período do dia se sente mais disposto?</label>
                  <select name="periodo_mais_disposto" className={selectClass}>
                    <option value="">Selecione</option>
                    <option value="manha">Manhã</option>
                    <option value="tarde">Tarde</option>
                    <option value="noite">Noite</option>
                    <option value="variado">Varia muito</option>
                  </select>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Fuma?</label>
                    <select name="fuma" className={selectClass}>
                      <option value="">Selecione</option>
                      <option value="nao">Não</option>
                      <option value="sim">Sim</option>
                      <option value="ex_fumante">Ex-fumante</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Consome bebida alcoólica?</label>
                    <select name="consome_alcool" className={selectClass}>
                      <option value="">Selecione</option>
                      <option value="nao">Não</option>
                      <option value="raramente">Raramente</option>
                      <option value="socialmente">Socialmente</option>
                      <option value="frequentemente">Frequentemente</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Se consome álcool, qual tipo, quantidade e frequência?</label>
                  <textarea name="detalhes_alcool" rows={2} className={inputClass} placeholder="Ex: Cerveja, 2-3 latas nos finais de semana..." />
                </div>
                <div>
                  <label className={labelClass}>Que tipo de exercício faz? (frequência semanal)</label>
                  <textarea name="exercicios" rows={2} className={inputClass} placeholder="Ex: Musculação 4x por semana, corrida 2x por semana..." />
                </div>
                <div>
                  <label className={labelClass}>Por quais motivos você acha que não consegue atingir seus objetivos?</label>
                  <textarea name="motivos_dificuldade" rows={3} className={inputClass} placeholder="Descreva as principais dificuldades que você encontra..." />
                </div>
              </div>
            )}
          </div>

          {/* DADOS CLÍNICOS */}
          <div className="bg-white rounded-3xl shadow-sm shadow-gray-200/50 overflow-hidden">
            <SectionHeader id="clinicos" icon={Stethoscope} title="Dados Clínicos" subtitle="Informações de saúde e funcionamento do corpo" />
            {expandedSections.includes('clinicos') && (
              <div className="p-6 pt-0 mt-6 space-y-4">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>Mastigação</label>
                    <select name="mastigacao" className={selectClass}>
                      <option value="">Selecione</option>
                      <option value="lenta">Lenta</option>
                      <option value="normal">Normal</option>
                      <option value="rapida">Rápida</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Apetite</label>
                    <select name="apetite" className={selectClass}>
                      <option value="">Selecione</option>
                      <option value="diminuido">Diminuído</option>
                      <option value="normal">Normal</option>
                      <option value="aumentado">Aumentado</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Hábito intestinal</label>
                    <select name="habito_intestinal" className={selectClass}>
                      <option value="">Selecione</option>
                      <option value="diario">Diário</option>
                      <option value="2_3_dias">2-3 dias</option>
                      <option value="constipado">Constipado</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Consistência das fezes</label>
                    <select name="consistencia_fezes" className={selectClass}>
                      <option value="">Selecione</option>
                      <option value="mole">Mole</option>
                      <option value="normal">Normal</option>
                      <option value="endurecida">Endurecida</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Cor da urina</label>
                    <select name="cor_urina" className={selectClass}>
                      <option value="">Selecione</option>
                      <option value="clara">Clara</option>
                      <option value="levemente_amarelada">Levemente amarelada</option>
                      <option value="amarela">Amarela</option>
                      <option value="muito_amarela">Muito amarela</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Queda de cabelo?</label>
                    <select name="queda_cabelo" className={selectClass}>
                      <option value="">Selecione</option>
                      <option value="nao">Não</option>
                      <option value="sim">Sim</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Unhas quebradiças?</label>
                    <select name="unhas_quebradicas" className={selectClass}>
                      <option value="">Selecione</option>
                      <option value="nao">Não</option>
                      <option value="sim">Sim</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Acne?</label>
                    <select name="acne" className={selectClass}>
                      <option value="">Selecione</option>
                      <option value="nao">Não</option>
                      <option value="pouca">Sim, pouca</option>
                      <option value="moderada">Sim, moderada</option>
                      <option value="muita">Sim, muita</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Possui alguma doença? (diabetes, hipertensão, tireoide, etc)</label>
                  <textarea name="doencas" rows={2} className={inputClass} placeholder="Liste todas as condições de saúde diagnosticadas..." />
                </div>
                <div>
                  <label className={labelClass}>Histórico de doença familiar</label>
                  <textarea name="historico_familiar" rows={2} className={inputClass} placeholder="Ex: Pai diabético, mãe hipertensa..." />
                </div>
                <div>
                  <label className={labelClass}>Medicamentos em uso</label>
                  <textarea name="medicamentos" rows={2} className={inputClass} placeholder="Liste todos os medicamentos que você toma atualmente..." />
                </div>
              </div>
            )}
          </div>

          {/* HISTÓRICO NUTRICIONAL */}
          <div className="bg-white rounded-3xl shadow-sm shadow-gray-200/50 overflow-hidden">
            <SectionHeader id="nutricional" icon={Apple} title="Histórico Nutricional" subtitle="Preferências alimentares e hábitos" />
            {expandedSections.includes('nutricional') && (
              <div className="p-6 pt-0 mt-6 space-y-4">
                <div>
                  <label className={labelClass}>Segue alguma dieta especial? (vegetariana, low carb, etc)</label>
                  <textarea name="dieta_especial" rows={2} className={inputClass} placeholder="Descreva se segue algum tipo de dieta específica..." />
                </div>
                <div>
                  <label className={labelClass}>Já teve acompanhamento nutricional antes? Como foi? Pontos positivos e negativos.</label>
                  <textarea name="acompanhamento_anterior" rows={3} className={inputClass} placeholder="Conte sua experiência anterior com nutricionistas..." />
                </div>
                <div>
                  <label className={labelClass}>Possui alguma alergia alimentar?</label>
                  <textarea name="alergias" rows={2} className={inputClass} placeholder="Liste todas as alergias alimentares..." />
                </div>
                <div>
                  <label className={labelClass}>Algum alimento te faz passar mal? (gases, azia, pirose)</label>
                  <textarea name="alimentos_mal" rows={2} className={inputClass} placeholder="Liste alimentos que causam desconforto..." />
                </div>
                <div>
                  <label className={labelClass}>Alimentos que você NÃO gosta ou tem aversão</label>
                  <textarea name="alimentos_nao_gosta" rows={2} className={inputClass} placeholder="Liste todos os alimentos que você não come..." />
                </div>
                <div>
                  <label className={labelClass}>Tipos de alimentos industrializados que costuma comer</label>
                  <textarea name="industrializados" rows={2} className={inputClass} placeholder="Ex: Biscoitos, refrigerantes, salgadinhos..." />
                </div>
                <div>
                  <label className={labelClass}>Legumes/hortaliças/vegetais que você mais gosta</label>
                  <textarea name="vegetais_gosta" rows={2} className={inputClass} placeholder="Liste os vegetais preferidos..." />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Quantas refeições faz por dia?</label>
                    <input type="number" name="refeicoes_dia" min="1" max="10" className={inputClass} placeholder="4" />
                  </div>
                  <div>
                    <label className={labelClass}>Ingestão de água (litros por dia)</label>
                    <input type="number" name="agua_litros" step="0.1" min="0" max="10" className={inputClass} placeholder="2.0" />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Faz refeições fora de casa? Quais?</label>
                  <textarea name="refeicoes_fora" rows={2} className={inputClass} placeholder="Ex: Almoço de segunda a sexta no trabalho..." />
                </div>
                <div>
                  <label className={labelClass}>Leva marmita ou come na rua? Tem disponibilidade para levar?</label>
                  <textarea name="marmita" rows={2} className={inputClass} placeholder="Descreva sua situação atual e disponibilidade..." />
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>Consome café? Quantas xícaras?</label>
                    <input type="text" name="cafe" className={inputClass} placeholder="Ex: 3 xícaras" />
                  </div>
                  <div>
                    <label className={labelClass}>Óleo para cozinhar? Quantidade?</label>
                    <input type="text" name="oleo" className={inputClass} placeholder="Ex: Azeite, pouco" />
                  </div>
                  <div>
                    <label className={labelClass}>Consome açúcar? Quantidade?</label>
                    <input type="text" name="acucar" className={inputClass} placeholder="Ex: 2 colheres/dia" />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Seu paladar é mais...</label>
                  <select name="paladar" className={selectClass}>
                    <option value="">Selecione</option>
                    <option value="doce">Doce</option>
                    <option value="salgado">Salgado</option>
                    <option value="azedo">Azedo</option>
                    <option value="amargo">Amargo</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Qual horário do dia tem mais fome?</label>
                  <input type="text" name="horario_mais_fome" className={inputClass} placeholder="Ex: Final da tarde, por volta das 17h" />
                </div>
                <div>
                  <label className={labelClass}>O que costuma comer de "besteira"? Com qual frequência?</label>
                  <textarea name="besteiras" rows={2} className={inputClass} placeholder="Ex: Chocolate todos os dias, fast food 1x por semana..." />
                </div>
                <div>
                  <label className={labelClass}>Qual(is) refeição(ões) são mais difíceis de fazer? Horário?</label>
                  <textarea name="refeicoes_dificeis" rows={2} className={inputClass} placeholder="Ex: Café da manhã, não tenho tempo de manhã..." />
                </div>
                <div>
                  <label className={labelClass}>Costuma comer fora aos finais de semana? Como é sua alimentação no FDS?</label>
                  <textarea name="alimentacao_fds" rows={3} className={inputClass} placeholder="Descreva como é sua alimentação nos finais de semana..." />
                </div>
                <div>
                  <label className={labelClass}>Comidas/alimentos que você AMA</label>
                  <textarea name="alimentos_ama" rows={2} className={inputClass} placeholder="Liste seus alimentos e comidas favoritas..." />
                </div>
              </div>
            )}
          </div>

          {/* RECORDATÓRIO ALIMENTAR */}
          <div className="bg-white rounded-3xl shadow-sm shadow-gray-200/50 overflow-hidden">
            <SectionHeader id="recordatorio" icon={ClipboardList} title="Recordatório Alimentar" subtitle="O que você come em um dia típico" />
            {expandedSections.includes('recordatorio') && (
              <div className="p-6 pt-0 mt-6 space-y-4">
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mb-6">
                  <p className="text-sm text-emerald-800">
                    <strong>Instruções:</strong> Descreva o que você come geralmente durante um dia (24h), desde acordar até dormir.
                    Mencione o local (casa ou fora) e quantidade aproximada (ex: 4 colheres de arroz, 1 bife médio, 1 copo de suco).
                  </p>
                </div>
                <div>
                  <label className={labelClass}>1ª Refeição - Horário e descrição</label>
                  <textarea name="refeicao_1" rows={3} className={inputClass} placeholder="Ex: 7h - Casa - 2 fatias de pão integral, 1 ovo mexido, 1 copo de café com leite..." />
                </div>
                <div>
                  <label className={labelClass}>2ª Refeição - Horário e descrição</label>
                  <textarea name="refeicao_2" rows={3} className={inputClass} placeholder="Ex: 10h - Trabalho - 1 fruta (maçã) e 1 iogurte natural..." />
                </div>
                <div>
                  <label className={labelClass}>3ª Refeição - Horário e descrição</label>
                  <textarea name="refeicao_3" rows={3} className={inputClass} placeholder="Ex: 12h30 - Restaurante - Arroz (4 colheres), feijão (1 concha), frango grelhado (1 filé), salada..." />
                </div>
                <div>
                  <label className={labelClass}>4ª Refeição - Horário e descrição</label>
                  <textarea name="refeicao_4" rows={3} className={inputClass} placeholder="Ex: 16h - Casa - 1 sanduíche natural, 1 suco..." />
                </div>
                <div>
                  <label className={labelClass}>5ª Refeição - Horário e descrição</label>
                  <textarea name="refeicao_5" rows={3} className={inputClass} placeholder="Ex: 20h - Casa - Salada, carne vermelha (1 bife), legumes..." />
                </div>
                <div>
                  <label className={labelClass}>6ª Refeição - Horário e descrição (se houver)</label>
                  <textarea name="refeicao_6" rows={3} className={inputClass} placeholder="Preencha se fizer uma 6ª refeição..." />
                </div>
              </div>
            )}
          </div>

          {/* OBSERVAÇÕES FINAIS */}
          <div className="bg-white rounded-3xl shadow-sm shadow-gray-200/50 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Observações Finais</h3>
            <div>
              <label className={labelClass}>Algo mais que você gostaria de me contar?</label>
              <textarea name="observacoes" rows={4} className={inputClass} placeholder="Histórico de dietas anteriores, dificuldades, expectativas, dúvidas, ou qualquer informação adicional que considere relevante..." />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/25 transition-all"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                Enviar Anamnese
                <Send className="w-5 h-5" />
              </>
            )}
          </button>

          <p className="text-center text-gray-400 text-xs">
            Suas informações são confidenciais e serão usadas apenas para criar seu protocolo nutricional.
          </p>
        </form>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-6 mt-12">
        <div className="max-w-4xl mx-auto px-6 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} VP Nutrição. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  );
};
