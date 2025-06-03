import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ImportService } from './import.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ImportDto } from './dtos/import.dto';

@Controller('import')
export class ImportController {
  constructor(private readonly importService: ImportService) {}

  @Serialize(ImportDto)
  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  postImport() {
    return this.importService.startImport();
  }

  @Get('/status/:id')
  getStatus() {
    // TODO: return job status and href to results data;
  }

  @Get('data/:id')
  getData() {
    // TODO: return job results data;
  }
}
