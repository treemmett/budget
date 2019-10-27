import { decrypt, encrypt, hash512 } from '../utils/encryption';
import Token from '../entities/Token';
import User from '../entities/User';
import bcrypt from 'bcryptjs';
import { getManager } from 'typeorm';
import jwt from 'jsonwebtoken';
import uuid from 'uuid';

export default class UserController {
  private static passwordEncryptionKey = Buffer.from(
    process.env.ENCRYPTION_KEY as string,
    'hex'
  );

  private static jwtSecret = Buffer.from(
    process.env.JWT_SECRET as string,
    'hex'
  );

  public token: Token;

  public user: User;

  public constructor(user: User, token: Token) {
    this.user = user;
    this.token = token;
  }

  public static async createUser(
    email: string,
    firstName: string,
    lastName: string,
    password: string
  ): Promise<UserController> {
    const hash = await UserController.hashPassword(password);

    const user = getManager().create(User, {
      firstName,
      lastName,
      email,
      hash
    });

    try {
      await getManager().save(User, user);
    } catch (e) {
      // check if email is already registered
      if (e.code === '23505') {
        throw new Error(`Email ${email} is already registered.`);
      } else {
        throw e;
      }
    }

    const token = await UserController.createAccessToken(user);

    return new UserController(user, token);
  }

  public static async login(
    email: string,
    password: string
  ): Promise<UserController> {
    const user = await getManager().findOne(User, { email });

    if (!user) {
      throw new Error('User not found.');
    }

    const passMatch = await UserController.verifyPassword(password, user.hash);

    if (!passMatch) {
      throw new Error('Incorrect password.');
    }

    const token = await UserController.createAccessToken(user);

    return new UserController(user, token);
  }

  public static async verifyAccessToken(
    token: string
  ): Promise<UserController> {
    try {
      const claims = jwt.verify(token, UserController.jwtSecret, {
        algorithms: ['HS256']
      }) as { iat: number; exp: number; sub: string; jti: string };

      const t = await getManager().findOneOrFail(Token, {
        where: { jti: claims.jti },
        relations: ['user']
      });

      return new UserController(t.user, t);
    } catch (e) {
      throw new Error('Invalid access token.');
    }
  }

  private static async createAccessToken(user: User): Promise<Token> {
    // set time the token expires
    const expires = new Date();
    expires.setHours(expires.getHours() + 1);

    // create a session token
    const token = getManager().create(Token, {
      user,
      jti: uuid(),
      expires
    });

    await getManager().save(Token, token);

    return token;
  }

  private static async hashPassword(password: string): Promise<Buffer> {
    // create sha512 digest of the password to ellimate truncation and dos issues
    const hash = await hash512(Buffer.from(password));
    const saltedHash = await bcrypt.hash(hash.toString('hex'), 10);
    const encryptedHash = await encrypt(
      Buffer.from(saltedHash),
      UserController.passwordEncryptionKey
    );
    return encryptedHash;
  }

  private static async verifyPassword(
    password: string,
    hash: Buffer
  ): Promise<boolean> {
    try {
      const [shaHash, decryptedHash] = await Promise.all([
        hash512(Buffer.from(password)),
        decrypt(hash, UserController.passwordEncryptionKey)
      ]);

      return bcrypt.compare(shaHash.toString('hex'), decryptedHash.toString());
    } catch (e) {
      return false;
    }
  }

  public getTokenDetails(): { expiresAt: number; token: string } {
    const exp = Math.floor(this.token.expires.getTime() / 1000);
    const iat = Math.floor(this.token.issued.getTime() / 1000);

    return {
      expiresAt: Math.floor(this.token.expires.getTime() / 1000),
      token: jwt.sign({ exp, iat }, UserController.jwtSecret, {
        jwtid: this.token.jti,
        subject: this.user.id
      })
    };
  }

  public getUser(): {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  } {
    return {
      id: this.user.id,
      email: this.user.email,
      firstName: this.user.firstName,
      lastName: this.user.lastName
    };
  }
}
