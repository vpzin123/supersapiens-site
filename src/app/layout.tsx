import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VP | Nutrição Baseada em Evidências',
  description: 'Consultoria nutricional personalizada fundamentada em ciência. Protocolos individualizados para otimização metabólica, composição corporal e performance.',
  keywords: 'nutricionista, nutrição esportiva, emagrecimento, hipertrofia, metabolismo, consultoria online',
  openGraph: {
    title: 'VP | Nutrição Baseada em Evidências',
    description: 'Protocolos nutricionais personalizados fundamentados em ciência.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased noise">
        {children}
      </body>
    </html>
  );
}
