import { Injectable } from '@nestjs/common';
import { Client } from '../../client/client';

const BASE_URL = 'https://dummyjson.com';

@Injectable()
export class DummyJsonClient extends Client {
  static readonly productUrl = 'products';
  constructor() {
    super(BASE_URL);
  }
}
