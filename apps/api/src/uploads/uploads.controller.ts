import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { MAX_UPLOAD_BYTES } from '../common/constants';
import { UploadsService } from './uploads.service';

@Controller('uploads')
@UseGuards(AuthGuard, RolesGuard)
@Roles('ADMIN', 'EDITOR')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('products/:productId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: MAX_UPLOAD_BYTES },
    }),
  )
  uploadProductImage(
    @Param('productId') productId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('alt') alt?: string,
  ) {
    return this.uploadsService.attachToProduct(productId, file, alt ?? '');
  }

  @Post('works/:workId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: MAX_UPLOAD_BYTES },
    }),
  )
  uploadWorkImage(
    @Param('workId') workId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('alt') alt?: string,
  ) {
    return this.uploadsService.attachToWork(workId, file, alt ?? '');
  }
}
