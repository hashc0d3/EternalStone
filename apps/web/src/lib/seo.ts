import type { Metadata } from 'next';
import { ADDRESS_LABEL, PHONE_LABEL } from '@/lib/location';

export const SITE_NAME = 'Вечный камень';
export const SITE_DESCRIPTION =
  'Памятники из гранита и мрамора, мемориальные комплексы, плитка и облицовка в Омске и по России. Изготовление, установка, доставка.';

export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');
}

export function absUrl(path = '/') {
  if (path.startsWith('http')) return path;
  return `${siteUrl()}${path.startsWith('/') ? path : `/${path}`}`;
}

export function pageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: {
  title: string;
  description?: string;
  path: string;
  noIndex?: boolean;
}): Metadata {
  const url = absUrl(path);
  const desc = description ?? SITE_DESCRIPTION;
  return {
    title,
    description: desc,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description: desc,
      url,
      siteName: SITE_NAME,
      locale: 'ru_RU',
      type: 'website',
      images: [{ url: absUrl('/images/slider/marble.png'), alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description: desc,
    },
  };
}

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: siteUrl(),
    telephone: PHONE_LABEL,
    image: absUrl('/images/brand/logo.png'),
    address: {
      '@type': 'PostalAddress',
      streetAddress: ADDRESS_LABEL.replace('Омск, ', ''),
      addressLocality: 'Омск',
      addressCountry: 'RU',
    },
    areaServed: ['Омск', 'Россия'],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: siteUrl(),
    inLanguage: 'ru-RU',
  };
}
