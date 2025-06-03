import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ImportService } from './import.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ImportDto } from './dtos/import.dto';
import { PageOptionsDto } from '../pagination/dtos/page-options.dto';

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
  getData(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() pageOptionsDto: PageOptionsDto,
  ) {
    console.log(pageOptionsDto);
    return this.importService.getImportData(id, pageOptionsDto);
  }
}
