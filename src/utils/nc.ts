import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect, { Options } from 'next-connect';

export const nc = (options?: Options<NextApiRequest, NextApiResponse>) =>
  nextConnect(options).use((req, res, next) => {
    // TODO remove in production
    setTimeout(next, 3000);
  });
