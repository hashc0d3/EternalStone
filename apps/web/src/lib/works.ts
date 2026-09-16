import { apiGet, mediaUrl } from '@/lib/api';

export type WorkPhoto = {
  src: string;
  href: string;
  alt: string;
};

const FALLBACK: WorkPhoto[] = [
  { src: '/images/catalog/1.png', href: '/works', alt: '' },
  { src: '/images/catalog/2.png', href: '/works', alt: '' },
  { src: '/images/catalog/3.jpg', href: '/works', alt: '' },
  { src: '/images/catalog/4.png', href: '/works', alt: '' },
  { src: '/images/catalog/5.jpg', href: '/works', alt: '' },
  { src: '/images/slider/2.png', href: '/works', alt: '' },
];

type WorkList = {
  items: {
    slug: string;
    title: string;
    images: { card?: string; thumb?: string; full?: string }[];
  }[];
  total: number;
};

function toPhotos(items: WorkList['items']): WorkPhoto[] {
  return items.flatMap((work) => {
    const path = work.images[0]?.card ?? work.images[0]?.full ?? work.images[0]?.thumb;
    const src = mediaUrl(path);
    if (!src) return [];
    return [{ src, href: `/works/${work.slug}`, alt: work.title }];
  });
}

export async function getWorkPage(page = 1, limit = 9): Promise<{ items: WorkPhoto[]; total: number }> {
  try {
    const data = await apiGet<WorkList>(`/works?limit=${limit}&page=${page}`);
    const photos = toPhotos(data.items);

    if (photos.length > 0) {
      return { items: photos, total: data.total };
    }
  } catch {
    // API is optional while the gallery is filled in admin
  }

  if (page > 1) {
    return { items: [], total: FALLBACK.length };
  }

  return { items: FALLBACK.slice(0, limit), total: FALLBACK.length };
}

export async function getWorkPhotos(limit = 6): Promise<WorkPhoto[]> {
  const { items } = await getWorkPage(1, limit);
  return items;
}

