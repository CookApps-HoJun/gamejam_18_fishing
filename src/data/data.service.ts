import { Injectable } from '@nestjs/common';
import { DataDto } from './dto/data.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Data } from './entities/data.entity';

@Injectable()
export class DataService {
  constructor(
    @InjectRepository(Data)
    private dataRepo: Repository<Data>,
  ) {}
  get(uid: number, data: DataDto) {
    return this.dataRepo.find({ where: { uid } });
  }
  set(uid: number, { category, data }: DataDto) {
    console.log({ uid, category, data });

    return this.dataRepo.save({ uid, category, data });
  }
}
