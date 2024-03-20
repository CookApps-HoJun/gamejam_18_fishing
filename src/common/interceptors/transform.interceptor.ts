import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  OnModuleInit,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import _ from 'lodash';
import { IBaseResponse } from '../interfaces/base.interfaces';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, IBaseResponse<T> | string>, OnModuleInit
{
  constructor() {}

  private _controllerPaths: string[] = [];

  async onModuleInit() {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IBaseResponse<T> | string> {
    return next.handle().pipe(
      map((data) => {
        return {
          code: context.switchToHttp().getResponse().statusCode,
          reqId: context.switchToHttp().getRequest().reqId,
          msg: data?.msg || 'OK',
          data,
        };
      }),
    );
  }
}
