import { decrypt, encrypt, hash512 } from '../utils/encryption';
import User from '../entities/User';
import bcrypt from 'bcryptjs';
import { getManager } from 'typeorm';

export default class UserController {
  private static passwordEncryptionKey = Buffer.from(
    process.env.ENCRYPTION_KEY as string,
    'hex'
  );

  public user: User;

  public constructor(user: User) {
    this.user = user;
  }

  public static async createUser(
    email: string,
    firstName: string,
    lastName: string,
    password: string
  ): Promise<UserController> {
    const hash = await UserController.hashPassword(password);

    const u = getManager().create(User, {
      firstName,
      lastName,
      email,
      hash
    });

    try {
      await getManager().save(User, u);
    } catch (e) {
      // check if email is already registered
      if (e.code === '23505') {
        throw new Error(`Email ${email} is already registered.`);
      } else {
        throw e;
      }
    }

    return new UserController(u);
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

    return new UserController(user);
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
