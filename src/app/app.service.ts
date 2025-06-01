import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { DummyJsonClient } from './classes/DummyJsonClient';

@Injectable()
export class AppService {
  constructor(
    private readonly client: DummyJsonClient,
    @InjectQueue('import-products') private importQueue: Queue,
  ) {}
  async startImport() {
    const data = await this.fetchAllProducts();
    console.log(data.limit);
    const job = await this.importQueue.add('store', {
      test: 'testData',
    });
    console.log(job.asJSON());
    return;
  }
  async fetchAllProducts() {
    return await this.client.fetchProducts({ params: { limit: '0' } });
  }
}
