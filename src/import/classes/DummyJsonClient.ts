import { Injectable } from '@nestjs/common';
import { Client, ClientOptions } from '../../client/client';
import { ProductResponse } from './types';

const BASE_URL = 'https://dummyjson.com';

@Injectable()
export class DummyJsonClient extends Client {
  static readonly productUrl = 'products';
  constructor() {
    super(BASE_URL);
  }

  public async fetchProducts(options: ClientOptions = {}) {
    return await this.madeRequest<ProductResponse>(
      DummyJsonClient.productUrl,
      options,
    );
  }
}
