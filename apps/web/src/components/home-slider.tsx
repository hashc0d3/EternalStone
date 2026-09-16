'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { LeadModal } from '@/components/lead-modal';

const SLIDES = [
  { src: '/images/slider/1.png', alt: 'Тёмный камень' },
  { src: '/images/slider/1.png', alt: 'Тёмный камень' },
  { src: '/images/slider/2.png', alt: 'Гранитная лестница' },
] as const;

const QUICK_LINKS = [
  { href: '/catalog', label: 'Памятники' },
  { href: '/catalog?material=гранит', label: 'Гранит' },
  { href: '/catalog?material=мрамор', label: 'Мрамор' },
  { href: '/services', label: 'Работы с камнем' },
] as const;

const GRANITE_LINKS = [
  { href: '/catalog?material=дымовский', label: 'Дымовский' },
  { href: '/catalog?material=южно-султаевский', label: 'Южно-Султаевский' },
  { href: '/catalog?material=мансуровский', label: 'Мансуровский' },
  { href: '/catalog?material=гранит', label: 'Другие граниты' },
] as const;

export function HomeSlider() {
  const [index, setIndex] = useState(0);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const startX = useRef<number | null>(null);

  const goTo = useCallback((next: number) => {
    setIndex((next + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (callbackOpen) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length);
    }, 10_000);

    return () => window.clearInterval(timer);
  }, [callbackOpen, index]);

  return (
    <>
      <section
        className="relative h-[calc(100dvh-var(--header-height))] min-h-[560px] w-full overflow-hidden bg-black select-none"
        aria-label="Слайдер на главной"
        aria-roledescription="карусель"
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
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {SLIDES.map((slide, slideIndex) => (
            <div key={`${slide.src}-${slideIndex}`} className="relative h-full w-full shrink-0">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={slideIndex === 0}
                sizes="100vw"
                className="object-cover"
                draggable={false}
              />
              {slideIndex === 0 ? <FirstSlideContent onCallback={() => setCallbackOpen(true)} /> : null}
              {slideIndex === 1 ? <SecondSlideContent onCallback={() => setCallbackOpen(true)} /> : null}
              {slideIndex === 2 ? <ThirdSlideContent onCallback={() => setCallbackOpen(true)} /> : null}
            </div>
          ))}
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-center justify-between px-4 pb-5 sm:px-6 sm:pb-7"
          onPointerDown={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            className="pointer-events-auto group grid h-12 w-12 place-items-center rounded-full bg-black/40 p-0 text-white ring-1 ring-white/25 backdrop-blur-[2px] transition-all duration-300 ease-out hover:scale-110 hover:bg-white hover:text-[#1a1a1a] hover:ring-white hover:shadow-md sm:h-14 sm:w-14"
            aria-label="Предыдущий слайд"
            onClick={() => goTo(index - 1)}
          >
            <svg
              className="h-5 w-5 transition-transform duration-300 ease-out group-hover:-translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M14.5 6.5 9 12l5.5 5.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
            </svg>
          </button>

          <div className="pointer-events-auto flex items-center gap-2.5">
            {SLIDES.map((slide, slideIndex) => (
              <button
                key={`${slide.src}-dot-${slideIndex}`}
                type="button"
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  slideIndex === index ? 'bg-white' : 'bg-white/45 hover:bg-white/70'
                }`}
                aria-label={`Слайд ${slideIndex + 1}`}
                aria-current={slideIndex === index}
                onClick={() => goTo(slideIndex)}
              />
            ))}
          </div>

          <button
            type="button"
            className="pointer-events-auto group grid h-12 w-12 place-items-center rounded-full bg-black/40 p-0 text-white ring-1 ring-white/25 backdrop-blur-[2px] transition-all duration-300 ease-out hover:scale-110 hover:bg-white hover:text-[#1a1a1a] hover:ring-white hover:shadow-md sm:h-14 sm:w-14"
            aria-label="Следующий слайд"
            onClick={() => goTo(index + 1)}
          >
            <svg
              className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M9.5 6.5 15 12l-5.5 5.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
            </svg>
          </button>
        </div>
      </section>

      {callbackOpen ? (
        <LeadModal
          title="Обратный звонок"
          source="callback"
          onClose={() => setCallbackOpen(false)}
        />
      ) : null}
    </>
  );
}

function SlideShell({
  children,
  aside,
  mobileAside,
}: {
  children: React.ReactNode;
  aside: React.ReactNode;
  mobileAside?: React.ReactNode;
}) {
  return (
    <div
      className="absolute inset-0 z-[1] flex flex-col justify-center overflow-y-auto px-5 pb-24 pt-8 text-white sm:px-10 lg:px-12"
      onPointerDown={(event) => {
        const target = event.target as HTMLElement;
        if (target.closest('a, button')) event.stopPropagation();
      }}
    >
      <div className="mx-auto flex w-full max-w-5xl items-center justify-center gap-12 xl:max-w-6xl xl:gap-20">
        <div className="max-w-3xl text-center lg:text-left">{children}</div>
        <div className="hidden shrink-0 flex-col items-center lg:flex">{aside}</div>
      </div>
      {mobileAside ? (
        <div className="mx-auto mt-8 flex w-full max-w-md flex-col items-center lg:hidden">{mobileAside}</div>
      ) : null}
    </div>
  );
}

function SlideActions({ onCallback }: { onCallback: () => void }) {
  return (
    <div className="mt-7 flex w-full flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start lg:items-start">
      <button
        type="button"
        className="inline-flex min-h-12 w-full max-w-xs items-center justify-center bg-white px-5 text-sm font-medium text-[#1a1a1a] transition-colors duration-300 hover:bg-white/80 sm:w-auto"
        onClick={onCallback}
      >
        Обратный звонок
      </button>
      <Link
        href="/catalog"
        className="inline-flex min-h-12 w-full max-w-xs items-center justify-center border border-white/30 px-5 text-sm text-white/90 transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#1a1a1a] sm:w-auto"
      >
        К каталогу
      </Link>
    </div>
  );
}

function SlideLead({ eyebrow, title }: { eyebrow: React.ReactNode; title: string }) {
  return (
    <>
      <p className="text-[11px] uppercase leading-relaxed tracking-[0.22em] text-white/55 sm:text-xs lg:tracking-[0.28em]">
        {eyebrow}
      </p>
      <span className="mx-auto mt-5 block h-px w-12 bg-white/30 lg:mx-0 lg:w-16" aria-hidden="true" />
      <h2 className="mx-auto mt-6 max-w-[16ch] text-[28px] font-light uppercase leading-[1.08] tracking-[0.06em] text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.45)] sm:text-5xl lg:mx-0 lg:max-w-[14ch] lg:text-[58px] lg:tracking-[0.08em] xl:text-[68px]">
        {title}
      </h2>
    </>
  );
}

function FirstSlideContent({ onCallback }: { onCallback: () => void }) {
  return (
    <SlideShell
      aside={<QuickLinksNav items={QUICK_LINKS} className="h-72 w-72" />}
      mobileAside={<MobileQuickLinks items={QUICK_LINKS} />}
    >
      <SlideLead eyebrow="Омск и вся Россия" title="Памятники и изделия из камня" />
      <SlideActions onCallback={onCallback} />
    </SlideShell>
  );
}

function SecondSlideContent({ onCallback }: { onCallback: () => void }) {
  return (
    <SlideShell aside={<MemorialCircle className="h-72 w-72" />}>
      <p className="text-xs uppercase tracking-[0.22em] text-white/70">Скидка ветеранам и героям России</p>
      <h2 className="mx-auto mt-5 max-w-[16ch] text-[26px] font-semibold uppercase leading-[1.12] tracking-wide sm:text-5xl lg:mx-0 lg:text-[56px]">
        Комплексные могилы
      </h2>
      <div className="my-6 flex w-full justify-center lg:hidden">
        <MemorialCircle className="h-44 w-44 shrink-0" />
      </div>
      <SlideActions onCallback={onCallback} />
    </SlideShell>
  );
}

function ThirdSlideContent({ onCallback }: { onCallback: () => void }) {
  return (
    <SlideShell
      aside={<QuickLinksNav items={GRANITE_LINKS} className="h-72 w-72" />}
      mobileAside={<MobileQuickLinks items={GRANITE_LINKS} />}
    >
      <SlideLead eyebrow="Омск и вся Россия" title="Лестницы из гранита" />
      <SlideActions onCallback={onCallback} />
    </SlideShell>
  );
}

function MobileQuickLinks({
  items,
}: {
  items: readonly { href: string; label: string }[];
}) {
  return (
    <nav aria-label="Быстрый переход" className="w-full overflow-hidden rounded-2xl bg-white/10">
      {items.map((item, itemIndex) => (
        <Link
          key={item.href}
          href={item.href}
          className={`relative flex min-h-12 items-center justify-center px-10 text-center text-[15px] text-white/90 active:bg-white/10 ${
            itemIndex > 0 ? 'border-t border-white/10' : ''
          }`}
        >
          {item.label}
          <svg className="absolute right-4 h-4 w-4 text-white/45" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
          </svg>
        </Link>
      ))}
    </nav>
  );
}

function QuickLinksNav({
  items,
  className,
}: {
  items: readonly { href: string; label: string }[];
  className?: string;
}) {
  return (
    <nav
      aria-label="Быстрый переход"
      className={`relative flex flex-col items-center justify-center rounded-full bg-white/[0.06] ${className ?? ''}`}
    >
      <SpinningRing />
      <div className="relative z-[1] flex flex-col items-center gap-2 text-center sm:gap-2.5">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="max-w-[11rem] px-2 py-0.5 text-[13px] uppercase leading-snug tracking-[0.12em] text-white/80 transition-colors hover:text-white lg:text-[14px]"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

function MemorialCircle({ className }: { className?: string }) {
  return (
    <div className={`relative mx-auto ${className ?? ''}`}>
      <div className="absolute inset-0 rounded-full bg-white/10" />
      <SpinningRing />
      <Image
        src="/images/works/memo.png"
        alt="Комплексное оформление могилы"
        fill
        sizes="320px"
        className="z-[2] object-contain mix-blend-multiply drop-shadow-lg"
        draggable={false}
      />
    </div>
  );
}

function SpinningRing() {
  return (
    <img
      src="/images/brand/circle.svg"
      alt=""
      aria-hidden="true"
      className="pointer-events-none absolute inset-[-6%] z-[1] h-[112%] w-[112%] max-w-none animate-[spin_32s_linear_infinite] motion-reduce:animate-none"
    />
  );
}
