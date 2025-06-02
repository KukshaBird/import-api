import { DummyJsonClient } from './DummyJsonClient';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsProvider {
  constructor(private readonly client: DummyJsonClient) {}

  public async fetchProducts(limit: number = 30, skip: number = 0) {
    if (Number.isNaN(limit)) {
      throw new Error('limit must be a number');
    }

    const params: Record<string, string> = {
      limit: limit.toString(),
      skip: skip.toString(),
    };

    return await this.client.fetchProducts({ params });
  }
}
