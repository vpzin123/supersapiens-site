import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Benefits } from '@/components/benefits';
import { Differentials } from '@/components/differentials';
import { Plan } from '@/components/plan';
import { Faq } from '@/components/faq';
import { Cta } from '@/components/cta';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-dark">
      <Header />
      <Hero />
      <Benefits />
      <Differentials />
      <Plan />
      <Faq />
      <Cta />
      <Footer />
    </main>
  );
}
