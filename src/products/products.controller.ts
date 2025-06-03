import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dtos/product.dto';
import { Serialize } from '../interceptors/serialize.interceptor';

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

  @Serialize(ProductDto)
  @Get('/:id')
  getDetails(@Param('id') id: string) {
    return this.productsService.getById(parseInt(id));
  }
}
