import { Injectable, NotFoundException } from '@nestjs/common';
import type { CategoryCreateInput, CategoryUpdateInput } from '@eternal-stone/shared';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.category.findMany({ orderBy: { sortOrder: 'asc' } });
  }

  async getBySlug(slug: string) {
    const category = await this.prisma.category.findUnique({ where: { slug } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  create(data: CategoryCreateInput) {
    return this.prisma.category.create({ data });
  }

  async update(id: string, data: CategoryUpdateInput) {
    await this.ensureExists(id);
    return this.prisma.category.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.ensureExists(id);
    await this.prisma.category.delete({ where: { id } });
    return { ok: true };
  }

  private async ensureExists(id: string) {
    const found = await this.prisma.category.findUnique({ where: { id } });
    if (!found) {
      throw new NotFoundException('Category not found');
    }
  }
}
