import { RedisClient } from 'redis';
import { provide } from 'inversify-binding-decorators';
import { ICacheService } from '.';

import TYPES from '@ioc/types';

@provide(TYPES.ICacheService)
export class CacheService implements ICacheService {
  public redisClient: RedisClient;

  constructor() {
    this.redisClient = new RedisClient({
      host: process.env.REDISHOST,
      port: process.env.REDISPORT
    });
  }

  public get(entity: any) {
    return new Promise((resolve, reject) => {
      this.redisClient.get(entity.key, (err: any, value: any) => {
        if (!err && !value) {
          entity.data = undefined;
          resolve(entity);
        }
        if (err) {
          reject(err);
        }
        entity.data = JSON.parse(value);
        resolve(entity);
      });
    });
  }

  public set(entity: any) {
    return new Promise((resolve, reject) => {
      this.redisClient.set(
        entity.key,
        JSON.stringify(entity.data),
        (err: any) => {
          if (err) {
            reject(err);
          }
          resolve(entity);
        }
      );
    });
  }
}
