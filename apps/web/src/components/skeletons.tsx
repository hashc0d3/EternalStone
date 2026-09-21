export function HeaderSlot() {
  return <div className="h-[var(--header-height)] border-b border-white/10 bg-[#1a1a1a]" />;
}

export function HomeSkeleton() {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <HeaderSlot />
      <div className="skeleton h-[calc(100dvh-var(--header-height))] min-h-[560px]" />
      <div className="grid gap-px bg-black lg:grid-cols-2">
        <div className="skeleton min-h-[220px]" />
        <div className="skeleton min-h-[220px]" />
      </div>
      <div className="grid gap-px bg-black lg:grid-cols-3">
        <div className="skeleton min-h-[200px]" />
        <div className="skeleton min-h-[200px]" />
        <div className="skeleton min-h-[200px]" />
      </div>
    </div>
  );
}

export function CatalogSkeleton() {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <HeaderSlot />
      <div className="h-12 border-b border-white/10 px-4 py-6 sm:px-8">
        <div className="skeleton h-8 w-48" />
      </div>
      <div className="grid h-12 grid-cols-2 border-y border-white/10">
        <div className="skeleton" />
        <div className="bg-[#111]" />
      </div>
      <div className="grid lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r border-white/10 lg:block">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="skeleton mx-4 my-3 h-10" />
          ))}
        </div>
        <div className="grid gap-px bg-black sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="skeleton min-h-[360px]" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function GridSkeleton({ cells = 6 }: { cells?: number }) {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <HeaderSlot />
      <div className="px-4 py-8 sm:px-8">
        <div className="skeleton h-8 w-56" />
      </div>
      <div className="grid grid-cols-2 gap-px bg-black lg:grid-cols-3">
        {Array.from({ length: cells }, (_, index) => (
          <div key={index} className="skeleton min-h-[220px] lg:min-h-[280px]" />
        ))}
      </div>
    </div>
  );
}

export function TextPageSkeleton() {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <HeaderSlot />
      <div className="skeleton h-[360px] lg:h-[520px]" />
      <div className="grid gap-px bg-black lg:grid-cols-3">
        <div className="skeleton min-h-[240px]" />
        <div className="skeleton min-h-[240px]" />
        <div className="skeleton min-h-[240px]" />
      </div>
    </div>
  );
}
