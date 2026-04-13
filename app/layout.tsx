import type { Metadata } from 'next';
import { Syne, Noto_Sans_JP, Bebas_Neue } from 'next/font/google';
import './globals.css';
import CustomCursor from '@/components/CustomCursor';
import Nav from '@/components/Nav';
import ScrollReveal from '@/components/ScrollReveal';
import PageTopButton from '@/components/PageTopButton';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-syne',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'], // Japanese support is included
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto-sans-jp',
});

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas-neue',
});

export const metadata: Metadata = {
  title: '株式会社◯ | LEI, inc. — AI consulting & Business Optimization',
  description: 'AI consulting & Business Optimization',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${syne.variable} ${notoSansJP.variable} ${bebasNeue.variable}`}>
      <body className="antialiased">
        <CustomCursor />
        <Nav />
        <main>{children}</main>
        <PageTopButton />
        <ScrollReveal />
      </body>
    </html>
  );
}
