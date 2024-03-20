import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './common/decorators/public.decorator';
import { BaseReqParam } from './common/params/BaseReqParam';

@Controller()
@Public()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('time')
  time(): number {
    return Math.floor(Date.now() / 1000);
  }

  @Post('version')
  getVersion(@Body() { p, d, v }: BaseReqParam) {
    return {
      version: 1001,
    };
  }
}
