import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect, { Middleware, Options } from 'next-connect';
import { connectToDatabase } from './database';

export const nc = (options?: Options<NextApiRequest, NextApiResponse>) =>
  nextConnect(options).use(connectToDatabase);

export type ApiMiddleware = Middleware<NextApiRequest, NextApiResponse>;
