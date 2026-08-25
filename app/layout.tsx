import type { Metadata } from 'next';
import { DM_Sans, Fraunces } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({ variable: '--font-sans', subsets: ['latin'] });
const fraunces = Fraunces({ variable: '--font-display', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rota Certa | Calculadora de Frete',
  description: 'Calcule o valor do seu frete por peso, região e tipo de entrega.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={`${dmSans.variable} ${fraunces.variable}`}>{children}</body></html>;
}
