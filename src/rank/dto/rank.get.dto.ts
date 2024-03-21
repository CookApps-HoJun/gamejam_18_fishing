import { IsNumber, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetRankDto {
  @IsString()
  key!: string;
  @IsNumber()
  score!: number;
  @IsObject()
  data: Record<string, any>;
}
