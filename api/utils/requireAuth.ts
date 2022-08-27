import { AuthenticationError } from 'apollo-server-express';
import { Context } from '../graphql';
import User from '../entities/User';

export default function (ctx: Context): User {
  if (!ctx.user) {
    throw new AuthenticationError('You are not logged in');
  }

  return ctx.user;
}
