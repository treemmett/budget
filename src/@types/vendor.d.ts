import Express from 'express';
import UserController from '../controllers/UserController';

declare module 'express-serve-static-core' {
  export interface Request {
    user: UserController;
  }
}

export interface Request extends Express.Request {
  user: UserController;
}
