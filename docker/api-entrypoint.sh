#!/bin/sh
set -e
cd /app/apps/api

pnpm exec prisma db push --skip-generate

if [ "${RUN_SEED:-true}" = "true" ]; then
  pnpm exec tsx prisma/seed.ts
fi

exec node dist/main.js
