import {
  Body,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Req,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthReqParam } from 'src/common/params/AuthReqParam';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepo: Repository<Auth>,
    private jwtService: JwtService,
  ) {}

  async validateUser(authReqParam: AuthReqParam, ip): Promise<Auth> {
    let { v, d, p, auth_platform = 'google', auth_id } = authReqParam;
    let account = await this.authRepo.findOne({
      where: {
        [auth_platform]: auth_id,
      },
    });

    if (!account) {
      account = await this.createAccount({
        v,
        d,
        p,
        auth_platform,
        auth_id,
        ip,
      });
    }

    return account;
  }

  async createAccount({ v, d, p, auth_platform, auth_id, ip }) {
    const auth = await this.authRepo.save({
      d,
      [auth_platform]: auth_id,
    });

    console.log({
      d,
      [auth_platform]: auth_id,
    });

    const { uid } = auth;
    console.log(`createAccount ${uid}`);

    return auth;
  }

  find(uid: number) {
    return this.authRepo.findOne({ where: { uid } });
  }

  async login(authReqParam: AuthReqParam) {
    const { auth_platform, auth_id, d } = authReqParam;

    const auth = await this.authRepo.findOne({
      where: { [auth_platform]: auth_id },
    });

    const { uid } = await this.authRepo.save({
      ...auth,
      lastLoginDate: new Date(),
    });

    return {
      uid,
      access_token: this.jwtService.sign({ uid, d }),
    };
  }
}
