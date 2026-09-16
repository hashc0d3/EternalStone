import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Вечный камень',
  description: 'Памятники, гранит и изделия из камня в Омске и по России',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
