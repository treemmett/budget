import Config from '../utils/config';
import Token from '../entities/Token';
import User from '../entities/User';
import { getManager } from 'typeorm';
import jwt from 'jsonwebtoken';

export default class UserController {
  public static async verifyToken(token?: string): Promise<User | void> {
    try {
      if (!token) {
        return;
      }

      const jwtData = jwt.verify(token, Config.JWT_SECRET, {
        algorithms: ['HS256'],
        maxAge: '24h'
      }) as {
        jti: string;
        sub: string;
        iat: Date;
        exp: Date;
      };

      const session = await getManager().findOneOrFail(Token, {
        where: { jti: jwtData.jti },
        relations: ['user']
      });

      return session.user;
    } catch (e) {
      //
    }
  }
}
