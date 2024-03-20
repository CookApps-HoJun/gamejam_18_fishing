import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DataDto {
  @ApiProperty({
    example: 'user',
    description: '카테고리',
  })
  @IsString()
  category: string;

  @ApiProperty({
    example: '{"level" : 1}',
    description: '데이터',
  })
  @IsString()
  data?: string;
}
