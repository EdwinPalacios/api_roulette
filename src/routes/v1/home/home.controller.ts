import * as express from 'express';
//import { inject } from 'inversify';
import {
  controller,
  httpGet,
  httpPost,
  interfaces,
  next,
  request,
  response
} from 'inversify-express-utils';

@controller('/v1')
export class HomeController implements interfaces.Controller {
  //constructor() {}

  @httpGet('/')
  public get(
    @request() req: express.Request,
    @response() res: express.Response,
    @next() nextFunc: express.NextFunction
  ): void {
    res.status(200).json({ data: 'Hola mundo' });
    nextFunc();
  }

  @httpPost('/')
  public post(
    @request() req: express.Request,
    @response() res: express.Response,
    @next() nextFunc: express.NextFunction
  ): void {
    res.status(500).json({});
    nextFunc();
  }
}
