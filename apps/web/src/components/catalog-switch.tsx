import type { CatalogView } from '@/lib/catalog';

export function CatalogSwitch({
  value,
  onChange,
}: {
  value: CatalogView;
  onChange: (view: CatalogView) => void;
}) {
  return (
    <div className="grid grid-cols-2 border-y border-white/10" role="tablist" aria-label="Тип каталога">
      <button
        type="button"
        role="tab"
        aria-selected={value === 'retail'}
        className={`min-h-12 text-sm uppercase tracking-[0.16em] transition-colors duration-300 ${
          value === 'retail' ? 'bg-white text-[#1a1a1a]' : 'bg-transparent text-white/50 hover:text-white'
        }`}
        onClick={() => onChange('retail')}
      >
        Розница
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={value === 'opt'}
        className={`min-h-12 text-sm uppercase tracking-[0.16em] transition-colors duration-300 ${
          value === 'opt' ? 'bg-white text-[#1a1a1a]' : 'bg-transparent text-white/50 hover:text-white'
        }`}
        onClick={() => onChange('opt')}
      >
        Опт
      </button>
    </div>
  );
}
