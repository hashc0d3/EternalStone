import Image from 'next/image';
import Link from 'next/link';

const EXPERIENCE = [
  {
    num: '01',
    lead: 'Большой опыт в добыче и переработке различных гранитов и мраморов.',
    rest: 'Но и постоянно совершенствуем технологии обработки гранита.',
  },
  {
    num: '02',
    lead: 'Конкурентоспособная продукция по лучшей стоимости и качеству.',
    rest: 'Это реализуемо, потому что мы производим, оформляем и устанавливаем памятники без помощи посредников.',
  },
  {
    num: '03',
    lead: 'Специалисты с большим стажем и опытом.',
    rest: 'Изготовление гранитного памятника — продолжительный и трудоёмкий процесс. От создателя требуется сила, вкус и умение правильно обращаться с камнем.',
  },
] as const;

const STEPS = [
  'Поможем сформулировать Вам идею',
  'Составим первый эскиз',
  'Составим подробное тех. задание',
  'Подберем подходящий материал',
  'Согласуем сроки изготовления',
  'Убережем Вас от лишних затрат',
] as const;

const PROCESS = [
  {
    num: '01',
    title: 'Сырьё и контроль',
    text: 'Тщательно отбираем сырьё и контролируем качество, чтобы блоки, повреждённые при добыче, сразу отбраковывались. Перевозка — специальным транспортом и под постоянным контролем.',
    image: '/images/slider/marble.png',
  },
  {
    num: '02',
    title: 'Гравировка',
    text: 'Портреты и надписи — компьютерной гравировкой для сложных и точных изображений либо пескоструем для символов, надписей и простых рисунков.',
    image: '/images/works/orig-1.png',
  },
  {
    num: '03',
    title: 'Поставщики',
    text: 'Напрямую работаем с лучшими поставщиками камня без дефектов. Изделия из такого материала проверены временем.',
    image: '/images/catalog/1.png',
  },
  {
    num: '04',
    title: 'Обработка',
    text: 'Распил, шлифование, полировка и придание конечной формы. Каждый этап доводит камень до зеркала и точной геометрии.',
    image: '/images/slider/stairs.png',
  },
] as const;

export function AboutContent() {
  return (
    <div className="bg-[#1a1a1a] text-white">
      <section className="relative overflow-hidden" aria-labelledby="about-title">
        <div className="grid min-h-[calc(100dvh-var(--header-height)-52px)] lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative flex flex-col justify-end px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <p className="pointer-events-none absolute right-4 top-4 select-none text-[22vw] font-light leading-none text-white/[0.06] sm:right-8 sm:top-2 sm:text-[9rem] lg:text-[11rem]">
              1994
            </p>
            <p className="relative text-[11px] uppercase tracking-[0.28em] text-white/55">О компании</p>
            <p className="relative mt-6 inline-flex w-fit items-center gap-3 border border-white/70 bg-black/40 px-4 py-2 text-[11px] uppercase tracking-[0.2em]">
              <span className="mark-sq" aria-hidden="true" />
              Работаем с 1994 года
            </p>
            <h1
              id="about-title"
              className="relative mt-8 max-w-[16ch] text-[32px] font-medium uppercase leading-[1.05] tracking-[0.06em] sm:text-5xl lg:text-[58px] lg:tracking-[0.07em]"
            >
              Созидать <span className="text-white/40">искусство</span> из природной мощи
            </h1>
            <p className="relative mt-6 max-w-lg text-sm leading-relaxed text-white/60 sm:text-[15px]">
              Наша миссия — делать из камня вещи, которые переживают поколения: памятники, комплексы и облицовку без
              посредников.
            </p>
            <div className="relative mt-10 flex flex-wrap gap-3">
              <Link href="/catalog" className="btn-primary px-6">
                К каталогу
              </Link>
              <Link href="/contacts" className="btn-ghost px-6">
                Контакты
              </Link>
            </div>
          </div>
          <div className="relative min-h-[280px] lg:min-h-full">
            <Image
              src="/images/slider/complex.png"
              alt="Мемориальный комплекс"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:to-black/25" />
            <CornerFrame />
          </div>
        </div>
      </section>

      <section aria-label="Цифры" className="grid gap-px bg-black sm:grid-cols-3">
        {[
          { value: '1994', label: 'Год основания' },
          { value: 'Без посредников', label: 'Производство и установка' },
          { value: 'Омск', label: 'И вся Россия' },
        ].map((item) => (
          <div key={item.label} className="bg-[#111] px-5 py-7 sm:px-8">
            <p className="text-xl uppercase tracking-[0.08em] sm:text-2xl">{item.value}</p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-white/40">{item.label}</p>
          </div>
        ))}
      </section>

      <section aria-label="Опыт компании">
        <div className="grid gap-px bg-black lg:grid-cols-[1.35fr_1fr_1fr]">
          {EXPERIENCE.map((item, index) => (
            <article
              key={item.num}
              className={`group relative flex min-h-[320px] flex-col justify-between overflow-hidden px-5 py-8 sm:px-8 lg:min-h-[420px] lg:py-10 ${
                index === 0 ? 'bg-white text-[#1a1a1a]' : 'bg-[#1a1a1a] text-white'
              }`}
            >
              <p
                className={`text-[4.5rem] font-light leading-none tracking-tight ${
                  index === 0 ? 'text-black/10' : 'text-white/10'
                }`}
              >
                {item.num}
              </p>
              <div className="relative">
                <p className={`text-[11px] uppercase tracking-[0.22em] ${index === 0 ? 'text-black/45' : 'text-white/40'}`}>
                  {item.num}
                </p>
                <p className="mt-4 text-xl uppercase leading-snug tracking-[0.04em]">{item.lead}</p>
                <p className={`mt-4 text-sm leading-relaxed ${index === 0 ? 'text-black/60' : 'text-white/55'}`}>
                  {item.rest}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="about-contractor-title">
        <div className="grid gap-px bg-black lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[280px] overflow-hidden bg-[#111]">
            <Image src="/images/slider/marble.png" alt="" fill sizes="50vw" className="object-cover brightness-[0.45]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
            <div className="relative z-10 flex h-full min-h-[280px] flex-col justify-end px-5 py-10 sm:px-8 lg:px-10">
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/50">Подрядчик</p>
              <h2
                id="about-contractor-title"
                className="mt-4 max-w-[16ch] text-[28px] font-light uppercase leading-[1.1] tracking-[0.08em] sm:text-4xl"
              >
                <span className="text-white">Верный подрядчик</span>{' '}
                <span className="text-white/40">во всём, что касается камня</span>
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">
                Мы поддерживаем тёплые отношения с каждым нашим клиентом.
              </p>
            </div>
          </div>
          <ol>
            {STEPS.map((step, index) => (
              <li key={step} className="border-b border-white/10 last:border-b-0">
                <div className="group flex min-h-[72px] items-center gap-5 bg-[#1a1a1a] px-5 py-5 transition-colors duration-300 hover:bg-white hover:text-[#1a1a1a] sm:px-8">
                  <span className="w-8 shrink-0 text-[11px] uppercase tracking-[0.18em] text-white/35 group-hover:text-[#1a1a1a]/40">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm uppercase tracking-[0.1em] sm:text-[15px]">{step}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="about-tech-title">
        <div className="flex flex-col gap-6 border-y border-white/10 px-4 py-12 sm:px-6 sm:py-16 lg:flex-row lg:items-end lg:justify-between lg:px-8">
          <h2
            id="about-tech-title"
            className="max-w-[18ch] text-[28px] font-light uppercase leading-tight tracking-[0.1em] sm:text-4xl lg:text-5xl"
          >
            <span className="text-white">Технология</span> <span className="text-white/35">производства</span>
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-white/55 sm:text-[15px]">
            Изготовление памятника — путь от идеи и эскиза до установки на кладбище. Компания «Вечный камень» ведёт его
            целиком.
          </p>
        </div>
        <ol>
          {PROCESS.map((item, index) => (
            <li
              key={item.num}
              className={`grid gap-px bg-black lg:grid-cols-2 ${index % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''}`}
            >
              <div className="group relative min-h-[240px] overflow-hidden lg:min-h-[380px]">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover brightness-[0.78] transition-[filter] duration-500 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute bottom-5 left-5 border border-white/70 bg-black/55 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em]">
                  {item.num}
                </span>
              </div>
              <div className="flex flex-col justify-center bg-[#1a1a1a] px-5 py-10 sm:px-10 lg:px-14">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">{item.num}</p>
                <h3 className="mt-4 text-2xl uppercase tracking-[0.08em] sm:text-3xl">{item.title}</h3>
                <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/65 sm:text-[15px]">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

function CornerFrame() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="pointer-events-none absolute inset-4 z-[1] h-[calc(100%-2rem)] w-[calc(100%-2rem)]"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path d="M8 22V8h14" stroke="white" strokeOpacity="0.85" strokeWidth="1.4" />
      <path d="M78 8h14v14" stroke="white" strokeOpacity="0.85" strokeWidth="1.4" />
      <path d="M92 78v14H78" stroke="white" strokeOpacity="0.85" strokeWidth="1.4" />
      <path d="M22 92H8V78" stroke="white" strokeOpacity="0.85" strokeWidth="1.4" />
    </svg>
  );
}
