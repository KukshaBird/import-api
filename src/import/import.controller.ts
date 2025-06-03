import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
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

  @Serialize(ImportDto)
  @Get('/status/:id')
  getStatus(@Param('id', ParseUUIDPipe) id: string) {
    return this.importService.findOne(id);
  }

  @Get('data/:id')
  getData() {
    // TODO: return job results data;
  }
}
