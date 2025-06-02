import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { Import } from './entities/import.entity';
import { UpdateImportDto } from './dtos/update-import.dto';
import { Results } from './import.processor';

@Injectable()
export class ImportService {
  constructor(
    @InjectRepository(Import)
    private readonly importRepository: Repository<Import>,
    @InjectQueue('import-products') private importQueue: Queue,
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
    console.log('DTO: ', updateImportDto);
    console.log('IMPORT: ', importInstance);
    return await this.importRepository.save(importInstance);
  }
}
