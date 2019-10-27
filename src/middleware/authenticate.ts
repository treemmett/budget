// eslint-disable-next-line import/no-unresolved
import { Request } from '../@types/vendor';
import { RequestHandler } from 'express';
import UserController from '../controllers/UserController';

const authenticate = (): RequestHandler => async (
  req: Request,
  res,
  next
): Promise<void> => {
  try {
    const header = req.header('authorization');

    if (!header) {
      throw new Error('Missing authorization header.');
    }

    const [type, token] = header.split(' ');

    if (type.toLowerCase() !== 'bearer') {
      throw new Error('Unsupported authorization type.');
    }

    if (!token) {
      throw new Error('Missing bearer token.');
    }

    req.user = await UserController.verifyAccessToken(token);

    next();
  } catch (e) {
    next(e);
  }
};

export default authenticate;
