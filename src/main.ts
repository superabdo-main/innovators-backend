import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { VersioningType } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import * as path from 'path';
import { PrismaService } from 'nestjs-prisma';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: '*', // Allow requests from all origins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  // Get PrismaService instance
  const prismaService = app.get(PrismaService);
  
  // Apply global exception filter
  app.useGlobalFilters(new GlobalExceptionFilter(prismaService));

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
