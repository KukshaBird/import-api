import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const { PORT, VERSION } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION ?? '1',
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Swagger
  const options = new DocumentBuilder()
    .setTitle('Import API')
    .setDescription('The import products API description')
    .setVersion('1.0')
    // .addTag('base')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT ?? 3000);
}
void bootstrap();
