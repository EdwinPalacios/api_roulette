require('module-alias/register');

import 'reflect-metadata';

import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';

import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from '@ioc/inversify.config';

dotenv.config();

import '@ioc/loader';

const server = new InversifyExpressServer(container, null, {
  rootPath: process.env.ROOT_PATH || ''
});

server.setConfig((app) => {
  app.use(
    express.urlencoded({
      extended: false
    })
  );
  app.use(express.json());
  app.use(helmet());
  app.use(cors());
  app.disable('x-powered-by');
  app.disable('etag');
});

const serverInstance = server.build();

serverInstance.listen(process.env.PORT, () => {
  console.info(`HTTP server started at http://localhost:${process.env.PORT}`);
});

exports = module.exports = serverInstance;
