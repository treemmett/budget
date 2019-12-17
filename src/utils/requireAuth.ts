import { Context } from '../graphql';
import HttpException from './HttpException';
import User from '../entities/User';

export default function(ctx: Context): User {
  if (!ctx.user) {
    throw new HttpException({
      error: 'unauthorized_request',
      status: 401,
      message: 'You are not logged in'
    });
  }

  return ctx.user;
}
