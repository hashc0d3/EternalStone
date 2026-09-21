import type { Metadata } from 'next';
import { ErrorScreen } from '@/components/error-screen';

export const metadata: Metadata = {
  title: 'Доступ запрещён',
  robots: { index: false, follow: false },
};

export default function Forbidden() {
  return (
    <ErrorScreen
      code="403"
      title="Доступ запрещён"
      text="У вас нет прав на эту страницу. Если вы администратор — войдите в админку."
    />
  );
}
