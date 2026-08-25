import type { Metadata } from 'next';
import { DM_Sans, Fraunces } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({ variable: '--font-sans', subsets: ['latin'] });
const fraunces = Fraunces({ variable: '--font-display', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://rota-certa-frete.tiagosleite2015.chatgpt.site'),
  title: 'Rota Certa | Calculadora de Frete',
  description: 'Calcule o valor do seu frete por peso, região e tipo de entrega.',
  openGraph: {
    title: 'Rota Certa | Calculadora de Frete',
    description: 'Calcule seu frete sem complicação.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Rota Certa — Calcule seu frete sem complicação' }],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rota Certa | Calculadora de Frete',
    description: 'Calcule seu frete sem complicação.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={`${dmSans.variable} ${fraunces.variable}`}>{children}</body></html>;
}
