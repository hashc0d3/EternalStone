'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { LeadModal } from '@/components/lead-modal';

const SLIDES = [
  { src: '/images/slider/marble.png', alt: 'Мрамор' },
  { src: '/images/slider/complex.png', alt: 'Мемориальный комплекс' },
  { src: '/images/slider/stairs.png', alt: 'Гранитная лестница' },
] as const;

const QUICK_LINKS = [
  { href: '/catalog', label: 'Памятники' },
  { href: '/catalog?material=гранит', label: 'Гранит' },
  { href: '/catalog?material=мрамор', label: 'Мрамор' },
  { href: '/services', label: 'Работы с камнем' },
] as const;

const COMPLEX_PARTS = [
  { href: '/catalog?type=комплексы&part=stela', label: 'Стела' },
  { href: '/catalog?type=комплексы&part=fence', label: 'Ограда' },
  { href: '/catalog?type=комплексы&part=bed', label: 'Цветник' },
  { href: '/catalog?type=комплексы&part=bench', label: 'Скамейка' },
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
                quality={95}
                sizes="100vw"
                className="object-cover"
                draggable={false}
              />
              <div
                className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,0.88)_0%,rgba(8,8,8,0.72)_42%,rgba(8,8,8,0.38)_72%,rgba(8,8,8,0.22)_100%)]"
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-black/25 lg:bg-transparent" aria-hidden="true" />
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
            className="btn-icon pointer-events-auto group"
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
                className={`h-2 w-6 transition-colors duration-300 ${
                  slideIndex === index ? 'bg-white' : 'bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Слайд ${slideIndex + 1}`}
                aria-current={slideIndex === index}
                onClick={() => goTo(slideIndex)}
              />
            ))}
          </div>

          <button
            type="button"
            className="btn-icon pointer-events-auto group"
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
        className="btn-primary w-full max-w-xs px-5 sm:w-auto"
        onClick={onCallback}
      >
        Обратный звонок
      </button>
      <Link
        href="/catalog"
        className="btn-ghost w-full max-w-xs px-5 tracking-[0.02em] sm:w-auto"
      >
        К каталогу
      </Link>
    </div>
  );
}

function SlideLead({ eyebrow, title }: { eyebrow: React.ReactNode; title: string }) {
  return (
    <>
      <p className="text-[11px] uppercase leading-relaxed tracking-[0.22em] text-white/85 sm:text-xs lg:tracking-[0.28em]">
        {eyebrow}
      </p>
      <span className="mx-auto mt-5 block h-px w-12 bg-white/70 lg:mx-0 lg:w-16" aria-hidden="true" />
      <h2 className="mx-auto mt-6 max-w-[16ch] text-[28px] font-medium uppercase leading-[1.08] tracking-[0.06em] text-white sm:text-5xl lg:mx-0 lg:max-w-[14ch] lg:text-[58px] lg:tracking-[0.08em] xl:text-[68px]">
        {title}
      </h2>
    </>
  );
}

function FirstSlideContent({ onCallback }: { onCallback: () => void }) {
  return (
    <SlideShell
      aside={<QuickLinksNav items={QUICK_LINKS} className="h-80 w-80" />}
      mobileAside={<MobileQuickLinks items={QUICK_LINKS} />}
    >
      <SlideLead eyebrow="Омск и вся Россия" title="Памятники и изделия из камня" />
      <SlideActions onCallback={onCallback} />
    </SlideShell>
  );
}

function SecondSlideContent({ onCallback }: { onCallback: () => void }) {
  return (
    <SlideShell
      aside={<QuickLinksNav items={COMPLEX_PARTS} className="h-80 w-80" />}
      mobileAside={<MobileQuickLinks items={COMPLEX_PARTS} />}
    >
      <p className="text-xs uppercase tracking-[0.22em] text-white/85">Скидка ветеранам и героям России</p>
      <h2 className="mx-auto mt-5 max-w-[16ch] text-[26px] font-medium uppercase leading-[1.12] tracking-wide text-white sm:text-5xl lg:mx-0 lg:text-[56px]">
        Комплексные могилы
      </h2>
      <SlideActions onCallback={onCallback} />
    </SlideShell>
  );
}

function ThirdSlideContent({ onCallback }: { onCallback: () => void }) {
  return (
    <SlideShell
      aside={<QuickLinksNav items={GRANITE_LINKS} className="h-80 w-80" />}
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
    <nav aria-label="Быстрый переход" className="flex w-full flex-col gap-2">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="relative flex min-h-12 items-center justify-center border border-white/70 bg-black/60 px-10 text-center text-[15px] text-white transition-colors duration-300 hover:bg-white hover:text-[#1a1a1a]"
        >
          {item.label}
          <svg className="absolute right-4 h-4 w-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
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
      className={`relative flex flex-col items-center justify-center ${className ?? ''}`}
    >
      <SpinningFrame />
      <div className="relative z-[1] flex w-[11.5rem] flex-col items-stretch gap-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="inline-flex min-h-10 items-center justify-center border border-white/75 bg-black/55 px-3 text-center text-[12px] uppercase leading-none tracking-[0.12em] text-white transition-colors duration-300 hover:bg-white hover:text-[#1a1a1a] lg:text-[13px]"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

function SpinningFrame() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="pointer-events-none absolute inset-[-10%] z-[1] h-[120%] w-[120%] animate-[spin_32s_linear_infinite] motion-reduce:animate-none"
      fill="none"
      aria-hidden="true"
    >
      <rect x="7" y="7" width="86" height="86" stroke="white" strokeOpacity="0.55" strokeWidth="1" />
      <path d="M7 20V7h13" stroke="white" strokeOpacity="0.85" strokeWidth="1.6" />
      <path d="M80 7h13v13" stroke="white" strokeOpacity="0.85" strokeWidth="1.6" />
      <path d="M93 80v13H80" stroke="white" strokeOpacity="0.85" strokeWidth="1.6" />
      <path d="M20 93H7V80" stroke="white" strokeOpacity="0.85" strokeWidth="1.6" />
    </svg>
  );
}
