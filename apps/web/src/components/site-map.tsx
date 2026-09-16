import { ADDRESS_LABEL, DGIS_MAPS_HREF, MAP_EMBED_SRC, YANDEX_MAPS_HREF } from '@/lib/location';

export function SiteMap({ className }: { className?: string }) {
  return (
    <div className={`relative bg-black ${className ?? ''}`}>
      <iframe
        title={ADDRESS_LABEL}
        src={MAP_EMBED_SRC}
        className="h-full w-full border-0 grayscale-[20%]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-end gap-3 p-3">
        <a
          href={YANDEX_MAPS_HREF}
          target="_blank"
          rel="noreferrer"
          className="pointer-events-auto border border-white/70 bg-black/70 px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-white hover:text-[#1a1a1a]"
        >
          Яндекс
        </a>
        <a
          href={DGIS_MAPS_HREF}
          target="_blank"
          rel="noreferrer"
          className="pointer-events-auto border border-white/70 bg-black/70 px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-white hover:text-[#1a1a1a]"
        >
          2ГИС
        </a>
      </div>
    </div>
  );
}
