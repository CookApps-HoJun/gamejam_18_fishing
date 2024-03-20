import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { Strategy } from 'passport-local';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'auth_id',
      passwordField: 'auth_id',
      passReqToCallback: true,
    });
  }

  async validate({ body, headers, ip }) {
    ip = headers['x-forwarded-for'] || ip.replace('::ffff:', '');

    const account = await this.authService.validateUser(body, ip);
    if (!account) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    return account;
  }
}
