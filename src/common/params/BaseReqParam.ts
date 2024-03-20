import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export class BaseReqParam {
  @ApiProperty({
    example: 'android',
    description: '기기 플랫폼(통계용)',
  })
  @IsNotEmpty()
  @IsString()
  p: string;

  @ApiProperty({
    example: 'b8c7953168a10cc3c40607cc7aaf345b',
    description: '디바이스 아이디',
  })
  @IsNotEmpty()
  @IsString()
  d: string;

  @ApiProperty({
    example: '1000',
    description: '앱 버전',
  })
  @IsNotEmpty()
  @IsNumber()
  v: number;
}
