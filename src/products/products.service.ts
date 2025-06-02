import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

interface DeletedProduct {
  id: number;
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);

    return this.productRepository.save(product);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    this.productRepository.merge(product, updateProductDto);
    return this.productRepository.save(product);
  }

  findAll() {
    // TODO: Implement indAll with pagination and search;
    return this.productRepository.find();
  }

  public async fondOne(id: number) {
    return this.productRepository.findOne({ where: { id } });
  }

  public async deleteProductsNotInIdList(ids: number[]) {
    const result = await this.productRepository
      .createQueryBuilder()
      .delete()
      .from('products')
      .where('id NOT IN (:...ids)', { ids })
      .returning('id')
      .execute();

    return (result.raw as DeletedProduct[]).map((item) => item.id);
  }
}
