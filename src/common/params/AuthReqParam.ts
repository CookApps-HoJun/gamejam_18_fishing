import { BaseReqParam } from './BaseReqParam';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthReqParam extends BaseReqParam {
  @ApiProperty({
    example: 'g18420530451491387165',
    description: '플랫폼 아이디',
  })
  @IsOptional()
  @IsString()
  auth_id?: string;

  @ApiProperty({
    example: 'google',
    description: '플랫폼 유형',
  })
  @IsOptional()
  @IsString()
  auth_platform?: string;
}
