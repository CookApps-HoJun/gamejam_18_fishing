import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthReqParam } from 'src/common/params/AuthReqParam';

@Controller('auth')
@ApiTags('Auth API')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  // @ApiOperation({
  //   summary: '계정 로그인 & 계정 생성',
  //   description:
  //     'deviceId를 기준으로 계정 로그인을 진행 하고 없는 경우 계정을 생성 후 로그인을 진행한다.',
  // })
  // @ApiBody({
  //   type: AuthDto,
  //   examples: {
  //     1: {
  //       summary: '샘플 유저',
  //       description:
  //         'deviceId를 보내면 uid와 token을 반환합니다. 그 후 모든 요청에 토큰이 필요합니다.',
  //       value: { deviceId: 'dummy#1' } as AuthDto,
  //     },
  //   },
  // })
  async login(@Body() authReqParam: AuthReqParam) {
    return this.authService.login(authReqParam);
  }
}
