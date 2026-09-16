import { Injectable, NotFoundException } from '@nestjs/common';
import type { ProductCreateInput, ProductListQuery, ProductUpdateInput } from '@eternal-stone/shared';
import type { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: ProductListQuery, includeDrafts: boolean) {
    const where: Prisma.ProductWhereInput = {};

    if (!includeDrafts) {
      where.status = 'PUBLISHED';
    } else if (query.status) {
      where.status = query.status;
    }

    if (query.category) {
      where.category = { slug: query.category };
    }

    if (query.q) {
      where.OR = [
        { name: { contains: query.q, mode: 'insensitive' } },
        { description: { contains: query.q, mode: 'insensitive' } },
      ];
    }

    const skip = (query.page - 1) * query.limit;
    const [items, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        skip,
        take: query.limit,
        orderBy: { createdAt: 'desc' },
        include: {
          category: true,
          images: { orderBy: { sortOrder: 'asc' } },
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    return { items, total, page: query.page, limit: query.limit };
  }

  async getBySlug(slug: string, includeDrafts: boolean) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        images: { orderBy: { sortOrder: 'asc' } },
      },
    });
    if (!product || (!includeDrafts && product.status !== 'PUBLISHED')) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  create(data: ProductCreateInput) {
    return this.prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        priceFrom: data.priceFrom ?? null,
        categoryId: data.categoryId ?? null,
        status: data.status,
      },
      include: { category: true, images: true },
    });
  }

  async update(id: string, data: ProductUpdateInput) {
    await this.ensureExists(id);
    return this.prisma.product.update({
      where: { id },
      data,
      include: { category: true, images: { orderBy: { sortOrder: 'asc' } } },
    });
  }

  async remove(id: string) {
    await this.ensureExists(id);
    await this.prisma.product.delete({ where: { id } });
    return { ok: true };
  }

  private async ensureExists(id: string) {
    const found = await this.prisma.product.findUnique({ where: { id } });
    if (!found) {
      throw new NotFoundException('Product not found');
    }
  }
}
