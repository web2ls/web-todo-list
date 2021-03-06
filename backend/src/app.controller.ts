import { Controller, Get, All, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Res() res) {
  	res.status(200).sendFile(join(__dirname, 'public', 'frontend', 'index.html'));
  }
}
