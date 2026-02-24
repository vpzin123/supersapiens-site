'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Send, Loader2, ChevronRight, ChevronLeft, User, Activity, Stethoscope, Apple, ClipboardList, Zap, AlertCircle, Shuffle } from 'lucide-react';

interface FieldError {
  field: string;
  message: string;
  section: number;
}

export const QuestionnaireModel2 = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [nomePreenchido, setNomePreenchido] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldError[]>([]);
  const [showValidationError, setShowValidationError] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setLoaded(true);
    // Recupera o nome da página de introdução
    const nomeSalvo = localStorage.getItem('supersapiens_nome');
    if (nomeSalvo) {
      setNomePreenchido(nomeSalvo);
    }
  }, []);

  const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
  const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  const fillRandomPatient = useCallback(() => {
    if (!formRef.current) return;
    const form = formRef.current;

    const nomes = [
      'Lucas Oliveira', 'Marina Santos', 'Pedro Almeida', 'Camila Costa',
      'Rafael Ferreira', 'Juliana Souza', 'Bruno Rodrigues', 'Amanda Lima',
      'Thiago Pereira', 'Carolina Martins', 'Gabriel Ribeiro', 'Fernanda Araújo',
      'Matheus Barbosa', 'Larissa Gomes', 'Diego Nascimento', 'Beatriz Cardoso',
    ];
    const profissoes = [
      'Engenheiro(a)', 'Advogado(a)', 'Professor(a)', 'Empresário(a)',
      'Médico(a)', 'Designer', 'Programador(a)', 'Nutricionista',
      'Personal Trainer', 'Administrador(a)', 'Dentista', 'Arquiteto(a)',
    ];
    const objetivos = [
      'Ganhar massa muscular e melhorar a composição corporal',
      'Emagrecer 8kg mantendo massa magra',
      'Melhorar performance nos treinos de CrossFit',
      'Reduzir gordura abdominal e definir o corpo',
      'Ganhar peso de forma saudável, tenho dificuldade de engordar',
      'Preparação para competição de bodybuilding natural',
      'Melhorar disposição e energia no dia a dia',
      'Reeducação alimentar completa, como muito industrializado',
    ];
    const exerciciosOpts = [
      'Musculação 5x/semana + cardio 3x', 'CrossFit 4x/semana',
      'Musculação 3x/semana', 'Corrida 3x + musculação 2x',
      'Treino funcional 4x/semana', 'Jiu-jitsu 3x + musculação 3x',
      'Natação 2x + musculação 4x', 'Não pratico exercícios atualmente',
    ];
    const dificuldades = [
      'Falta de tempo para cozinhar, acabo comendo fast food',
      'Ansiedade me faz comer compulsivamente à noite',
      'Não consigo manter consistência na dieta nos fins de semana',
      'Viajo muito a trabalho e não consigo manter uma rotina',
      'Falta de conhecimento sobre o que comer em cada refeição',
      'Preguiça de preparar as refeições, como qualquer coisa',
    ];
    const doencasOpts = ['Nenhuma', 'Hipotireoidismo', 'Gastrite', 'Rinite alérgica', 'Nenhuma diagnosticada'];
    const historicoOpts = ['Diabetes (mãe)', 'Hipertensão (pai)', 'Nenhum relevante', 'Colesterol alto (avô)', 'Câncer de mama (avó)'];
    const medicamentosOpts = ['Nenhum', 'Levotiroxina 50mcg', 'Anticoncepcional', 'Omeprazol 20mg', 'Nenhum no momento'];
    const dietaOpts = ['Nenhuma', 'Low carb', 'Dieta flexível', 'Nenhuma específica', 'Tentei cetogênica mas não mantive'];
    const acompOpts = ['Nunca tive', 'Sim, há 2 anos, mas parei', 'Sim, segui por 3 meses', 'Nunca com nutricionista esportivo'];
    const alergiasOpts = ['Nenhuma', 'Lactose', 'Nenhuma conhecida', 'Camarão', 'Glúten (sensibilidade leve)'];
    const malOpts = ['Leite causa gases', 'Feijão dá estufamento', 'Nenhum específico', 'Frituras dão azia', 'Pimentão causa refluxo'];
    const naoGostaOpts = ['Berinjela, quiabo, jiló', 'Beterraba, fígado', 'Chuchu, abobrinha', 'Peixe cru, frutos do mar', 'Não como fígado nem rim'];
    const industrializadosOpts = ['Biscoito recheado, refrigerante às vezes', 'Pão de forma, requeijão', 'Pouco, só whey e barra de cereal', 'Salgadinhos, sorvete no fds', 'Quase nada'];
    const vegetaisOpts = ['Brócolis, espinafre, couve', 'Alface, tomate, cenoura', 'Rúcula, agrião, beterraba', 'Abobrinha, vagem, chuchu', 'Como quase todos os vegetais'];
    const foraOpts = ['Almoço no restaurante perto do trabalho', 'Quase nunca como fora', 'Janta fora 2-3x por semana', 'Só nos fins de semana'];
    const marmitaOpts = ['Levo marmita todo dia', 'Como na rua mesmo', 'Alterno marmita e restaurante', 'Peço delivery no trabalho'];
    const besteirasOpts = ['Chocolate à noite, 3x/semana', 'Pizza no fim de semana', 'Sorvete e biscoito quando ansioso', 'Raramente como besteira', 'Salgados de padaria quase todo dia'];
    const dificeisOpts = ['Café da manhã, não tenho fome cedo', 'Lanche da tarde, esqueço de comer', 'Jantar, chego tarde do trabalho', 'Todas são fáceis, meu problema é quantidade'];
    const fdsOpts = ['Muito pior, como de tudo', 'Parecida com a semana', 'Mais liberdade, churrasco e cerveja', 'Totalmente desregulada, pulo refeições', 'Saio pra comer fora, como bastante'];
    const amaOpts = ['Arroz, feijão, bife acebolado', 'Sushi, pizza, açaí', 'Frango grelhado, batata doce, ovo', 'Lasanha, strogonoff, hambúrguer', 'Churrasco, macarrão, pão de queijo'];

    const nome = pick(nomes);
    const sexo = pick(['masculino', 'feminino']);
    const idade = rand(20, 50);
    const altura = sexo === 'masculino' ? rand(165, 195) : rand(155, 178);
    const peso = sexo === 'masculino' ? rand(65, 110) : rand(50, 90);
    const pesoDesejado = peso + pick([-8, -5, -3, 3, 5, 8]);
    const birthYear = new Date().getFullYear() - idade;
    const birthMonth = String(rand(1, 12)).padStart(2, '0');
    const birthDay = String(rand(1, 28)).padStart(2, '0');

    const setValue = (name: string, value: string) => {
      const el = form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
      if (!el) return;
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        el instanceof HTMLTextAreaElement ? window.HTMLTextAreaElement.prototype :
        el instanceof HTMLSelectElement ? window.HTMLSelectElement.prototype :
        window.HTMLInputElement.prototype, 'value'
      )?.set;
      if (nativeInputValueSetter) {
        nativeInputValueSetter.call(el, value);
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }
    };

    // Seção 0 - Dados Pessoais
    setValue('nome', nome);
    setNomePreenchido(nome);
    setValue('email', nome.toLowerCase().replace(/ /g, '.').normalize('NFD').replace(/[\u0300-\u036f]/g, '') + '@gmail.com');
    setValue('whatsapp', `(${rand(11, 99)}) 9${rand(1000, 9999)}-${rand(1000, 9999)}`);
    setValue('data_nascimento', `${birthYear}-${birthMonth}-${birthDay}`);
    setValue('idade', String(idade));
    setValue('sexo', sexo);
    setValue('profissao', pick(profissoes));
    setValue('altura', String(altura));
    setValue('peso', String(peso));
    setValue('peso_desejado', String(pesoDesejado));
    setValue('objetivo_principal', pick(objetivos));

    // Seção 1 - Hábitos
    setValue('horario_acordar', `0${rand(5, 8)}:${pick(['00', '15', '30', '45'])}`);
    setValue('horario_dormir', `${rand(22, 23)}:${pick(['00', '15', '30', '45'])}`);
    setValue('horarios_variados', pick(['Não, mantenho horários fixos', 'Sim, nos fins de semana acordo mais tarde', 'Sim, trabalho em turnos variados']));
    setValue('qualidade_sono', String(rand(4, 9)));
    setValue('nivel_stress', String(rand(3, 8)));
    setValue('nivel_ansiedade', String(rand(2, 8)));
    setValue('nivel_perfeccionismo', String(rand(3, 9)));
    setValue('nivel_imediatismo', String(rand(3, 8)));
    setValue('disposicao_diaria', pick(['bem_disposto', 'cansaco_leve', 'cansaco_moderado']));
    setValue('periodo_mais_disposto', pick(['manha', 'tarde', 'noite']));
    setValue('fuma', pick(['nao', 'nao', 'nao', 'sim', 'ex_fumante']));
    setValue('consome_alcool', pick(['nao', 'raramente', 'socialmente', 'frequentemente']));
    setValue('detalhes_alcool', pick(['Não bebo', 'Cerveja no fim de semana, 2-3 long necks', 'Vinho 1-2x por semana', 'Social, em festas e eventos']));
    setValue('exercicios', pick(exerciciosOpts));
    setValue('motivos_dificuldade', pick(dificuldades));

    // Seção 2 - Clínicos
    setValue('mastigacao', pick(['lenta', 'normal', 'rapida']));
    setValue('apetite', pick(['diminuido', 'normal', 'aumentado']));
    setValue('habito_intestinal', pick(['diario', '2_3_dias', 'constipado']));
    setValue('consistencia_fezes', pick(['mole', 'normal', 'endurecida']));
    setValue('cor_urina', pick(['clara', 'levemente_amarelada', 'amarela']));
    setValue('queda_cabelo', pick(['nao', 'nao', 'sim']));
    setValue('unhas_quebradicas', pick(['nao', 'nao', 'sim']));
    setValue('acne', pick(['nao', 'pouca', 'moderada']));
    setValue('doencas', pick(doencasOpts));
    setValue('historico_familiar', pick(historicoOpts));
    setValue('medicamentos', pick(medicamentosOpts));

    // Seção 3 - Nutricional
    setValue('dieta_especial', pick(dietaOpts));
    setValue('acompanhamento_anterior', pick(acompOpts));
    setValue('alergias', pick(alergiasOpts));
    setValue('alimentos_mal', pick(malOpts));
    setValue('alimentos_nao_gosta', pick(naoGostaOpts));
    setValue('industrializados', pick(industrializadosOpts));
    setValue('vegetais_gosta', pick(vegetaisOpts));
    setValue('refeicoes_dia', String(rand(3, 6)));
    setValue('agua_litros', String((rand(10, 35) / 10).toFixed(1)));
    setValue('refeicoes_fora', pick(foraOpts));
    setValue('marmita', pick(marmitaOpts));
    setValue('cafe', `${rand(1, 5)} xícaras`);
    setValue('oleo', pick(['Azeite de oliva', 'Óleo de coco', 'Óleo de soja', 'Manteiga']));
    setValue('acucar', pick(['Não uso', '1 colher', '2 colheres', 'Adoçante']));
    setValue('paladar', pick(['doce', 'salgado']));
    setValue('horario_mais_fome', `${rand(15, 21)}h`);
    setValue('besteiras', pick(besteirasOpts));
    setValue('refeicoes_dificeis', pick(dificeisOpts));
    setValue('alimentacao_fds', pick(fdsOpts));
    setValue('alimentos_ama', pick(amaOpts));

    // Seção 4 - Recordatório
    setValue('refeicao_1', `0${rand(6, 8)}:00 - Casa - ${pick(['2 ovos mexidos, 1 fatia pão integral, café preto', '1 banana com aveia e whey, café com leite', 'Tapioca com queijo e presunto, suco de laranja', 'Mingau de aveia com frutas, café sem açúcar'])}`);
    setValue('refeicao_2', `${rand(9, 10)}:30 - ${pick(['Trabalho', 'Casa'])} - ${pick(['1 maçã com pasta de amendoim', '1 iogurte natural com granola', 'Mix de castanhas', 'Banana com canela'])}`);
    setValue('refeicao_3', `12:${pick(['00', '30'])} - ${pick(['Restaurante', 'Trabalho', 'Casa'])} - ${pick(['Arroz, feijão, frango grelhado, salada verde', 'Arroz, carne moída, brócolis, batata', 'Macarrão com frango, salada de alface e tomate', 'Arroz integral, tilápia, legumes salteados'])}`);
    setValue('refeicao_4', `${rand(15, 16)}:${pick(['00', '30'])} - ${pick(['Trabalho', 'Casa'])} - ${pick(['Pão integral com peito de peru e queijo', 'Shake de whey com banana e aveia', 'Fruta + punhado de castanhas', 'Crepioca com frango desfiado'])}`);
    setValue('refeicao_5', `${rand(19, 20)}:${pick(['00', '30'])} - Casa - ${pick(['Omelete de 3 ovos com legumes, salada', 'Frango grelhado com batata doce e brócolis', 'Sopa de legumes com frango', 'Arroz, feijão, bife, salada variada'])}`);
    setValue('refeicao_6', pick(['', `${rand(21, 22)}:00 - Casa - ${pick(['1 copo de leite com cacau', 'Iogurte grego com mel', 'Caseína com pasta de amendoim', ''])}`]));
    setValue('observacoes', pick(['Nenhuma observação adicional', 'Tenho bastante pressa em ver resultados', 'Costumo treinar em jejum pela manhã', 'Quero aprender a comer melhor, estou motivado(a)', '']));

    setFieldErrors([]);
    setShowValidationError(false);
    setActiveSection(0);
  }, []);

  // Campos obrigatórios por seção
  const requiredFields: { [key: number]: { name: string; label: string }[] } = {
    0: [
      { name: 'nome', label: 'Nome completo' },
      { name: 'email', label: 'E-mail' },
      { name: 'whatsapp', label: 'WhatsApp' },
      { name: 'data_nascimento', label: 'Data de nascimento' },
      { name: 'idade', label: 'Idade' },
      { name: 'sexo', label: 'Sexo biológico' },
      { name: 'profissao', label: 'Profissão' },
      { name: 'altura', label: 'Altura' },
      { name: 'peso', label: 'Peso atual' },
      { name: 'objetivo_principal', label: 'Objetivo principal' },
    ],
  };

  // Valida campos de uma seção específica
  const validateSection = (sectionIndex: number): FieldError[] => {
    const errors: FieldError[] = [];
    const fields = requiredFields[sectionIndex] || [];

    if (!formRef.current) return errors;
    const formData = new FormData(formRef.current);

    fields.forEach(({ name, label }) => {
      const value = formData.get(name) as string;
      if (!value || value.trim() === '') {
        errors.push({ field: name, message: `${label} é obrigatório`, section: sectionIndex });
      }
    });

    // Validação extra para e-mail
    if (sectionIndex === 0) {
      const email = formData.get('email') as string;
      if (email && !email.includes('@')) {
        errors.push({ field: 'email', message: 'E-mail inválido', section: 0 });
      }
    }

    return errors;
  };

  // Valida todas as seções
  const validateAllSections = (): FieldError[] => {
    let allErrors: FieldError[] = [];
    Object.keys(requiredFields).forEach((key) => {
      const sectionErrors = validateSection(parseInt(key));
      allErrors = [...allErrors, ...sectionErrors];
    });
    return allErrors;
  };

  // Verifica se um campo específico tem erro
  const hasError = (fieldName: string): boolean => {
    return fieldErrors.some(e => e.field === fieldName);
  };

  // Pega mensagem de erro de um campo
  const getErrorMessage = (fieldName: string): string => {
    const error = fieldErrors.find(e => e.field === fieldName);
    return error ? error.message : '';
  };

  // Limpa erro de um campo quando ele é preenchido
  const clearFieldError = (fieldName: string) => {
    setFieldErrors(prev => prev.filter(e => e.field !== fieldName));
  };

  const sections = [
    { id: 'dados', icon: User, title: 'Dados' },
    { id: 'habitos', icon: Activity, title: 'Hábitos' },
    { id: 'clinicos', icon: Stethoscope, title: 'Saúde' },
    { id: 'nutricional', icon: Apple, title: 'Nutrição' },
    { id: 'recordatorio', icon: ClipboardList, title: '24h' },
  ];

  const handleNextSection = () => {
    const errors = validateSection(activeSection);
    if (errors.length > 0) {
      setFieldErrors(errors);
      setShowValidationError(true);
      // Scroll para o primeiro erro
      const firstErrorField = document.querySelector(`[name="${errors[0].field}"]`);
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    setFieldErrors([]);
    setShowValidationError(false);
    setActiveSection(activeSection + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Valida todas as seções antes de enviar
    const allErrors = validateAllSections();
    if (allErrors.length > 0) {
      setFieldErrors(allErrors);
      setShowValidationError(true);
      // Vai para a primeira seção com erro
      const firstErrorSection = allErrors[0].section;
      setActiveSection(firstErrorSection);
      setTimeout(() => {
        const firstErrorField = document.querySelector(`[name="${allErrors[0].field}"]`);
        if (firstErrorField) {
          firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      return;
    }

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
        window.location.href = '/obrigado/';
      } else {
        setError('Erro ao enviar. Tente novamente.');
      }
    } catch {
      setError('Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:bg-white/10 transition-all text-base";
  const inputErrorClass = "w-full bg-red-500/5 border border-red-500/50 rounded-xl px-4 py-3.5 text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all text-base";
  const labelClass = "block text-sm font-medium text-neutral-300 mb-2";
  const selectClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:bg-white/10 transition-all appearance-none cursor-pointer text-base";
  const selectErrorClass = "w-full bg-red-500/5 border border-red-500/50 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all appearance-none cursor-pointer text-base";
  const cardClass = "space-y-5 bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-2xl p-5 md:p-6 backdrop-blur-sm relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/5 before:to-transparent before:pointer-events-none";

  // Componente de erro inline
  const FieldErrorMessage = ({ fieldName }: { fieldName: string }) => {
    if (!hasError(fieldName)) return null;
    return (
      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
        <AlertCircle className="w-3 h-3" />
        {getErrorMessage(fieldName)}
      </p>
    );
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Google Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        @keyframes grid-move {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
      `}</style>

      {/* Background Elements */}
      {/* Grid pattern sutil */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Glow spots */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" style={{ animation: 'pulse-glow 8s ease-in-out infinite' }} />
      <div className="fixed bottom-40 right-10 w-96 h-96 bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" style={{ animation: 'pulse-glow 10s ease-in-out infinite 2s' }} />


      {/* Header */}
      <header className={`relative z-40 transition-all duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-2xl mx-auto px-5 py-6 md:py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-[0_0_25px_rgba(249,115,22,0.3)]">
                SUPERSAPIENS
              </h1>
            </div>
            <div className="text-right">
              <p className="text-sm md:text-base font-medium text-white">vpneuroscience@icloud.com</p>
              <p className="text-xs md:text-sm text-neutral-500 mt-0.5">serious business only</p>
            </div>
          </div>
        </div>
      </header>

      {/* Energy Line Animation */}
      <div className={`relative z-30 py-8 transition-all duration-700 delay-200 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-2xl mx-auto px-5">
          <svg width="100%" height="40" viewBox="0 0 500 40" preserveAspectRatio="xMidYMid meet" className="mx-auto max-w-3xl">
            <defs>
              <linearGradient id="energyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0" />
                <stop offset="50%" stopColor="#f97316" stopOpacity="1" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Linha base */}
            <line x1="20" y1="20" x2="480" y2="20" stroke="#f97316" strokeWidth="1" opacity="0.2" />

            {/* Linha com glow animado */}
            <line x1="20" y1="20" x2="480" y2="20" stroke="url(#energyGrad)" strokeWidth="2" filter="url(#glow)">
              <animate attributeName="x1" values="20;200;20" dur="2s" repeatCount="indefinite" />
              <animate attributeName="x2" values="200;480;200" dur="2s" repeatCount="indefinite" />
            </line>

            {/* Pulsos de energia */}
            <circle cx="250" cy="20" r="3" fill="#f97316" filter="url(#glow)">
              <animate attributeName="cx" values="20;480;20" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0.5;1" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="250" cy="20" r="2" fill="#f97316" filter="url(#glow)">
              <animate attributeName="cx" values="480;20;480" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2.5s" repeatCount="indefinite" />
            </circle>

            {/* Nós de energia nas pontas */}
            <circle cx="20" cy="20" r="4" fill="none" stroke="#f97316" strokeWidth="1.5" opacity="0.5">
              <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0.8;0.5" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="480" cy="20" r="4" fill="none" stroke="#f97316" strokeWidth="1.5" opacity="0.5">
              <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite" begin="0.75s" />
              <animate attributeName="opacity" values="0.5;0.8;0.5" dur="1.5s" repeatCount="indefinite" begin="0.75s" />
            </circle>
          </svg>
        </div>
      </div>

      {/* Progress Navigation */}
      <div className={`sticky top-0 z-40 bg-black/80 backdrop-blur-xl transition-all duration-700 delay-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-2xl mx-auto px-5 py-4">
          {/* Progress Bar */}
          <div className="h-1 bg-white/10 rounded-full mb-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-600 to-orange-400 transition-all duration-500 rounded-full"
              style={{ width: `${((activeSection + 1) / sections.length) * 100}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            {sections.map((section, index) => (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveSection(index)}
                className={`flex flex-col items-center gap-1.5 px-2 py-2 rounded-lg transition-all ${
                  activeSection === index
                    ? 'text-orange-400'
                    : index < activeSection
                    ? 'text-neutral-500'
                    : 'text-neutral-600'
                }`}
              >
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all ${
                  activeSection === index
                    ? 'bg-orange-500/20 border-2 border-orange-500 shadow-lg shadow-orange-500/20'
                    : index < activeSection
                    ? 'bg-orange-500/10 border-2 border-orange-500/50'
                    : 'bg-white/5 border-2 border-white/10'
                }`}>
                  <section.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium">{section.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className={`relative z-10 max-w-2xl mx-auto px-5 py-8 transition-all duration-700 delay-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Alerta de validação global */}
        {showValidationError && fieldErrors.length > 0 && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-400 font-medium">Preencha os campos obrigatórios</p>
              <p className="text-red-400/70 text-sm mt-1">
                {fieldErrors.length} {fieldErrors.length === 1 ? 'campo precisa' : 'campos precisam'} ser preenchido{fieldErrors.length === 1 ? '' : 's'}
              </p>
            </div>
          </div>
        )}

        {/* Botão de teste - gerar paciente aleatório */}
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={fillRandomPatient}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-neutral-400 hover:text-orange-400 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all text-sm"
          >
            <Shuffle className="w-4 h-4" />
            Gerar paciente teste
          </button>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">

          {/* DADOS PESSOAIS */}
          <section className={activeSection === 0 ? 'block' : 'hidden'}>
            <div className="mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-1 flex items-center gap-2"><span className="w-1.5 h-6 bg-orange-500 rounded-full"></span>Dados Pessoais</h2>
              <p className="text-neutral-500 text-sm">Informações para identificação</p>
            </div>
            <div className={cardClass}>
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className={labelClass}>Nome completo *</label>
                  <input type="text" name="nome" className={hasError('nome') ? inputErrorClass : inputClass} placeholder="Seu nome completo" defaultValue={nomePreenchido} onChange={() => clearFieldError('nome')} />
                  <FieldErrorMessage fieldName="nome" />
                </div>
                <div>
                  <label className={labelClass}>E-mail *</label>
                  <input type="email" name="email" className={hasError('email') ? inputErrorClass : inputClass} placeholder="seu@email.com" onChange={() => clearFieldError('email')} />
                  <FieldErrorMessage fieldName="email" />
                </div>
                <div>
                  <label className={labelClass}>WhatsApp *</label>
                  <input type="tel" name="whatsapp" className={hasError('whatsapp') ? inputErrorClass : inputClass} placeholder="(00) 00000-0000" onChange={() => clearFieldError('whatsapp')} />
                  <FieldErrorMessage fieldName="whatsapp" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Data de nascimento *</label>
                  <input type="date" name="data_nascimento" className={`${hasError('data_nascimento') ? inputErrorClass : inputClass} [color-scheme:dark]`} onChange={() => clearFieldError('data_nascimento')} />
                  <FieldErrorMessage fieldName="data_nascimento" />
                </div>
                <div>
                  <label className={labelClass}>Idade *</label>
                  <input type="number" name="idade" className={hasError('idade') ? inputErrorClass : inputClass} placeholder="25" onChange={() => clearFieldError('idade')} />
                  <FieldErrorMessage fieldName="idade" />
                </div>
                <div>
                  <label className={labelClass}>Sexo biológico *</label>
                  <select name="sexo" className={hasError('sexo') ? selectErrorClass : selectClass} onChange={() => clearFieldError('sexo')}>
                    <option value="" className="bg-black">Selecione</option>
                    <option value="masculino" className="bg-black">Masculino</option>
                    <option value="feminino" className="bg-black">Feminino</option>
                  </select>
                  <FieldErrorMessage fieldName="sexo" />
                </div>
                <div>
                  <label className={labelClass}>Profissão *</label>
                  <input type="text" name="profissao" className={hasError('profissao') ? inputErrorClass : inputClass} placeholder="Sua profissão" onChange={() => clearFieldError('profissao')} />
                  <FieldErrorMessage fieldName="profissao" />
                </div>
                <div>
                  <label className={labelClass}>Altura (cm) *</label>
                  <input type="number" name="altura" className={hasError('altura') ? inputErrorClass : inputClass} placeholder="170" onChange={() => clearFieldError('altura')} />
                  <FieldErrorMessage fieldName="altura" />
                </div>
                <div>
                  <label className={labelClass}>Peso atual (kg) *</label>
                  <input type="number" name="peso" step="0.1" className={hasError('peso') ? inputErrorClass : inputClass} placeholder="70.0" onChange={() => clearFieldError('peso')} />
                  <FieldErrorMessage fieldName="peso" />
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>Peso desejado (kg)</label>
                  <input type="number" name="peso_desejado" step="0.1" className={inputClass} placeholder="65.0" />
                </div>
              </div>
              <div>
                <label className={labelClass}>Qual seu principal objetivo? *</label>
                <textarea name="objetivo_principal" rows={3} className={hasError('objetivo_principal') ? inputErrorClass : inputClass} placeholder="Descreva seu objetivo..." onChange={() => clearFieldError('objetivo_principal')} />
                <FieldErrorMessage fieldName="objetivo_principal" />
              </div>
            </div>
          </section>

          {/* HÁBITOS DE VIDA */}
          <section className={activeSection === 1 ? 'block' : 'hidden'}>
            <div className="mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-1 flex items-center gap-2"><span className="w-1.5 h-6 bg-orange-500 rounded-full"></span>Hábitos de Vida</h2>
              <p className="text-neutral-500 text-sm">Sua rotina e estilo de vida</p>
            </div>
            <div className={cardClass}>
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
                <label className={labelClass}>Horários variam durante a semana?</label>
                <textarea name="horarios_variados" rows={2} className={inputClass} placeholder="Descreva se houver variação..." />
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-sm text-neutral-400 mb-4">Avalie de 0 a 10:</p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <label className={labelClass}>Sono</label>
                    <input type="number" name="qualidade_sono" min="0" max="10" className={inputClass} placeholder="0-10" />
                  </div>
                  <div>
                    <label className={labelClass}>Stress</label>
                    <input type="number" name="nivel_stress" min="0" max="10" className={inputClass} placeholder="0-10" />
                  </div>
                  <div>
                    <label className={labelClass}>Ansiedade</label>
                    <input type="number" name="nivel_ansiedade" min="0" max="10" className={inputClass} placeholder="0-10" />
                  </div>
                  <div>
                    <label className={labelClass}>Perfeccion.</label>
                    <input type="number" name="nivel_perfeccionismo" min="0" max="10" className={inputClass} placeholder="0-10" />
                  </div>
                  <div>
                    <label className={labelClass}>Imediatismo</label>
                    <input type="number" name="nivel_imediatismo" min="0" max="10" className={inputClass} placeholder="0-10" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Disposição durante o dia</label>
                  <select name="disposicao_diaria" className={selectClass}>
                    <option value="" className="bg-black">Selecione</option>
                    <option value="bem_disposto" className="bg-black">Bem disposto(a)</option>
                    <option value="cansaco_leve" className="bg-black">Cansaço leve</option>
                    <option value="cansaco_moderado" className="bg-black">Cansaço moderado</option>
                    <option value="muito_cansaco" className="bg-black">Muito cansaço</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Período mais disposto</label>
                  <select name="periodo_mais_disposto" className={selectClass}>
                    <option value="" className="bg-black">Selecione</option>
                    <option value="manha" className="bg-black">Manhã</option>
                    <option value="tarde" className="bg-black">Tarde</option>
                    <option value="noite" className="bg-black">Noite</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Fuma?</label>
                  <select name="fuma" className={selectClass}>
                    <option value="" className="bg-black">Selecione</option>
                    <option value="nao" className="bg-black">Não</option>
                    <option value="sim" className="bg-black">Sim</option>
                    <option value="ex_fumante" className="bg-black">Ex-fumante</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Consome álcool?</label>
                  <select name="consome_alcool" className={selectClass}>
                    <option value="" className="bg-black">Selecione</option>
                    <option value="nao" className="bg-black">Não</option>
                    <option value="raramente" className="bg-black">Raramente</option>
                    <option value="socialmente" className="bg-black">Socialmente</option>
                    <option value="frequentemente" className="bg-black">Frequentemente</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={labelClass}>Detalhes sobre álcool</label>
                <textarea name="detalhes_alcool" rows={2} className={inputClass} placeholder="Tipo, quantidade, frequência..." />
              </div>
              <div>
                <label className={labelClass}>Exercícios praticados</label>
                <textarea name="exercicios" rows={2} className={inputClass} placeholder="Tipo e frequência semanal..." />
              </div>
              <div>
                <label className={labelClass}>Por que acha que não consegue atingir seus objetivos?</label>
                <textarea name="motivos_dificuldade" rows={3} className={inputClass} placeholder="Descreva suas dificuldades..." />
              </div>
            </div>
          </section>

          {/* DADOS CLÍNICOS */}
          <section className={activeSection === 2 ? 'block' : 'hidden'}>
            <div className="mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-1 flex items-center gap-2"><span className="w-1.5 h-6 bg-orange-500 rounded-full"></span>Dados Clínicos</h2>
              <p className="text-neutral-500 text-sm">Informações sobre sua saúde</p>
            </div>
            <div className={cardClass}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Mastigação</label>
                  <select name="mastigacao" className={selectClass}>
                    <option value="" className="bg-black">Selecione</option>
                    <option value="lenta" className="bg-black">Lenta</option>
                    <option value="normal" className="bg-black">Normal</option>
                    <option value="rapida" className="bg-black">Rápida</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Apetite</label>
                  <select name="apetite" className={selectClass}>
                    <option value="" className="bg-black">Selecione</option>
                    <option value="diminuido" className="bg-black">Diminuído</option>
                    <option value="normal" className="bg-black">Normal</option>
                    <option value="aumentado" className="bg-black">Aumentado</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Hábito intestinal</label>
                  <select name="habito_intestinal" className={selectClass}>
                    <option value="" className="bg-black">Selecione</option>
                    <option value="diario" className="bg-black">Diário</option>
                    <option value="2_3_dias" className="bg-black">2-3 dias</option>
                    <option value="constipado" className="bg-black">Constipado</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Consistência fezes</label>
                  <select name="consistencia_fezes" className={selectClass}>
                    <option value="" className="bg-black">Selecione</option>
                    <option value="mole" className="bg-black">Mole</option>
                    <option value="normal" className="bg-black">Normal</option>
                    <option value="endurecida" className="bg-black">Endurecida</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Cor da urina</label>
                  <select name="cor_urina" className={selectClass}>
                    <option value="" className="bg-black">Selecione</option>
                    <option value="clara" className="bg-black">Clara</option>
                    <option value="levemente_amarelada" className="bg-black">Levemente amarelada</option>
                    <option value="amarela" className="bg-black">Amarela</option>
                    <option value="muito_amarela" className="bg-black">Muito amarela</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Queda de cabelo?</label>
                  <select name="queda_cabelo" className={selectClass}>
                    <option value="" className="bg-black">Selecione</option>
                    <option value="nao" className="bg-black">Não</option>
                    <option value="sim" className="bg-black">Sim</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Unhas quebradiças?</label>
                  <select name="unhas_quebradicas" className={selectClass}>
                    <option value="" className="bg-black">Selecione</option>
                    <option value="nao" className="bg-black">Não</option>
                    <option value="sim" className="bg-black">Sim</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Acne?</label>
                  <select name="acne" className={selectClass}>
                    <option value="" className="bg-black">Selecione</option>
                    <option value="nao" className="bg-black">Não</option>
                    <option value="pouca" className="bg-black">Pouca</option>
                    <option value="moderada" className="bg-black">Moderada</option>
                    <option value="muita" className="bg-black">Muita</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={labelClass}>Possui alguma doença?</label>
                <textarea name="doencas" rows={2} className={inputClass} placeholder="Diabetes, hipertensão, tireoide..." />
              </div>
              <div>
                <label className={labelClass}>Histórico de doença na família</label>
                <textarea name="historico_familiar" rows={2} className={inputClass} placeholder="Doenças de pais, avós..." />
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
              <h2 className="text-xl md:text-2xl font-bold text-white mb-1 flex items-center gap-2"><span className="w-1.5 h-6 bg-orange-500 rounded-full"></span>Histórico Nutricional</h2>
              <p className="text-neutral-500 text-sm">Seus hábitos alimentares</p>
            </div>
            <div className={cardClass}>
              <div>
                <label className={labelClass}>Segue alguma dieta especial?</label>
                <textarea name="dieta_especial" rows={2} className={inputClass} placeholder="Vegetariana, low carb, etc..." />
              </div>
              <div>
                <label className={labelClass}>Já teve acompanhamento nutricional?</label>
                <textarea name="acompanhamento_anterior" rows={2} className={inputClass} placeholder="Como foi a experiência..." />
              </div>
              <div>
                <label className={labelClass}>Alergias alimentares</label>
                <textarea name="alergias" rows={2} className={inputClass} placeholder="Liste suas alergias..." />
              </div>
              <div>
                <label className={labelClass}>Alimentos que causam mal-estar</label>
                <textarea name="alimentos_mal" rows={2} className={inputClass} placeholder="Gases, azia, desconforto..." />
              </div>
              <div>
                <label className={labelClass}>Alimentos que você NÃO gosta</label>
                <textarea name="alimentos_nao_gosta" rows={2} className={inputClass} placeholder="Liste os alimentos..." />
              </div>
              <div>
                <label className={labelClass}>Industrializados que costuma comer</label>
                <textarea name="industrializados" rows={2} className={inputClass} placeholder="Biscoitos, refrigerantes..." />
              </div>
              <div>
                <label className={labelClass}>Vegetais que mais gosta</label>
                <textarea name="vegetais_gosta" rows={2} className={inputClass} placeholder="Seus vegetais preferidos..." />
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
                <label className={labelClass}>Refeições fora de casa</label>
                <textarea name="refeicoes_fora" rows={2} className={inputClass} placeholder="Quais refeições e onde..." />
              </div>
              <div>
                <label className={labelClass}>Leva marmita ou come na rua?</label>
                <textarea name="marmita" rows={2} className={inputClass} placeholder="Descreva sua rotina..." />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Café por dia</label>
                  <input type="text" name="cafe" className={inputClass} placeholder="3 xícaras" />
                </div>
                <div>
                  <label className={labelClass}>Óleo usado</label>
                  <input type="text" name="oleo" className={inputClass} placeholder="Azeite" />
                </div>
                <div>
                  <label className={labelClass}>Açúcar/dia</label>
                  <input type="text" name="acucar" className={inputClass} placeholder="2 col." />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Paladar preferido</label>
                  <select name="paladar" className={selectClass}>
                    <option value="" className="bg-black">Selecione</option>
                    <option value="doce" className="bg-black">Doce</option>
                    <option value="salgado" className="bg-black">Salgado</option>
                    <option value="azedo" className="bg-black">Azedo</option>
                    <option value="amargo" className="bg-black">Amargo</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Horário com mais fome</label>
                  <input type="text" name="horario_mais_fome" className={inputClass} placeholder="17h" />
                </div>
              </div>
              <div>
                <label className={labelClass}>O que come de "besteira"?</label>
                <textarea name="besteiras" rows={2} className={inputClass} placeholder="O quê e com qual frequência..." />
              </div>
              <div>
                <label className={labelClass}>Refeições mais difíceis de fazer</label>
                <textarea name="refeicoes_dificeis" rows={2} className={inputClass} placeholder="Quais e por quê..." />
              </div>
              <div>
                <label className={labelClass}>Como é sua alimentação no fim de semana?</label>
                <textarea name="alimentacao_fds" rows={2} className={inputClass} placeholder="Descreva..." />
              </div>
              <div>
                <label className={labelClass}>Comidas que você AMA</label>
                <textarea name="alimentos_ama" rows={2} className={inputClass} placeholder="Suas favoritas..." />
              </div>
            </div>
          </section>

          {/* RECORDATÓRIO */}
          <section className={activeSection === 4 ? 'block' : 'hidden'}>
            <div className="mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-1 flex items-center gap-2"><span className="w-1.5 h-6 bg-orange-500 rounded-full"></span>Recordatório 24h</h2>
              <p className="text-neutral-500 text-sm">O que você comeu nas últimas 24 horas</p>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 mb-5">
              <p className="text-sm text-orange-200">
                Descreva cada refeição com horário, local e quantidade aproximada.
              </p>
            </div>

            <div className="space-y-4 bg-white/[0.02] border border-white/10 rounded-2xl p-5 md:p-6">
              <div>
                <label className={labelClass}>1ª Refeição</label>
                <textarea name="refeicao_1" rows={2} className={inputClass} placeholder="07:00 - Casa - 2 ovos, 1 pão..." />
              </div>
              <div>
                <label className={labelClass}>2ª Refeição</label>
                <textarea name="refeicao_2" rows={2} className={inputClass} placeholder="10:00 - Trabalho - 1 fruta..." />
              </div>
              <div>
                <label className={labelClass}>3ª Refeição</label>
                <textarea name="refeicao_3" rows={2} className={inputClass} placeholder="12:30 - Restaurante - Arroz, feijão..." />
              </div>
              <div>
                <label className={labelClass}>4ª Refeição</label>
                <textarea name="refeicao_4" rows={2} className={inputClass} placeholder="16:00 - Casa - Lanche..." />
              </div>
              <div>
                <label className={labelClass}>5ª Refeição</label>
                <textarea name="refeicao_5" rows={2} className={inputClass} placeholder="20:00 - Casa - Jantar..." />
              </div>
              <div>
                <label className={labelClass}>6ª Refeição (se houver)</label>
                <textarea name="refeicao_6" rows={2} className={inputClass} placeholder="Opcional..." />
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
              onClick={() => {
                setActiveSection(Math.max(0, activeSection - 1));
                setShowValidationError(false);
              }}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl border border-white/20 text-neutral-300 hover:bg-white/5 transition-all ${
                activeSection === 0 ? 'opacity-0 pointer-events-none' : ''
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Voltar
            </button>

            {activeSection < 4 ? (
              <button
                type="button"
                onClick={handleNextSection}
                className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-400 text-black font-semibold rounded-xl transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40"
              >
                Próximo
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-3.5 bg-orange-500 hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold rounded-xl transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            )}
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400">
              {error}
            </div>
          )}
        </form>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 mt-12">
        <div className="max-w-2xl mx-auto px-5 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-orange-500/50" />
            <Zap className="w-4 h-4 text-orange-500/70" />
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-orange-500/50" />
          </div>
          <p className="text-neutral-400 text-sm font-medium">
            SUPERSAPIENS
          </p>
          <p className="text-neutral-600 text-xs mt-1">
            Performance & Neurociência
          </p>
        </div>
      </footer>
    </main>
  );
};
