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
import { workCreateSchema, workListQuerySchema, workUpdateSchema } from '@eternal-stone/shared';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { WorksService } from './works.service';

@Controller('works')
export class WorksController {
  constructor(private readonly worksService: WorksService) {}

  @Get()
  list(@Query(new ZodValidationPipe(workListQuerySchema)) query: unknown) {
    return this.worksService.list(query as never, false);
  }

  @Get('admin')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN', 'EDITOR')
  adminList(@Query(new ZodValidationPipe(workListQuerySchema)) query: unknown) {
    return this.worksService.list(query as never, true);
  }

  @Get(':slug')
  getBySlug(@Param('slug') slug: string) {
    return this.worksService.getBySlug(slug, false);
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN', 'EDITOR')
  create(@Body(new ZodValidationPipe(workCreateSchema)) body: unknown) {
    return this.worksService.create(body as never);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN', 'EDITOR')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(workUpdateSchema)) body: unknown,
  ) {
    return this.worksService.update(id, body as never);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.worksService.remove(id);
  }
}
