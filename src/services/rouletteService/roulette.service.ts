import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { IMongoClientService } from '../mongoClientService';
import { IUserService } from '../userService';
import { validateBet } from '@utils/validateRoulette';
import { generateRandomNumber } from '@utils/random';

import { IRouletteService } from '.';

import TYPES from '@ioc/types';

@provide(TYPES.IRouletteService)
export class RouletteService implements IRouletteService {
  constructor(
    @inject(TYPES.IMongoClientService) private mongoClient: IMongoClientService,
    @inject(TYPES.IUserService) private userService: IUserService
  ) {}

  public list() {
    return new Promise<any[]>((resolve) => {
      this.mongoClient.find('roulettes', {}, (error, data: any[]) => {
        resolve(data);
      });
    });
  }

  public newRoulette(roulette: any): Promise<any> {
    return new Promise<any>((resolve) => {
      this.mongoClient.insert(
        'roulettes',
        roulette,
        (error: any, data: any) => {
          resolve(data);
        }
      );
    });
  }

  public async opening(roullete_id: string) {
    const roullete = await this.mongoClient.findOneById(
      'roulettes',
      roullete_id
    );

    let Res = 'DENEGADA';

    if (roullete !== undefined && !roullete?.status) {
      roullete.status = true;
      await this.mongoClient.update('roulettes', roullete_id, roullete);
      Res = 'EXITOSA';
    }

    return {
      operacion: Res
    };
  }

  public async bet(roullete_id: string, user_id: string, body: any) {
    const user = await this.userService.findById(user_id);

    const roullete = await this.mongoClient.findOneById(
      'roulettes',
      roullete_id
    );

    const validation = validateBet(roullete, user, body);
    if (validation) return validation;

    if (!roullete.bet) roullete.bet = [];

    roullete.bet.push({
      ...body,
      user: {
        name: user.name,
        _id: user._id
      }
    });

    await this.mongoClient.update('roulettes', roullete_id, roullete);

    return {
      code: 200,
      body: {
        roullete
      }
    };
  }

  public async closing(roullete_id) {
    const roullete = await this.mongoClient.findOneById(
      'roulettes',
      roullete_id
    );

    if (roullete === undefined) {
      return {
        code: 422,
        body: {
          message: 'invalid data'
        }
      };
    }

    if (roullete?.status) {
      roullete.status = false;
      await this.mongoClient.update('roulettes', roullete_id, roullete);

      const numberRand = generateRandomNumber();
      let colorRand = 'negro';
      if (numberRand % 2 == 0) colorRand = 'rojo';

      for (const bet of roullete.bet) {
        const user = await this.userService.findById(bet.user._id);

        if (bet?.number === numberRand) user.money += bet.money * 5;
        if (bet?.color === colorRand) user.money += bet.money * 1.8;

        if (bet?.number !== numberRand && bet?.color !== colorRand)
          user.money -= bet.money;

        await this.userService.update(user);
      }
    }

    return {
      code: 200,
      body: {
        ...roullete
      }
    };
  }
}
