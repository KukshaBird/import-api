import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from '../products/entities/product.entity';
import { ProductsModule } from '../products/products.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const { DATABASE_HOST, DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD } =
  process.env;

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DATABASE_HOST || 'postgres-dev',
      database: DATABASE_NAME || '',
      username: DATABASE_USER || '',
      password: DATABASE_PASSWORD || '',
      port: 5432,
      synchronize: true,
      entities: [Product],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
