/* eslint-disable lines-between-class-members */
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const { env } = process;

class Config {
  // API specific settings
  public readonly DEVELOPMENT: boolean = env.NODE_ENV !== 'production';
  public readonly API_PORT: number = env.API_PORT
    ? parseInt(env.API_PORT, 10)
    : 8080;

  // Database settings
  public readonly DB_DATABASE: string = env.DB_DATABASE || 'rudget';
  public readonly DB_HOST: string = env.DB_HOST || 'localhost';
  public readonly DB_PASS: string = env.DB_PASS || 'postgres';
  public readonly DB_USER: string = env.DB_USER || 'postgres';
  public readonly DB_PORT: number = env.DB_PORT
    ? parseInt(env.DB_PORT, 10)
    : 5432;

  public readonly JWT_SECRET: Buffer = env.JWT_SECRET
    ? Buffer.from(env.JWT_SECRET, 'hex')
    : crypto.randomBytes(32);

  public readonly HASH_ENCRYPTION_KEY: Buffer = env.HASH_ENCRYPTION_KEY
    ? Buffer.from(env.HASH_ENCRYPTION_KEY, 'hex')
    : crypto.randomBytes(32);
}

const config = new Config();

export default config;
