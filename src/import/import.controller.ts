import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ImportService } from './import.service';

@Controller('import')
export class ImportController {
  constructor(private readonly importService: ImportService) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  postImport() {
    void this.importService.startImport();
    return 'Ok!';
  }
}
