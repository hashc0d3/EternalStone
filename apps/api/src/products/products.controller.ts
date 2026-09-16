import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  productCreateSchema,
  productListQuerySchema,
  productUpdateSchema,
} from '@eternal-stone/shared';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  list(@Query(new ZodValidationPipe(productListQuerySchema)) query: unknown) {
    return this.productsService.list(query as never, false);
  }

  @Get('admin')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN', 'EDITOR')
  adminList(@Query(new ZodValidationPipe(productListQuerySchema)) query: unknown) {
    return this.productsService.list(query as never, true);
  }

  @Get(':slug')
  getBySlug(@Param('slug') slug: string) {
    return this.productsService.getBySlug(slug, false);
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN', 'EDITOR')
  create(@Body(new ZodValidationPipe(productCreateSchema)) body: unknown) {
    return this.productsService.create(body as never);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN', 'EDITOR')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(productUpdateSchema)) body: unknown,
  ) {
    return this.productsService.update(id, body as never);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
