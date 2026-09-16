export function RequestCta({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="group flex min-h-[72px] w-full items-center justify-center gap-3 border-t border-white/10 bg-[#111] text-sm font-medium uppercase tracking-[0.22em] text-white transition-colors duration-300 ease-out hover:bg-white hover:text-[#1a1a1a]"
      onClick={onClick}
    >
      <span
        className="h-2 w-2 bg-white transition-colors duration-300 group-hover:bg-[#1a1a1a]"
        aria-hidden="true"
      />
      Оставить заявку
    </button>
  );
}
