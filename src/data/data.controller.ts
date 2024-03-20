import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { DataService } from './data.service';
import { DataDto } from './dto/data.dto';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post('get')
  get(@Body() data: DataDto, @Req() { user }) {
    const { uid } = user;
    return this.dataService.get(uid, data);
  }
  @Post('set')
  set(@Body() data: DataDto, @Req() { user }) {
    const { uid } = user;
    return this.dataService.set(uid, data);
  }
}
