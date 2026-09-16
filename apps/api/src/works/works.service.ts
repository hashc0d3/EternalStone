import { Injectable, NotFoundException } from '@nestjs/common';
import type { WorkCreateInput, WorkListQuery, WorkUpdateInput } from '@eternal-stone/shared';
import type { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WorksService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: WorkListQuery, includeDrafts: boolean) {
    const where: Prisma.WorkWhereInput = {};
    if (!includeDrafts) {
      where.status = 'PUBLISHED';
    } else if (query.status) {
      where.status = query.status;
    }

    const skip = (query.page - 1) * query.limit;
    const [items, total] = await this.prisma.$transaction([
      this.prisma.work.findMany({
        where,
        skip,
        take: query.limit,
        orderBy: { createdAt: 'desc' },
        include: { images: { orderBy: { sortOrder: 'asc' } } },
      }),
      this.prisma.work.count({ where }),
    ]);

    return { items, total, page: query.page, limit: query.limit };
  }

  async getBySlug(slug: string, includeDrafts: boolean) {
    const work = await this.prisma.work.findUnique({
      where: { slug },
      include: { images: { orderBy: { sortOrder: 'asc' } } },
    });
    if (!work || (!includeDrafts && work.status !== 'PUBLISHED')) {
      throw new NotFoundException('Work not found');
    }
    return work;
  }

  create(data: WorkCreateInput) {
    return this.prisma.work.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        status: data.status,
      },
      include: { images: true },
    });
  }

  async update(id: string, data: WorkUpdateInput) {
    await this.ensureExists(id);
    return this.prisma.work.update({
      where: { id },
      data,
      include: { images: { orderBy: { sortOrder: 'asc' } } },
    });
  }

  async remove(id: string) {
    await this.ensureExists(id);
    await this.prisma.work.delete({ where: { id } });
    return { ok: true };
  }

  private async ensureExists(id: string) {
    const found = await this.prisma.work.findUnique({ where: { id } });
    if (!found) {
      throw new NotFoundException('Work not found');
    }
  }
}
