import { Injectable } from '@nestjs/common';
import { DataDto } from './dto/data.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Data } from './entities/data.entity';
import _ from 'lodash';

@Injectable()
export class DataService {
  constructor(
    @InjectRepository(Data)
    private dataRepo: Repository<Data>,
  ) {}
  async get(uid: number) {
    const data = await this.dataRepo.find({ where: { uid } });

    return data.reduce((r, v, k) => {
      return {
        uid,
        ...r,
        [v.category]: v.data,
      };
    }, {});
  }
  set(uid: number, { category, data }: DataDto) {
    console.log({ uid, category, data });

    return this.dataRepo.save({ uid, category, data });
  }
}
