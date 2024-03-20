import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import dayjs from 'dayjs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly authService: AuthService,
    protected readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('SECRET_KEY'),
    });
  }

  private readonly logger = new Logger(JwtStrategy.name);

  async validate(payload: any) {
    const { uid, d } = payload;
    const { d: lastAccessedDevice } = await this.authService.find(+uid);

    if (lastAccessedDevice === d) {
      // 같으면 스킵해서 다음 진행
    } else if (!lastAccessedDevice) {
      throw new HttpException('디바이스 정보 에러', 500);
    } else {
      throw new HttpException('다중 접속', HttpStatus.TOO_MANY_REQUESTS);
    }
    return payload;
  }
}
