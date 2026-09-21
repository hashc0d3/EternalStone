import type { Metadata } from 'next';
import { AdminFrame } from '@/components/admin-frame';

export const metadata: Metadata = {
  title: 'Админка',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminFrame>{children}</AdminFrame>;
}
