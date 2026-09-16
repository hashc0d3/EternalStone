import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import sharp from 'sharp';
import { PrismaService } from '../prisma/prisma.service';
import { ALLOWED_IMAGE_MIME, UPLOADS_DIR } from '../common/constants';

type OwnerKind = 'products' | 'works';

const VARIANTS = [
  { name: 'thumb', width: 600 },
  { name: 'card', width: 1200 },
  { name: 'full', width: 1800 },
] as const;

@Injectable()
export class UploadsService {
  constructor(private readonly prisma: PrismaService) {}

  async attachToProduct(productId: string, file: Express.Multer.File, alt = '') {
    await this.ensureProduct(productId);
    const paths = await this.processImage('products', productId, file);
    const last = await this.prisma.productImage.findFirst({
      where: { productId },
      orderBy: { sortOrder: 'desc' },
    });
    return this.prisma.productImage.create({
      data: {
        productId,
        alt,
        sortOrder: (last?.sortOrder ?? -1) + 1,
        ...paths,
      },
    });
  }

  async attachToWork(workId: string, file: Express.Multer.File, alt = '') {
    await this.ensureWork(workId);
    const paths = await this.processImage('works', workId, file);
    const last = await this.prisma.workImage.findFirst({
      where: { workId },
      orderBy: { sortOrder: 'desc' },
    });
    return this.prisma.workImage.create({
      data: {
        workId,
        alt,
        sortOrder: (last?.sortOrder ?? -1) + 1,
        ...paths,
      },
    });
  }

  private assertImage(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    if (!ALLOWED_IMAGE_MIME.includes(file.mimetype as (typeof ALLOWED_IMAGE_MIME)[number])) {
      throw new BadRequestException('Only JPEG, PNG and WebP images are allowed');
    }
  }

  private async processImage(kind: OwnerKind, ownerId: string, file: Express.Multer.File) {
    this.assertImage(file);
    const dir = join(process.cwd(), UPLOADS_DIR, kind, ownerId);
    await mkdir(dir, { recursive: true });

    const id = randomUUID();
    const originalName = `${id}-original${this.extension(file.mimetype)}`;
    const originalRel = `/media/${kind}/${ownerId}/${originalName}`;
    await writeFile(join(dir, originalName), file.buffer);

    const variants: Record<'thumb' | 'card' | 'full', string> = {
      thumb: '',
      card: '',
      full: '',
    };

    for (const variant of VARIANTS) {
      const fileName = `${id}-${variant.name}.webp`;
      await sharp(file.buffer)
        .rotate()
        .resize({ width: variant.width, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(join(dir, fileName));
      variants[variant.name] = `/media/${kind}/${ownerId}/${fileName}`;
    }

    return {
      original: originalRel,
      thumb: variants.thumb,
      card: variants.card,
      full: variants.full,
    };
  }

  private extension(mime: string) {
    if (mime === 'image/png') return '.png';
    if (mime === 'image/webp') return '.webp';
    return '.jpg';
  }

  private async ensureProduct(id: string) {
    const found = await this.prisma.product.findUnique({ where: { id } });
    if (!found) throw new NotFoundException('Product not found');
  }

  private async ensureWork(id: string) {
    const found = await this.prisma.work.findUnique({ where: { id } });
    if (!found) throw new NotFoundException('Work not found');
  }
}
