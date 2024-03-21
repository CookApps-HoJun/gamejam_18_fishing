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
        [v.category]: JSON.parse(v.data),
      };
    }, {});
  }
  async set(uid: number, { data_list }: DataDto) {
    await this.dataRepo.save(data_list);
    return 'OK';
  }
}
