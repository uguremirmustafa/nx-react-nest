/*eslint-disable*/
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { reactURL } from '../../../libs/utilities/src';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    // allowedHeaders: ['Content-Type', 'Authorization', 'Refresh'],
    credentials: true,
    origin: reactURL,
  });

  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser());

  await app.listen(4000);
}
bootstrap();
