import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('import')
  @HttpCode(HttpStatus.ACCEPTED)
  postImport() {
    void this.appService.startImport();
    return 'Ok!';
  }
}
