# Eternal Stone

Монорепозиторий: сайт на Next.js, API на NestJS, PostgreSQL.

## Запуск

Нужны Node 20+ и Docker Desktop.

```bash
pnpm install
pnpm db:up
pnpm db:push
pnpm db:seed
pnpm dev
```

- Сайт: http://localhost:3000
- API: http://localhost:4000/health
- Админ после сида: `admin@eternal-stone.local` / `changeme`

## Деплой в Docker

Один публичный порт (по умолчанию 80). Postgres, API и Next.js остаются внутри сети.

```bash
cp .env.example .env
# заполните SESSION_SECRET, TELEGRAM_*, ADMIN_* и при необходимости PORT
docker compose up -d --build
```

Сайт: `http://сервер:${PORT:-80}`  
API снаружи: `http://сервер:${PORT:-80}/backend`

Если 80-й порт занят:

```bash
PORT=8080 docker compose up -d --build
```

За HTTPS поставьте `COOKIE_SECURE=true` и `SITE_URL=https://ваш-домен`.

## Структура

```text
apps/web                 публичный сайт и /admin
apps/web/public/images   картинки сайта
  brand/                 логотип
  slider/                слайдер на главной
  catalog/               карточки каталога
  partners/              логотипы партнёров
  services/              фото услуг
  works/                 превью работ
  backgrounds/           фоны
apps/api                 NestJS, Prisma, загрузка фото
packages/shared          Zod-схемы и общие типы
```
