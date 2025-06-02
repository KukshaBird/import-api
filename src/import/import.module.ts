import { Module } from '@nestjs/common';
import { ImportService } from './import.service';
import { ImportController } from './import.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Import } from './entities/import.entity';
import { DummyJsonClient } from './classes/DummyJsonClient';
import { ProductsProvider } from './classes/ProductsProvider';
import { ImportProcessor } from './import.processor';
import { QueueModule } from '../queue/queue.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([Import]), QueueModule, ProductsModule],
  controllers: [ImportController],
  providers: [
    ImportService,
    ImportProcessor,
    DummyJsonClient,
    ProductsProvider,
  ],
})
export class ImportModule {}
