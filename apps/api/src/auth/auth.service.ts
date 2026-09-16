import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { loginSchema, type LoginInput } from '@eternal-stone/shared';
import * as bcrypt from 'bcryptjs';
import type { Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { SESSION_COOKIE, SESSION_TTL_MS } from '../common/constants';
import { createSessionToken, hashToken } from '../common/crypto';
import type { Env } from '../config/env';
import type { AuthUser } from '../common/decorators/current-user.decorator';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService<Env, true>,
  ) {}

  async login(raw: LoginInput, res: Response): Promise<AuthUser> {
    const input = loginSchema.parse(raw);
    const user = await this.prisma.user.findUnique({ where: { email: input.email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const matches = await bcrypt.compare(input.password, user.passwordHash);
    if (!matches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = createSessionToken();
    await this.prisma.session.create({
      data: {
        userId: user.id,
        tokenHash: hashToken(token),
        expiresAt: new Date(Date.now() + SESSION_TTL_MS),
      },
    });

    res.cookie(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: this.config.get('COOKIE_SECURE', { infer: true }) === 'true',
      maxAge: SESSION_TTL_MS,
      path: '/',
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }

  async logout(token: string | undefined, res: Response): Promise<void> {
    if (token) {
      await this.prisma.session.deleteMany({ where: { tokenHash: hashToken(token) } });
    }
    res.clearCookie(SESSION_COOKIE, { path: '/' });
  }
}
