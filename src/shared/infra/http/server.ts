import 'reflect-metadata';
import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/container/index';

const app = express();
app.use(cors());

app.use(express.json());

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  // eslint-disable-next-line no-console
  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'internal server error',
  });
});

app.listen(3333, () =>
  // eslint-disable-next-line no-console
  console.log('🚀 Server start http://localhost:3333 '),
);
