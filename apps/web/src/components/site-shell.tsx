import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export function SiteShell({
  children,
  hero,
  afterHero,
}: {
  children?: React.ReactNode;
  hero?: React.ReactNode;
  afterHero?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <SiteHeader />
      {hero}
      {afterHero}
      {children ? <main className="mx-auto w-full max-w-6xl px-6 py-10">{children}</main> : null}
      <SiteFooter />
    </div>
  );
}
