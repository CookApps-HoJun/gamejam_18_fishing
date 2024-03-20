import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
  @ApiProperty({ description: 'uid' })
  uid?: number;
  @ApiProperty({ description: 'd' })
  d?: string;
}
