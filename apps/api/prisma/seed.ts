import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? 'admin@eternal-stone.local';
  const password = process.env.ADMIN_PASSWORD ?? 'changeme';
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash, role: 'ADMIN' },
    create: {
      email,
      passwordHash,
      name: 'Admin',
      role: 'ADMIN',
    },
  });

  const category = await prisma.category.upsert({
    where: { slug: 'pamyatniki' },
    update: {},
    create: {
      slug: 'pamyatniki',
      name: 'Памятники',
      sortOrder: 1,
    },
  });

  await prisma.product.upsert({
    where: { slug: 'primer-tovara' },
    update: {},
    create: {
      slug: 'primer-tovara',
      name: 'Пример товара',
      description: 'Черновик карточки. Завтра замените на реальный контент.',
      priceFrom: 45000,
      status: 'PUBLISHED',
      categoryId: category.id,
    },
  });

  await prisma.work.upsert({
    where: { slug: 'primer-raboty' },
    update: {},
    create: {
      slug: 'primer-raboty',
      title: 'Пример работы',
      description: 'Плейсхолдер для портфолио.',
      status: 'PUBLISHED',
    },
  });

  console.log(`Seeded admin ${email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
