import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { loginSchema } from '@eternal-stone/shared';
import type { Request, Response } from 'express';
import { AuthGuard } from '../common/guards/auth.guard';
import { CurrentUser, type AuthUser } from '../common/decorators/current-user.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { SESSION_COOKIE } from '../common/constants';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Throttle({ default: { limit: 8, ttl: 60_000 } })
  login(
    @Body(new ZodValidationPipe(loginSchema)) body: unknown,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(body as never, res);
  }

  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = req.cookies?.[SESSION_COOKIE] as string | undefined;
    await this.authService.logout(token, res);
    return { ok: true };
  }

  @Get('me')
  @UseGuards(AuthGuard)
  me(@CurrentUser() user: AuthUser) {
    return user;
  }
}
