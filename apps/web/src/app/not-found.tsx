import type { Metadata } from 'next';
import { ErrorScreen } from '@/components/error-screen';

export const metadata: Metadata = {
  title: 'Страница не найдена',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <ErrorScreen
      code="404"
      title="Страница не найдена"
      text="Такой страницы нет или её перенесли. Вернитесь на главную или откройте каталог."
    />
  );
}
