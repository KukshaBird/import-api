import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/')
  getProducts(
    @Query('title') title: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
  ) {
    return this.productsService.findAll({ take, skip }, { title });
  }
}
