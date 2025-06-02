import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { ProductsProvider } from './classes/ProductsProvider';
import { ProductResponseType } from './classes/types';
import { ProductsService } from '../products/products.service';

interface ProcessChunkJobData {
  chunkSize: number;
}

@Processor('import-products')
export class ImportProcessor extends WorkerHost {
  constructor(
    private readonly productsProvider: ProductsProvider,
    private readonly productsService: ProductsService,
  ) {
    super();
  }
  async process(job: Job<ProcessChunkJobData, void>) {
    switch (job.name) {
      case 'process-chunks':
        return this.processChunk(job.data.chunkSize);
      default:
        return;
    }
  }

  private async processChunk(chunkSize: number) {
    // Made request to arrange chunks;
    const response = await this.productsProvider.fetchProducts(chunkSize);

    const { total, products } = response;

    if (total <= chunkSize) {
      // Perform one process;
      await this.chunkToProcess(products);
    } else {
      // Perform a process per chunk;
      await this.chunkToProcess(products);
      for (let i = chunkSize; i < total; i += chunkSize) {
        const chunk = await this.productsProvider.fetchProducts(chunkSize, i);
        await this.chunkToProcess(chunk.products);
      }
    }
  }

  private async chunkToProcess(products: ProductResponseType[]) {
    const productsToStore = products.map((product) =>
      this.productsService.create(product),
    );
    await Promise.allSettled(productsToStore);
  }
}
