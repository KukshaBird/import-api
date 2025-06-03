import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const { PORT, VERSION } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION ?? '1',
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(PORT ?? 3000);
}
void bootstrap();
