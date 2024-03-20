import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { Data } from './entities/data.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Data])],
  controllers: [DataController],
  providers: [DataService],
})
export class DataModule {}
