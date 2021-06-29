import 'reflect-metadata';

import { createRequest, createResponse } from 'node-mocks-http';
import { HomeController } from './home.controller';

describe('HomeController', () => {
  const homeController = new HomeController();

  test('Test the root path', (done) => {
    const body = {};

    const req = createRequest({
      body,
      method: 'GET',
      url: '/roulette/'
    });
    const res = createResponse();
    const next = () => {
      done();
    };

    homeController.get(req, res, next);
    res.end();

    const data = JSON.parse(res._getData());
    expect(res._getStatusCode()).toEqual(200);
    expect(data).toEqual({ data: 'Hola mundo' });
  });
});
