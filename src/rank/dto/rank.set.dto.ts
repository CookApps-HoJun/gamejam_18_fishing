import { IsNumber, IsObject, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SetRankDto {
  @IsString()
  @IsNotEmpty()
  key: string;
  @IsNumber()
  @IsNotEmpty()
  score: number;
  @IsObject()
  @IsNotEmpty()
  data: Record<string, any>;
}
