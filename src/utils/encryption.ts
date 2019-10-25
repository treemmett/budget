import { CryptographyKey, SodiumPlus } from 'sodium-plus';
import cryptoAsync from '@ronomon/crypto-async';

let sodium: SodiumPlus;

export async function encrypt(
  data: string | Buffer,
  key: Buffer
): Promise<Buffer> {
  if (!sodium) {
    sodium = await SodiumPlus.auto();
  }

  const cryptoKey = new CryptographyKey(key);

  const nonce = await sodium.randombytes_buf(24);

  const cipher = await sodium.crypto_aead_xchacha20poly1305_ietf_encrypt(
    data,
    nonce,
    cryptoKey
  );

  const nonceLength = Buffer.alloc(1);
  nonceLength.writeUInt8(nonce.length, 0);

  return Buffer.concat([nonceLength, nonce, cipher]);
}

export async function decrypt(cipher: Buffer, key: Buffer): Promise<Buffer> {
  const nonceLength = cipher[0] as number;
  const nonce = cipher.slice(1, nonceLength + 1);
  const block = cipher.slice(nonceLength + 1);

  const cryptoKey = new CryptographyKey(key);

  return sodium.crypto_aead_xchacha20poly1305_ietf_decrypt(
    block,
    nonce,
    cryptoKey
  );
}

export const hash512 = (source: Buffer): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    cryptoAsync.hash('sha512', source, (err, h) => {
      if (err) {
        reject(err);
      } else {
        resolve(h);
      }
    });
  });
