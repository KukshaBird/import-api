import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { Import } from './entities/import.entity';
import { UpdateImportDto } from './dtos/update-import.dto';
import { Results } from './import.processor';
import { PageOptionsDto } from '../pagination/dtos/page-options.dto';
import { PageResponseDto } from '../pagination/dtos/page-response.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class ImportService {
  constructor(
    @InjectRepository(Import)
    private readonly importRepository: Repository<Import>,
    @InjectQueue('import-products') private importQueue: Queue,
    private readonly productsService: ProductsService,
  ) {}
  public async startImport() {
    // Fetch external api by chunks to avoid memory issues;
    const CHUNK_SIZE = 30;
    // Create import entry;
    const importEntry = await this.createImport('products'); // PENDING

    const results: Results = {
      updated: [],
      created: [],
      deleted: [],
    };
    await this.importQueue.add('process-chunks', {
      chunkSize: CHUNK_SIZE,
      importId: importEntry.id,
      results: results,
    });

    return importEntry;
  }

  private async createImport(resource: string) {
    const importData = this.importRepository.create({ resource });
    return await this.importRepository.save(importData);
  }

  public async update(id: string, updateImportDto: UpdateImportDto) {
    const importInstance = await this.importRepository.findOne({
      where: { id },
    });
    if (!importInstance) {
      throw new NotFoundException('Import not found');
    }

    this.importRepository.merge(importInstance, updateImportDto);
    return await this.importRepository.save(importInstance);
  }

  public async findOne(id: string) {
    const importEntry = await this.importRepository.findOne({ where: { id } });
    if (!importEntry) {
      throw new NotFoundException(`Import with id ${id} found`);
    }
    return importEntry;
  }

  public async getImportData(id: string, pageOptionsDto: PageOptionsDto) {
    const importEntry = await this.findOne(id);
    if (!importEntry) {
      throw new NotFoundException(`Import with id ${id} found`);
    }

    const [items, total] = await this.productsService.findAndCount(
      pageOptionsDto,
      { in: importEntry.products.map(String) },
    );

    return new PageResponseDto(
      items,
      total,
      pageOptionsDto.skip,
      pageOptionsDto.take,
    );
  }
}
