import { CheckCircle, MessageCircle, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Obrigado! | VP Nutrição',
  description: 'Seu questionário foi enviado com sucesso.',
};

export default function ObrigadoPage() {
  return (
    <main className="min-h-screen bg-dark flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-xl mx-auto px-6 text-center">
        {/* Logo */}
        <a href="/" className="inline-flex items-center gap-3 mb-12">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
            <span className="text-white font-bold text-xl font-display">VP</span>
          </div>
          <div className="text-left">
            <span className="text-white font-semibold">VP Nutrição</span>
            <span className="block text-gray-500 text-xs">Evidence-Based</span>
          </div>
        </a>

        {/* Success Card */}
        <div className="glass-strong rounded-3xl p-10 sm:p-12">
          {/* Icon */}
          <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Questionário enviado!
          </h1>

          {/* Message */}
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            Recebi suas informações e já vou começar a analisar seu caso.
            Entrarei em contato pelo <span className="text-white">WhatsApp</span> em breve
            para os próximos passos.
          </p>

          {/* Info Box */}
          <div className="bg-white/5 rounded-xl p-6 mb-8 text-left">
            <h3 className="text-white font-semibold mb-3">O que acontece agora?</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">1.</span>
                Vou analisar suas respostas com atenção
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">2.</span>
                Entrarei em contato pelo WhatsApp para confirmar o pagamento
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">3.</span>
                Em até 48h após a confirmação, você recebe seu protocolo
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <a
              href="https://wa.me/5512997015595?text=Olá! Acabei de enviar o questionário pelo site."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-modern w-full bg-primary hover:bg-primary-light text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-3"
            >
              <MessageCircle className="w-5 h-5" />
              Me avise pelo WhatsApp
            </a>

            <a
              href="/"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-white text-sm transition-colors"
            >
              Voltar para o site
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-gray-600 text-sm">
          Obrigado pela confiança!
        </p>
      </div>
    </main>
  );
}
