import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetRankDto {
  @IsString()
  key!: string;
  @IsNumber()
  @IsOptional()
  limit?: number;
}
