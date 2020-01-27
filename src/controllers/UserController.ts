import Config from '../utils/config';
import HttpException from '../utils/HttpException';
import Token from '../entities/Token';
import User from '../entities/User';
import bcrypt from 'bcryptjs';
import { getManager } from 'typeorm';
import jwt from 'jsonwebtoken';
import uuid from 'uuid/v4';

export default class UserController {
  public user: User;

  public constructor(user: User) {
    this.user = user;
  }

  public static async createUser(
    email: string,
    firstName: string,
    lastName: string,
    password: string
  ): Promise<User> {
    const user = new User();
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;

    // hash password through bcrypt
    const hash = await bcrypt.hash(password, 10);
    user.hash = Buffer.from(hash);

    await getManager().save(user);

    return user;
  }

  public static async login(
    email: string,
    password: string
  ): Promise<{ jwt: string; token: Token; user: User }> {
    const user = await getManager().findOne(User, { where: { email } });

    if (!user) {
      throw new HttpException({
        error: 'unauthorized_request',
        message: 'Email not registered',
        status: 401
      });
    }

    const hashMatch = await bcrypt.compare(password, user.hash.toString());

    if (!hashMatch) {
      throw new HttpException({
        error: 'unauthorized_request',
        message: 'Incorrect password.',
        status: 401
      });
    }

    const { token, jwt: jwtToken } = await new UserController(
      user
    ).createToken();

    return { token, jwt: jwtToken, user };
  }

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

  public async createToken(): Promise<{
    jwt: string;
    token: Token;
  }> {
    const token = new Token();
    token.jti = uuid();
    token.expires = new Date(Date.now() + 1000 * 60 * 60);
    token.user = this.user;

    const signedToken = jwt.sign(
      {
        exp: Math.floor(token.expires.getTime() / 1000)
      },
      Config.JWT_SECRET,
      {
        jwtid: token.jti,
        subject: this.user.id
      }
    );

    await getManager().save(token);

    return {
      jwt: signedToken,
      token
    };
  }
}
