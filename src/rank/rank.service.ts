import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
@Injectable()
export class RankService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  get() {}

  async set(key, score, uid, data) {
    console.log({ key, score, uid, data });

    const zkey = `RANK:${key}:`;
    const hKey = `PROFILE:${key}`;
    score = score + (1 - Date.now() / 1e13);

    return this.redis
      .multi()
      .zadd(zkey, score, uid)
      .hset(hKey, { [uid]: JSON.stringify(data) })
      .exec((err: any, res: any) => {
        if (err) {
          throw new HttpException(
            'TRANSACTION_ERROR_WITH_REDIS_SET_KEY',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      });
  }
}
