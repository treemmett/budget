import { ErrorRequestHandler } from 'express';
import HttpException from '../utils/HttpException';

const errorHandler = (): ErrorRequestHandler => (err, req, res, next): void => {
  let error = new HttpException();

  if (err instanceof HttpException) {
    error = err;
  } else if (err instanceof Error) {
    error = new HttpException({}, err.stack);
  }

  res.status(error.status).send({
    error: error.error,
    message: error.message,
    stack: process.env.NODE_ENV !== 'production' ? error.stack : undefined
  });

  if (!res.headersSent) {
    next();
  }
};

export default errorHandler;
