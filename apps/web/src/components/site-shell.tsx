import { Breadcrumbs, type Crumb } from '@/components/breadcrumbs';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export function SiteShell({
  children,
  hero,
  afterHero,
  crumbs,
}: {
  children?: React.ReactNode;
  hero?: React.ReactNode;
  afterHero?: React.ReactNode;
  crumbs?: Crumb[];
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <SiteHeader />
      {hero}
      {crumbs?.length ? <Breadcrumbs items={crumbs} /> : null}
      {afterHero}
      {children ? <main className="mx-auto w-full max-w-6xl px-6 py-10">{children}</main> : null}
      <SiteFooter />
    </div>
  );
}
