import { Injectable } from '@nestjs/common';
import type { LeadCreateInput } from '@eternal-stone/shared';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LeadsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: LeadCreateInput) {
    return this.prisma.lead.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        message: data.message,
        source: data.source,
      },
    });
  }

  list() {
    return this.prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });
  }
}
