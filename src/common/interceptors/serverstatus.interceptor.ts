import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class ServerStatusInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  async intercept<T>(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<T>> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();

    const { p, d, v } = request.body;

    if (!isPublic) {
      const { user } = request;
      const { baseUid, uid } = user;
    }

    if (false) {
      throw new HttpException('업데이트 필요', 900);
    }

    return next.handle();
  }
}
