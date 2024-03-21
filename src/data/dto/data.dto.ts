import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

type data = {
  category: string;
  data: string;
};

export class DataDto {
  @IsArray()
  data_list: data[];
}
