'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, Loader2, ArrowLeft, ArrowRight, Check } from 'lucide-react';

export const QuestionnaireModel3 = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const totalSteps = 5;

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

  const steps = [
    { num: 1, title: 'Dados Pessoais', desc: 'Suas informações básicas' },
    { num: 2, title: 'Hábitos de Vida', desc: 'Rotina e estilo de vida' },
    { num: 3, title: 'Dados Clínicos', desc: 'Informações de saúde' },
    { num: 4, title: 'Alimentação', desc: 'Preferências e hábitos' },
    { num: 5, title: 'Recordatório', desc: 'Suas refeições diárias' },
  ];

  const inputClass = "w-full bg-gray-50 border-2 border-gray-200 rounded-2xl px-5 py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-base";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-2";
  const selectClass = "w-full bg-gray-50 border-2 border-gray-200 rounded-2xl px-5 py-4 text-gray-800 focus:outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer text-base";

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white font-bold text-lg">VP</span>
            </div>
            <div>
              <span className="font-bold text-gray-800">VP Nutrição</span>
              <span className="block text-xs text-blue-600 font-medium">Anamnese Nutricional</span>
            </div>
          </a>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 rounded-full">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
              />
            </div>

            {steps.map((s) => (
              <div key={s.num} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                    step > s.num
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white'
                      : step === s.num
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white ring-4 ring-blue-100'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step > s.num ? <Check className="w-5 h-5" /> : s.num}
                </div>
                <span className={`hidden sm:block text-xs mt-2 font-medium ${step >= s.num ? 'text-blue-600' : 'text-gray-400'}`}>
                  {s.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step Title */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{steps[step - 1].title}</h1>
        <p className="text-gray-500">{steps[step - 1].desc}</p>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-6 pb-12">
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8">

            {/* Step 1: Dados Pessoais */}
            {step === 1 && (
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
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
                    <input type="date" name="data_nascimento" required className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Idade *</label>
                    <input type="number" name="idade" required className={inputClass} placeholder="25" />
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
                  <textarea name="objetivo_principal" required rows={3} className={inputClass} placeholder="Descreva seu objetivo..." />
                </div>
              </div>
            )}

            {/* Step 2: Hábitos */}
            {step === 2 && (
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Horário que acorda</label>
                    <input type="time" name="horario_acordar" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Horário que dorme</label>
                    <input type="time" name="horario_dormir" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Horários variam durante a semana?</label>
                  <textarea name="horarios_variados" rows={2} className={inputClass} placeholder="Especifique..." />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  <div>
                    <label className={labelClass}>Sono (0-10)</label>
                    <input type="number" name="qualidade_sono" min="0" max="10" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Stress</label>
                    <input type="number" name="nivel_stress" min="0" max="10" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Ansiedade</label>
                    <input type="number" name="nivel_ansiedade" min="0" max="10" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Perfeccion.</label>
                    <input type="number" name="nivel_perfeccionismo" min="0" max="10" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Imediatismo</label>
                    <input type="number" name="nivel_imediatismo" min="0" max="10" className={inputClass} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Disposição durante o dia</label>
                    <select name="disposicao_diaria" className={selectClass}>
                      <option value="">Selecione</option>
                      <option value="bem_disposto">Bem disposto(a)</option>
                      <option value="cansaco_leve">Cansaço leve</option>
                      <option value="cansaco_moderado">Cansaço moderado</option>
                      <option value="muito_cansaco">Muito cansaço</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Período mais disposto</label>
                    <select name="periodo_mais_disposto" className={selectClass}>
                      <option value="">Selecione</option>
                      <option value="manha">Manhã</option>
                      <option value="tarde">Tarde</option>
                      <option value="noite">Noite</option>
                    </select>
                  </div>
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
                    <label className={labelClass}>Consome álcool?</label>
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
                  <label className={labelClass}>Detalhes sobre álcool</label>
                  <textarea name="detalhes_alcool" rows={2} className={inputClass} placeholder="Tipo, quantidade, frequência..." />
                </div>
                <div>
                  <label className={labelClass}>Exercícios praticados</label>
                  <textarea name="exercicios" rows={2} className={inputClass} placeholder="Tipo e frequência..." />
                </div>
                <div>
                  <label className={labelClass}>Por que não consegue atingir seus objetivos?</label>
                  <textarea name="motivos_dificuldade" rows={3} className={inputClass} placeholder="Suas dificuldades..." />
                </div>
              </div>
            )}

            {/* Step 3: Clínicos */}
            {step === 3 && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
                    <label className={labelClass}>Intestino</label>
                    <select name="habito_intestinal" className={selectClass}>
                      <option value="">Selecione</option>
                      <option value="diario">Diário</option>
                      <option value="2_3_dias">2-3 dias</option>
                      <option value="constipado">Constipado</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Fezes</label>
                    <select name="consistencia_fezes" className={selectClass}>
                      <option value="">Selecione</option>
                      <option value="mole">Mole</option>
                      <option value="normal">Normal</option>
                      <option value="endurecida">Endurecida</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Cor urina</label>
                    <select name="cor_urina" className={selectClass}>
                      <option value="">Selecione</option>
                      <option value="clara">Clara</option>
                      <option value="levemente_amarelada">Lev. amarelada</option>
                      <option value="amarela">Amarela</option>
                      <option value="muito_amarela">Muito amarela</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Queda cabelo?</label>
                    <select name="queda_cabelo" className={selectClass}>
                      <option value="">Selecione</option>
                      <option value="nao">Não</option>
                      <option value="sim">Sim</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Unhas fracas?</label>
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
                      <option value="pouca">Pouca</option>
                      <option value="moderada">Moderada</option>
                      <option value="muita">Muita</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Doenças diagnosticadas</label>
                  <textarea name="doencas" rows={2} className={inputClass} placeholder="Diabetes, hipertensão..." />
                </div>
                <div>
                  <label className={labelClass}>Histórico familiar</label>
                  <textarea name="historico_familiar" rows={2} className={inputClass} placeholder="Doenças na família..." />
                </div>
                <div>
                  <label className={labelClass}>Medicamentos em uso</label>
                  <textarea name="medicamentos" rows={2} className={inputClass} placeholder="Liste todos..." />
                </div>
              </div>
            )}

            {/* Step 4: Alimentação */}
            {step === 4 && (
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Dieta especial?</label>
                  <textarea name="dieta_especial" rows={2} className={inputClass} placeholder="Vegetariana, low carb..." />
                </div>
                <div>
                  <label className={labelClass}>Acompanhamento nutricional anterior</label>
                  <textarea name="acompanhamento_anterior" rows={3} className={inputClass} placeholder="Como foi..." />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Alergias alimentares</label>
                    <textarea name="alergias" rows={2} className={inputClass} placeholder="Liste..." />
                  </div>
                  <div>
                    <label className={labelClass}>Alimentos que causam mal-estar</label>
                    <textarea name="alimentos_mal" rows={2} className={inputClass} placeholder="Gases, azia..." />
                  </div>
                  <div>
                    <label className={labelClass}>Alimentos que NÃO gosta</label>
                    <textarea name="alimentos_nao_gosta" rows={2} className={inputClass} placeholder="Liste..." />
                  </div>
                  <div>
                    <label className={labelClass}>Alimentos que AMA</label>
                    <textarea name="alimentos_ama" rows={2} className={inputClass} placeholder="Favoritos..." />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Industrializados que consome</label>
                  <textarea name="industrializados" rows={2} className={inputClass} placeholder="Biscoitos, refri..." />
                </div>
                <div>
                  <label className={labelClass}>Vegetais preferidos</label>
                  <textarea name="vegetais_gosta" rows={2} className={inputClass} placeholder="Legumes, verduras..." />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Refeições/dia</label>
                    <input type="number" name="refeicoes_dia" className={inputClass} placeholder="4" />
                  </div>
                  <div>
                    <label className={labelClass}>Água (L/dia)</label>
                    <input type="number" name="agua_litros" step="0.1" className={inputClass} placeholder="2.0" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Refeições fora de casa</label>
                    <textarea name="refeicoes_fora" rows={2} className={inputClass} placeholder="Quais..." />
                  </div>
                  <div>
                    <label className={labelClass}>Marmita ou rua?</label>
                    <textarea name="marmita" rows={2} className={inputClass} placeholder="Situação..." />
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>Café (xíc.)</label>
                    <input type="text" name="cafe" className={inputClass} placeholder="3" />
                  </div>
                  <div>
                    <label className={labelClass}>Óleo</label>
                    <input type="text" name="oleo" className={inputClass} placeholder="Azeite" />
                  </div>
                  <div>
                    <label className={labelClass}>Açúcar</label>
                    <input type="text" name="acucar" className={inputClass} placeholder="2 col." />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Paladar preferido</label>
                    <select name="paladar" className={selectClass}>
                      <option value="">Selecione</option>
                      <option value="doce">Doce</option>
                      <option value="salgado">Salgado</option>
                      <option value="azedo">Azedo</option>
                      <option value="amargo">Amargo</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Horário com mais fome</label>
                    <input type="text" name="horario_mais_fome" className={inputClass} placeholder="17h" />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>"Besteiras" - o que e frequência</label>
                  <textarea name="besteiras" rows={2} className={inputClass} placeholder="Chocolate, fast food..." />
                </div>
                <div>
                  <label className={labelClass}>Refeições mais difíceis</label>
                  <textarea name="refeicoes_dificeis" rows={2} className={inputClass} placeholder="Qual e porquê..." />
                </div>
                <div>
                  <label className={labelClass}>Alimentação nos FDS</label>
                  <textarea name="alimentacao_fds" rows={3} className={inputClass} placeholder="Como é..." />
                </div>
              </div>
            )}

            {/* Step 5: Recordatório */}
            {step === 5 && (
              <div className="space-y-5">
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-4">
                  <p className="text-blue-800 text-sm">
                    <strong>Instruções:</strong> Descreva o que come em um dia típico (24h).
                    Inclua horário, local e quantidade aproximada.
                  </p>
                </div>
                <div>
                  <label className={labelClass}>1ª Refeição</label>
                  <textarea name="refeicao_1" rows={3} className={inputClass} placeholder="7h - Casa - Pão, ovo, café..." />
                </div>
                <div>
                  <label className={labelClass}>2ª Refeição</label>
                  <textarea name="refeicao_2" rows={3} className={inputClass} placeholder="10h - Trabalho - Fruta..." />
                </div>
                <div>
                  <label className={labelClass}>3ª Refeição</label>
                  <textarea name="refeicao_3" rows={3} className={inputClass} placeholder="12h30 - Restaurante..." />
                </div>
                <div>
                  <label className={labelClass}>4ª Refeição</label>
                  <textarea name="refeicao_4" rows={3} className={inputClass} placeholder="16h - Casa..." />
                </div>
                <div>
                  <label className={labelClass}>5ª Refeição</label>
                  <textarea name="refeicao_5" rows={3} className={inputClass} placeholder="20h - Casa..." />
                </div>
                <div>
                  <label className={labelClass}>6ª Refeição (se houver)</label>
                  <textarea name="refeicao_6" rows={3} className={inputClass} placeholder="Opcional..." />
                </div>
                <div>
                  <label className={labelClass}>Observações finais</label>
                  <textarea name="observacoes" rows={4} className={inputClass} placeholder="Algo mais que queira contar..." />
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all ${
                step === 1 ? 'opacity-0 pointer-events-none' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Anterior
            </button>

            {step < totalSteps ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/25 transition-all"
              >
                Próximo
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 text-white font-semibold rounded-2xl shadow-lg shadow-green-500/25 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
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
            <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-4 text-red-600 text-sm">
              {error}
            </div>
          )}
        </form>
      </div>
    </main>
  );
};
