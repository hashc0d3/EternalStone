'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { WorkPhoto } from '@/lib/works';

const ARROW_CLASS = 'btn-icon group';

export function WorksGallery({
  initialPhotos,
  total,
  pageSize,
}: {
  initialPhotos: WorkPhoto[];
  total: number;
  pageSize: number;
}) {
  const [photos, setPhotos] = useState(initialPhotos);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const hasMore = photos.length < total;

  async function loadMore() {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const response = await fetch(`/api/works?page=${page + 1}&limit=${pageSize}`);
      if (!response.ok) return;
      const next = (await response.json()) as { items: WorkPhoto[] };
      setPhotos((current) => [...current, ...next.items]);
      setPage((current) => current + 1);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <WorksGrid photos={photos} />
      {hasMore ? (
        <button
          type="button"
          className="btn-bar group disabled:opacity-60"
          disabled={loading}
          onClick={loadMore}
        >
          <span className="mark-sq" aria-hidden="true" />
          {loading ? 'Загрузка…' : 'Показать больше'}
        </button>
      ) : null}
    </>
  );
}

export function WorksGrid({ photos }: { photos: WorkPhoto[] }) {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-px bg-black lg:grid-cols-3">
        {photos.map((photo, photoIndex) => (
          <button
            key={`${photo.src}-${photoIndex}`}
            type="button"
            aria-label={photo.alt || 'Открыть фото'}
            className="group relative min-h-[220px] overflow-hidden p-0 lg:min-h-[280px]"
            onClick={() => setIndex(photoIndex)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover brightness-[0.82] transition-[filter] duration-500 group-hover:brightness-110"
            />
          </button>
        ))}
      </div>

      {index != null ? (
        <WorkLightbox
          photos={photos}
          index={index}
          onIndex={setIndex}
          onClose={() => setIndex(null)}
        />
      ) : null}
    </>
  );
}

function WorkLightbox({
  photos,
  index,
  onIndex,
  onClose,
}: {
  photos: WorkPhoto[];
  index: number;
  onIndex: (index: number) => void;
  onClose: () => void;
}) {
  const startX = useRef<number | null>(null);
  const photo = photos[index];
  const count = photos.length;

  const goTo = useCallback(
    (next: number) => {
      onIndex((next + count) % count);
    },
    [count, onIndex],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') goTo(index - 1);
      if (event.key === 'ArrowRight') goTo(index + 1);
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [goTo, index, onClose]);

  const dialog = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
      onClick={onClose}
      onPointerDown={(event) => {
        startX.current = event.clientX;
      }}
      onPointerUp={(event) => {
        if (startX.current == null) return;
        const delta = event.clientX - startX.current;
        startX.current = null;
        if (delta > 50) goTo(index - 1);
        if (delta < -50) goTo(index + 1);
      }}
    >
      <button
        type="button"
        aria-label="Закрыть"
        className="btn-icon absolute right-4 top-4 z-20 h-10 w-10 sm:h-10 sm:w-10"
        onClick={onClose}
      >
        <svg viewBox="0 0 24 24" className="block h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M7 7l10 10M17 7L7 17" />
        </svg>
      </button>

      <button
        type="button"
        className={`absolute left-3 z-20 ${ARROW_CLASS} sm:left-6`}
        aria-label="Предыдущее фото"
        onClick={(event) => {
          event.stopPropagation();
          goTo(index - 1);
        }}
      >
        <svg className="h-5 w-5 transition-transform duration-300 ease-out group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14.5 6.5 9 12l5.5 5.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
        </svg>
      </button>

      <div
        className="relative h-[min(78vh,820px)] w-[min(92vw,1100px)]"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="100vw"
          className="object-contain"
          priority
        />
      </div>

      <button
        type="button"
        className={`absolute right-3 z-20 ${ARROW_CLASS} sm:right-6`}
        aria-label="Следующее фото"
        onClick={(event) => {
          event.stopPropagation();
          goTo(index + 1);
        }}
      >
        <svg className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9.5 6.5 15 12l-5.5 5.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
        </svg>
      </button>

      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm tracking-[0.16em] text-white/70">
        {index + 1} / {count}
      </p>
    </div>
  );

  return createPortal(dialog, document.body);
}
