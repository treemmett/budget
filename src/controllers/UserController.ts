import { decrypt, encrypt, hash512 } from '../utils/encryption';
import bcrypt from 'bcryptjs';

export default class UserController {
  private static passwordEncryptionKey = Buffer.from(
    process.env.ENCRYPTION_KEY as string,
    'hex'
  );

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
}
