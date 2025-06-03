import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { ProductsProvider } from './classes/ProductsProvider';
import { ProductResponseType } from './classes/types';
import { ProductsService } from '../products/products.service';
import { ImportService } from './import.service';
import { ImportStatus } from './dtos/import.dto';

export type Results = {
  updated: number[];
  created: number[];
  deleted: number[];
};

interface ProcessChunkJobData {
  chunkSize: number;
  importId: string;
  results: Results;
}

@Processor('import-products')
export class ImportProcessor extends WorkerHost {
  constructor(
    private readonly productsProvider: ProductsProvider,
    private readonly productsService: ProductsService,
    private readonly importService: ImportService,
  ) {
    super();
  }
  async process(job: Job<ProcessChunkJobData, void>) {
    switch (job.name) {
      case 'process-chunks':
        await this.processChunks(job);
        return;
      default:
        return;
    }
  }

  private async processChunks(job: Job<ProcessChunkJobData, void>) {
    const { chunkSize, importId, results } = job.data;
    try {
      await this.importService.update(importId, {
        status: ImportStatus.PROCESSING,
      });

      const response = await this.productsProvider.fetchProducts(chunkSize);

      const { total, products } = response;

      if (total <= chunkSize) {
        // Perform one process;
        await this.chunkToProcess(products, results);
      } else {
        // Perform a process per chunk;
        await this.chunkToProcess(products, results); // process fetched chunk first;
        for (let i = chunkSize; i < total; i += chunkSize) {
          const chunk = await this.productsProvider.fetchProducts(chunkSize, i);
          await this.chunkToProcess(chunk.products, results);
        }
      }

      await this.finishJob(importId, results);
    } catch (error: any) {
      await this.importService.update(importId, {
        status: ImportStatus.FAILED,
      });
      // Log error;
      console.log(error);
    } finally {
      // TODO: Log results;
      console.log(results);
    }
  }

  private async chunkToProcess(
    products: ProductResponseType[],
    results: Results,
  ) {
    for (const product of products) {
      const existingProduct = await this.productsService.findOne(product.id);
      if (existingProduct) {
        await this.productsService.update(product.id, product);
        results.updated.push(product.id);
      } else {
        const createdProduct = await this.productsService.create(product);
        results.created.push(createdProduct.id);
      }
    }
  }

  private async finishJob(importId: string, results: Results) {
    await this.importService.update(importId, {
      status: ImportStatus.COMPLETED,
      products: results.created,
    });

    // Update results for future logs;
    results.deleted = await this.productsService.deleteProductsNotInIdList([
      ...results.created,
      ...results.updated,
    ]);
  }
}
