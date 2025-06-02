import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from './products/entities/product.entity';
import { ProductsModule } from './products/products.module';
import { QueueModule } from './queue/queue.module';
import { ImportModule } from './import/import.module';
import { Import } from './import/entities/import.entity';

const { DATABASE_HOST, DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD } =
  process.env;

@Module({
  imports: [
    ProductsModule,
    ImportModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DATABASE_HOST || 'postgres-dev',
      database: DATABASE_NAME || '',
      username: DATABASE_USER || '',
      password: DATABASE_PASSWORD || '',
      port: 5432,
      synchronize: true, //TODO: remove in production;
      entities: [Product, Import],
    }),
    QueueModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
