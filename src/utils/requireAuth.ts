import { Context } from '../graphql';
import HttpException from './HttpException';
import User from '../entities/User';

export default function (ctx: Context): User {
  if (!ctx.user) {
    throw new HttpException({
      error: 'unauthorized_request',
      message: 'You are not logged in',
      status: 401,
    });
  }

  return ctx.user;
}
