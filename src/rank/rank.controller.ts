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
import { RankService } from './rank.service';
import { SetRankDto } from './dto/rank.set.dto';
import { GetRankDto } from './dto/rank.get.dto';

@Controller('rank')
export class RankController {
  constructor(private readonly rankService: RankService) {}

  @Post('get')
  get() {
    return this.rankService.get();
  }
  @Post('set')
  set(@Body() { key, score, data }: SetRankDto, @Req() { user }) {
    const { uid } = user;
    return this.rankService.set(key, score, uid, data);
  }
}
