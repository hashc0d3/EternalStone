import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { loadEnv } from './config/env';
import { UPLOADS_DIR } from './common/constants';

async function bootstrap() {
  const env = loadEnv();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  if (env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
  }
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );
  app.use(cookieParser());
  app.enableCors({
    origin: env.WEB_ORIGIN,
    credentials: true,
  });
  app.useStaticAssets(join(process.cwd(), UPLOADS_DIR), {
    prefix: '/media/',
  });

  await app.listen(env.API_PORT);
  Logger.log(`API listening on http://localhost:${env.API_PORT}`, 'Bootstrap');
}

void bootstrap();
