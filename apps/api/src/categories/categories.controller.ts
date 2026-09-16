import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { categoryCreateSchema, categoryUpdateSchema } from '@eternal-stone/shared';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  list() {
    return this.categoriesService.list();
  }

  @Get(':slug')
  getBySlug(@Param('slug') slug: string) {
    return this.categoriesService.getBySlug(slug);
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN', 'EDITOR')
  create(@Body(new ZodValidationPipe(categoryCreateSchema)) body: unknown) {
    return this.categoriesService.create(body as never);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN', 'EDITOR')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(categoryUpdateSchema)) body: unknown,
  ) {
    return this.categoriesService.update(id, body as never);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
