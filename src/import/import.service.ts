import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { Import } from './entities/import.entity';
import { ImportStatus } from './dtos/import.dto';

@Injectable()
export class ImportService {
  constructor(
    @InjectRepository(Import)
    private readonly importRepository: Repository<Import>,
    @InjectQueue('import-products') private importQueue: Queue,
  ) {}
  async startImport() {
    // Create import entry;
    const importEntry = await this.createImport('products');

    const CHUNK_SIZE = 30;
    await this.importQueue.add('process-chunks', {
      chunkSize: CHUNK_SIZE,
    });

    await this.updateImportStatus(importEntry, ImportStatus.PROCESSING);

    await this.updateImportStatus(importEntry, ImportStatus.COMPLETED);
  }

  private async createImport(resource: string) {
    const importData = this.importRepository.create({ resource });
    return await this.importRepository.save(importData);
  }

  private async updateImportStatus(
    importInstance: Import,
    status: ImportStatus,
  ) {
    importInstance.status = status;
    await this.importRepository.save(importInstance);
  }
}
