import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller()
export class AppController {
  @Post('import')
  @HttpCode(HttpStatus.ACCEPTED)
  postHello() {
    return { id: 'foo' };
  }
}
