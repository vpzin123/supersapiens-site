'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, Loader2 } from 'lucide-react';

export const QuestionnaireModel4 = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-white rounded-[20px] p-8 shadow-[0_2px_40px_-12px_rgba(0,0,0,0.1)]">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-100">{title}</h2>
      {children}
    </div>
  );

  const Field = ({ label, children, full = false }: { label: string; children: React.ReactNode; full?: boolean }) => (
    <div className={full ? 'col-span-full' : ''}>
      <label className="block text-[13px] font-medium text-gray-500 uppercase tracking-wide mb-2">{label}</label>
      {children}
    </div>
  );

  const inputClass = "w-full border-0 border-b-2 border-gray-200 bg-transparent px-0 py-3 text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-900 transition-colors text-[15px]";
  const selectClass = "w-full border-0 border-b-2 border-gray-200 bg-transparent px-0 py-3 text-gray-900 focus:outline-none focus:border-gray-900 transition-colors appearance-none cursor-pointer text-[15px]";
  const textareaClass = "w-full border-2 border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-900 focus:bg-white transition-all text-[15px] resize-none";

  return (
    <main className="min-h-screen bg-[#f8f8f8]">
      {/* Header */}
      <header className="bg-white">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <a href="/" className="group">
              <span className="text-2xl font-bold text-gray-900 group-hover:text-gray-600 transition-colors">VP</span>
              <span className="block text-xs text-gray-400 mt-0.5">Nutrição Clínica</span>
            </a>
            <div className="text-right">
              <span className="text-[11px] uppercase tracking-widest text-gray-400">Formulário</span>
              <span className="block text-sm font-medium text-gray-900">Anamnese</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-white border-b">
        <div className="max-w-3xl mx-auto px-6 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Anamnese Nutricional</h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            Preencha todas as informações com cuidado. Quanto mais detalhes, melhor será seu protocolo.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Dados Pessoais */}
          <Card title="Dados Pessoais">
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
              <Field label="Nome completo">
                <input type="text" name="nome" required className={inputClass} placeholder="Seu nome" />
              </Field>
              <Field label="E-mail">
                <input type="email" name="email" required className={inputClass} placeholder="seu@email.com" />
              </Field>
              <Field label="WhatsApp">
                <input type="tel" name="whatsapp" required className={inputClass} placeholder="(00) 00000-0000" />
              </Field>
              <Field label="Data de nascimento">
                <input type="date" name="data_nascimento" required className={inputClass} />
              </Field>
              <Field label="Idade">
                <input type="number" name="idade" required className={inputClass} placeholder="25" />
              </Field>
              <Field label="Sexo biológico">
                <select name="sexo" required className={selectClass}>
                  <option value="">Selecione</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                </select>
              </Field>
              <Field label="Altura (cm)">
                <input type="number" name="altura" required className={inputClass} placeholder="170" />
              </Field>
              <Field label="Peso atual (kg)">
                <input type="number" name="peso" required step="0.1" className={inputClass} placeholder="70.0" />
              </Field>
              <Field label="Profissão">
                <input type="text" name="profissao" required className={inputClass} placeholder="Sua profissão" />
              </Field>
              <Field label="Peso desejado (kg)">
                <input type="number" name="peso_desejado" step="0.1" className={inputClass} placeholder="65.0" />
              </Field>
              <Field label="Principal objetivo" full>
                <textarea name="objetivo_principal" required rows={3} className={textareaClass} placeholder="Descreva seu objetivo principal com a consultoria..." />
              </Field>
            </div>
          </Card>

          {/* Hábitos de Vida */}
          <Card title="Hábitos de Vida">
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
              <Field label="Horário que acorda">
                <input type="time" name="horario_acordar" className={inputClass} />
              </Field>
              <Field label="Horário que dorme">
                <input type="time" name="horario_dormir" className={inputClass} />
              </Field>
              <Field label="Horários variam?" full>
                <textarea name="horarios_variados" rows={2} className={textareaClass} placeholder="Especifique se os horários mudam durante a semana..." />
              </Field>
            </div>
            <div className="grid grid-cols-5 gap-4 mt-6 pt-6 border-t border-gray-100">
              <Field label="Sono">
                <input type="number" name="qualidade_sono" min="0" max="10" className={inputClass} placeholder="0-10" />
              </Field>
              <Field label="Stress">
                <input type="number" name="nivel_stress" min="0" max="10" className={inputClass} placeholder="0-10" />
              </Field>
              <Field label="Ansiedade">
                <input type="number" name="nivel_ansiedade" min="0" max="10" className={inputClass} placeholder="0-10" />
              </Field>
              <Field label="Perfec.">
                <input type="number" name="nivel_perfeccionismo" min="0" max="10" className={inputClass} placeholder="0-10" />
              </Field>
              <Field label="Imedia.">
                <input type="number" name="nivel_imediatismo" min="0" max="10" className={inputClass} placeholder="0-10" />
              </Field>
            </div>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6 mt-6 pt-6 border-t border-gray-100">
              <Field label="Disposição diária">
                <select name="disposicao_diaria" className={selectClass}>
                  <option value="">Selecione</option>
                  <option value="bem_disposto">Bem disposto(a)</option>
                  <option value="cansaco_leve">Cansaço leve</option>
                  <option value="cansaco_moderado">Cansaço moderado</option>
                  <option value="muito_cansaco">Muito cansaço</option>
                </select>
              </Field>
              <Field label="Período mais disposto">
                <select name="periodo_mais_disposto" className={selectClass}>
                  <option value="">Selecione</option>
                  <option value="manha">Manhã</option>
                  <option value="tarde">Tarde</option>
                  <option value="noite">Noite</option>
                </select>
              </Field>
              <Field label="Fuma?">
                <select name="fuma" className={selectClass}>
                  <option value="">Selecione</option>
                  <option value="nao">Não</option>
                  <option value="sim">Sim</option>
                  <option value="ex_fumante">Ex-fumante</option>
                </select>
              </Field>
              <Field label="Consome álcool?">
                <select name="consome_alcool" className={selectClass}>
                  <option value="">Selecione</option>
                  <option value="nao">Não</option>
                  <option value="raramente">Raramente</option>
                  <option value="socialmente">Socialmente</option>
                  <option value="frequentemente">Frequentemente</option>
                </select>
              </Field>
              <Field label="Detalhes sobre álcool" full>
                <textarea name="detalhes_alcool" rows={2} className={textareaClass} placeholder="Tipo, quantidade, frequência..." />
              </Field>
              <Field label="Exercícios praticados" full>
                <textarea name="exercicios" rows={2} className={textareaClass} placeholder="Tipo e frequência semanal..." />
              </Field>
              <Field label="Por que não atinge seus objetivos?" full>
                <textarea name="motivos_dificuldade" rows={3} className={textareaClass} placeholder="Descreva suas dificuldades..." />
              </Field>
            </div>
          </Card>

          {/* Dados Clínicos */}
          <Card title="Dados Clínicos">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6">
              <Field label="Mastigação">
                <select name="mastigacao" className={selectClass}>
                  <option value="">-</option>
                  <option value="lenta">Lenta</option>
                  <option value="normal">Normal</option>
                  <option value="rapida">Rápida</option>
                </select>
              </Field>
              <Field label="Apetite">
                <select name="apetite" className={selectClass}>
                  <option value="">-</option>
                  <option value="diminuido">Diminuído</option>
                  <option value="normal">Normal</option>
                  <option value="aumentado">Aumentado</option>
                </select>
              </Field>
              <Field label="Intestino">
                <select name="habito_intestinal" className={selectClass}>
                  <option value="">-</option>
                  <option value="diario">Diário</option>
                  <option value="2_3_dias">2-3 dias</option>
                  <option value="constipado">Constipado</option>
                </select>
              </Field>
              <Field label="Fezes">
                <select name="consistencia_fezes" className={selectClass}>
                  <option value="">-</option>
                  <option value="mole">Mole</option>
                  <option value="normal">Normal</option>
                  <option value="endurecida">Endurecida</option>
                </select>
              </Field>
              <Field label="Cor urina">
                <select name="cor_urina" className={selectClass}>
                  <option value="">-</option>
                  <option value="clara">Clara</option>
                  <option value="levemente_amarelada">Lev. amarela</option>
                  <option value="amarela">Amarela</option>
                  <option value="muito_amarela">Muito amarela</option>
                </select>
              </Field>
              <Field label="Queda cabelo">
                <select name="queda_cabelo" className={selectClass}>
                  <option value="">-</option>
                  <option value="nao">Não</option>
                  <option value="sim">Sim</option>
                </select>
              </Field>
              <Field label="Unhas fracas">
                <select name="unhas_quebradicas" className={selectClass}>
                  <option value="">-</option>
                  <option value="nao">Não</option>
                  <option value="sim">Sim</option>
                </select>
              </Field>
              <Field label="Acne">
                <select name="acne" className={selectClass}>
                  <option value="">-</option>
                  <option value="nao">Não</option>
                  <option value="pouca">Pouca</option>
                  <option value="moderada">Moderada</option>
                  <option value="muita">Muita</option>
                </select>
              </Field>
            </div>
            <div className="grid gap-6 mt-6 pt-6 border-t border-gray-100">
              <Field label="Doenças diagnosticadas" full>
                <textarea name="doencas" rows={2} className={textareaClass} placeholder="Diabetes, hipertensão, tireoide..." />
              </Field>
              <Field label="Histórico familiar" full>
                <textarea name="historico_familiar" rows={2} className={textareaClass} placeholder="Doenças na família..." />
              </Field>
              <Field label="Medicamentos em uso" full>
                <textarea name="medicamentos" rows={2} className={textareaClass} placeholder="Liste todos os medicamentos..." />
              </Field>
            </div>
          </Card>

          {/* Histórico Nutricional */}
          <Card title="Histórico Nutricional">
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                <Field label="Dieta especial?" full>
                  <textarea name="dieta_especial" rows={2} className={textareaClass} placeholder="Vegetariana, low carb, etc..." />
                </Field>
                <Field label="Acompanhamento nutricional anterior" full>
                  <textarea name="acompanhamento_anterior" rows={2} className={textareaClass} placeholder="Como foi? Pontos positivos e negativos..." />
                </Field>
                <Field label="Alergias alimentares">
                  <textarea name="alergias" rows={2} className={textareaClass} placeholder="Liste..." />
                </Field>
                <Field label="Alimentos que causam mal-estar">
                  <textarea name="alimentos_mal" rows={2} className={textareaClass} placeholder="Gases, azia..." />
                </Field>
                <Field label="Alimentos que NÃO gosta">
                  <textarea name="alimentos_nao_gosta" rows={2} className={textareaClass} placeholder="Liste..." />
                </Field>
                <Field label="Alimentos que AMA">
                  <textarea name="alimentos_ama" rows={2} className={textareaClass} placeholder="Favoritos..." />
                </Field>
                <Field label="Industrializados que consome" full>
                  <textarea name="industrializados" rows={2} className={textareaClass} placeholder="Biscoitos, refrigerantes..." />
                </Field>
                <Field label="Vegetais preferidos" full>
                  <textarea name="vegetais_gosta" rows={2} className={textareaClass} placeholder="Legumes, verduras..." />
                </Field>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6 pt-6 border-t border-gray-100">
                <Field label="Refeições/dia">
                  <input type="number" name="refeicoes_dia" className={inputClass} placeholder="4" />
                </Field>
                <Field label="Água (L/dia)">
                  <input type="number" name="agua_litros" step="0.1" className={inputClass} placeholder="2.0" />
                </Field>
                <Field label="Café (xíc.)">
                  <input type="text" name="cafe" className={inputClass} placeholder="3" />
                </Field>
                <Field label="Paladar">
                  <select name="paladar" className={selectClass}>
                    <option value="">-</option>
                    <option value="doce">Doce</option>
                    <option value="salgado">Salgado</option>
                    <option value="azedo">Azedo</option>
                    <option value="amargo">Amargo</option>
                  </select>
                </Field>
              </div>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6 pt-6 border-t border-gray-100">
                <Field label="Refeições fora de casa">
                  <textarea name="refeicoes_fora" rows={2} className={textareaClass} placeholder="Quais..." />
                </Field>
                <Field label="Marmita ou rua?">
                  <textarea name="marmita" rows={2} className={textareaClass} placeholder="Situação..." />
                </Field>
                <Field label="Óleo para cozinhar">
                  <input type="text" name="oleo" className={inputClass} placeholder="Azeite, pouco" />
                </Field>
                <Field label="Açúcar">
                  <input type="text" name="acucar" className={inputClass} placeholder="2 colheres/dia" />
                </Field>
                <Field label="Horário com mais fome">
                  <input type="text" name="horario_mais_fome" className={inputClass} placeholder="17h" />
                </Field>
                <Field label="'Besteiras' - o que e frequência">
                  <textarea name="besteiras" rows={2} className={textareaClass} placeholder="Chocolate, fast food..." />
                </Field>
                <Field label="Refeições mais difíceis" full>
                  <textarea name="refeicoes_dificeis" rows={2} className={textareaClass} placeholder="Qual e porquê..." />
                </Field>
                <Field label="Alimentação nos FDS" full>
                  <textarea name="alimentacao_fds" rows={2} className={textareaClass} placeholder="Como é nos finais de semana..." />
                </Field>
              </div>
            </div>
          </Card>

          {/* Recordatório */}
          <Card title="Recordatório Alimentar">
            <div className="bg-gray-100 rounded-xl p-4 mb-6 text-sm text-gray-600">
              Descreva o que come em um dia típico (24h). Inclua horário, local e quantidade aproximada.
            </div>
            <div className="space-y-6">
              <Field label="1ª Refeição" full>
                <textarea name="refeicao_1" rows={3} className={textareaClass} placeholder="7h - Casa - Pão, ovo, café com leite..." />
              </Field>
              <Field label="2ª Refeição" full>
                <textarea name="refeicao_2" rows={3} className={textareaClass} placeholder="10h - Trabalho - Fruta, iogurte..." />
              </Field>
              <Field label="3ª Refeição" full>
                <textarea name="refeicao_3" rows={3} className={textareaClass} placeholder="12h30 - Restaurante - Arroz, feijão, frango, salada..." />
              </Field>
              <Field label="4ª Refeição" full>
                <textarea name="refeicao_4" rows={3} className={textareaClass} placeholder="16h - Casa - Lanche..." />
              </Field>
              <Field label="5ª Refeição" full>
                <textarea name="refeicao_5" rows={3} className={textareaClass} placeholder="20h - Casa - Jantar..." />
              </Field>
              <Field label="6ª Refeição (se houver)" full>
                <textarea name="refeicao_6" rows={3} className={textareaClass} placeholder="Preencha se fizer uma 6ª refeição..." />
              </Field>
              <Field label="Observações finais" full>
                <textarea name="observacoes" rows={4} className={textareaClass} placeholder="Histórico de dietas, dificuldades, expectativas, dúvidas..." />
              </Field>
            </div>
          </Card>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Submit */}
          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-3 px-12 py-4 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 text-white font-medium rounded-full transition-all text-lg"
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
            <p className="mt-4 text-gray-400 text-sm">
              Suas informações são confidenciais
            </p>
          </div>
        </form>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} VP Nutrição</p>
      </footer>
    </main>
  );
};
