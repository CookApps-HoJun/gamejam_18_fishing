import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import * as _ from 'lodash';

@Injectable()
export class RankService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async getByUid(uid, key) {
    const zKey = `RANK:${key}:`;
    const hKey = `RANK:METADATA:`;

    const rank = await this.redis.zrevrank(zKey, uid);
    const score = parseInt(await this.redis.zscore(zKey, uid)) / 1000;

    if (!rank) {
      return {};
    }

    const rankDetail = JSON.parse(await this.redis.hget(hKey, uid));
    return {
      rank: +rank + 1,
      uid: +uid,
      score,
      ...rankDetail,
    };
  }

  async get(key, uid, limit = 30) {
    const zKey = `RANK:${key}:`;
    const hKey = `RANK:METADATA:`;

    const result = _.chunk(
      await this.redis.zrevrange(zKey, 0, limit - 1, 'WITHSCORES'),
      2,
    );

    const rankList = (
      await this.redis.hmget(hKey, ..._.map(result, ([uid, score]) => uid))
    ).map((rankDetail, index) => {
      const parsedDetail = JSON.parse(rankDetail);
      return {
        rank: index + 1,
        uid: parseInt(result[index][0]),
        score: parseInt(result[index][1]),
        ...parsedDetail,
      };
    });

    const filterdByMyUid = rankList.filter((data) => data.uid === uid);

    const myRank = filterdByMyUid.length
      ? filterdByMyUid[0]
      : await this.getByUid(uid, key);

    return {
      rankList,
      myRank,
      total: +(await this.redis.zcount(zKey, '-inf', '+inf')),
    };
  }

  async set(
    key: string,
    score: number,
    uid: string,
    data: Record<string, any>,
  ) {
    const zkey = `RANK:${key}:`;
    const hKey = `RANK:METADATA:`;
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
