import * as express from 'express';
import { inject } from 'inversify';
import { IRouletteService } from '@services/rouletteService';
import {
  controller,
  httpGet,
  httpPost,
  interfaces,
  next,
  request,
  requestHeaders,
  requestParam,
  response
} from 'inversify-express-utils';
import TYPES from '@ioc/types';

@controller('/v1/roulette')
export class RouletteController implements interfaces.Controller {
  constructor(
    @inject(TYPES.IRouletteService) private rouletteService: IRouletteService
  ) {}

  @httpGet('/')
  public async list(
    @request() req: express.Request,
    @response() res: express.Response,
    @next() nextFunc: express.NextFunction
  ) {
    const roulettes = await this.rouletteService.list();
    res.status(200).json(roulettes);
    nextFunc();
  }

  @httpPost('/create')
  public async create(
    @request() req: express.Request,
    @response() res: express.Response,
    @next() nextFunc: express.NextFunction
  ) {
    const roulette = req.body.roulette;
    const newRoulette = await this.rouletteService.newRoulette(roulette);
    res.status(200).json({
      id: newRoulette._id
    });
    nextFunc();
  }

  @httpGet('/opening/:roullete_id')
  public async opening(
    @requestParam('roullete_id') roullete_id: string,
    @response() res: express.Response,
    @next() nextFunc: express.NextFunction
  ) {
    const Res = await this.rouletteService.opening(roullete_id);
    res.status(200).json(Res);
    nextFunc();
  }

  @httpPost('/bet/:roullete_id')
  public async bet(
    @requestParam('roullete_id') roullete_id: string,
    @requestHeaders('user-id') userId: string,
    @request() req: express.Request,
    @response() res: express.Response,
    @next() nextFunc: express.NextFunction
  ) {
    const Res = await this.rouletteService.bet(roullete_id, userId, req.body);
    res.status(Res.code).json(Res.body);
    nextFunc();
  }

  @httpGet('/closing/:roullete_id')
  public async closing(
    @requestParam('roullete_id') roullete_id: string,
    @response() res: express.Response,
    @next() nextFunc: express.NextFunction
  ) {
    const Res = await this.rouletteService.closing(roullete_id);
    res.status(Res.code).json(Res.body);
    nextFunc();
  }
}
