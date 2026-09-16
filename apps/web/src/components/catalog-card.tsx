import Image from 'next/image';
import Link from 'next/link';

export function CatalogCard({
  href,
  onClick,
  image,
  title,
  subtitle,
  featured = false,
}: {
  href?: string;
  onClick?: () => void;
  image?: string;
  title: string;
  subtitle?: string;
  featured?: boolean;
}) {
  const content = (
    <>
      {image ? (
        <>
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover brightness-[0.82] transition-[filter] duration-500 group-hover:brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-black/10 transition-opacity duration-500 group-hover:opacity-40" />
        </>
      ) : (
        <div className="absolute inset-0 bg-[#141414] transition-colors duration-300 group-hover:bg-[#1f1f1f]" />
      )}
      <div className="relative z-10 flex h-full flex-col justify-start p-5 sm:p-6 lg:p-8">
        <h3
          className={`max-w-[90%] font-medium uppercase leading-snug tracking-wide text-white ${
            featured ? 'text-xl sm:text-2xl lg:text-[28px]' : 'text-lg sm:text-[22px]'
          }`}
        >
          {title}
        </h3>
        {subtitle ? (
          <p className="mt-2 max-w-[28rem] text-sm leading-snug text-white/75 sm:text-[17px]">{subtitle}</p>
        ) : null}
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 left-6 z-10 h-2.5 w-2.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/25 transition-transform duration-500 ease-out [@media(hover:hover)]:group-hover:scale-[28] motion-reduce:transition-none"
      />
      <div className="absolute bottom-5 left-5 z-20 flex items-center gap-2.5">
        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-white" />
        <span className="text-sm text-white opacity-0 transition-opacity duration-300 [@media(hover:hover)]:group-hover:opacity-100 motion-reduce:transition-none">
          Подробнее
        </span>
      </div>
    </>
  );

  const className = 'group relative block min-h-[220px] overflow-hidden lg:min-h-0 lg:h-full';

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={`${className} w-full p-0 text-left`} onClick={onClick}>
      {content}
    </button>
  );
}
