import { FindOptionsWhere, In, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { PageOptionsDto } from '../pagination/dtos/page-options.dto';
import { PageResponseDto } from '../pagination/dtos/page-response.dto';

interface DeletedProduct {
  id: number;
}

interface ProductListOptions {
  ids?: number[];
  title?: string;
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

  async findAll(
    pageOptionsDto: PageOptionsDto,
    options: ProductListOptions = {},
  ) {
    const [items, total] = await this.findAndCount(pageOptionsDto, options);

    return new PageResponseDto(
      items,
      total,
      pageOptionsDto.skip,
      pageOptionsDto.take,
    );
  }

  public async findOne(id: number) {
    return this.productRepository.findOne({ where: { id } });
  }

  public async getById(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} found`);
    }
    return product;
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

  public async findAndCount(
    pageOptionsDto: PageOptionsDto,
    options: ProductListOptions,
  ) {
    const { ids, title } = options;

    const _options: FindOptionsWhere<Product> = {};

    if (ids) {
      _options.id = In(ids);
    }

    if (title) {
      _options.title = ILike(`%${title.trim()}%`);
    }

    return await this.productRepository.findAndCount({
      where: _options,
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
      order: { id: 'ASC' },
    });
  }
}
