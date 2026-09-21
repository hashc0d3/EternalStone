import type { Metadata } from 'next';
import { SITE_DESCRIPTION, SITE_NAME, absUrl, siteUrl, websiteJsonLd } from '@/lib/seo';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${SITE_NAME} — памятники из гранита и мрамора в Омске`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'памятники Омск',
    'гранит',
    'мрамор',
    'мемориальные комплексы',
    'изделия из камня',
    'облицовка могил',
    'Вечный камень',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  robots: { index: true, follow: true },
  alternates: { canonical: absUrl('/') },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: SITE_NAME,
    title: `${SITE_NAME} — памятники из гранита и мрамора в Омске`,
    description: SITE_DESCRIPTION,
    url: absUrl('/'),
    images: [{ url: absUrl('/images/slider/marble.png'), alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — памятники из гранита и мрамора в Омске`,
    description: SITE_DESCRIPTION,
  },
  icons: {
    icon: '/images/brand/logo.png',
    apple: '/images/brand/logo.png',
  },
};

export const viewport = {
  themeColor: '#1a1a1a',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="min-h-screen antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }} />
        {children}
      </body>
    </html>
  );
}
