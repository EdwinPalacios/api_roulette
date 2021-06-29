import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { IMongoClientService } from '../mongoClientService';
import { IUserService } from '.';

import TYPES from '@ioc/types';

@provide(TYPES.IUserService)
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.IMongoClientService) private mongoClient: IMongoClientService
  ) {}

  public findById(id: any) {
    return this.mongoClient.findOneById('users', id);
  }

  public update(user) {
    return this.mongoClient.update('users', user._id, user);
  }
}
