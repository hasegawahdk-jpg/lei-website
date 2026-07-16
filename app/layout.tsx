import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '株式会社LEI | AIファーストの事業で、ビジネスを最適化する。',
  description: '最先端のAI活用により、ビジネスの最適化を。クラウドコスト削減 / AIコンサルティング / WEBマーケティング / IP創出。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
