import HttpException from '../utils/HttpException';
// TODO: modify lint rule to allow interface imports
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
      throw new HttpException({
        error: 'unauthorized_request',
        message: 'Missing authorization header.',
        status: 401
      });
    }

    const [type, token] = header.split(' ');

    if (type.toLowerCase() !== 'bearer') {
      throw new HttpException({
        error: 'unauthorized_request',
        message: 'Unsupported authorization type.',
        status: 401
      });
    }

    if (!token) {
      throw new HttpException({
        error: 'unauthorized_request',
        message: 'Missing bearer token.',
        status: 401
      });
    }

    req.user = await UserController.verifyAccessToken(token);

    next();
  } catch (e) {
    next(e);
  }
};

export default authenticate;
