/* eslint-disable lines-between-class-members */
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const { env } = process;

class Config {
  // API specific settings
  public static readonly DEVELOPMENT: boolean = env.NODE_ENV !== 'production';
  public static readonly API_PORT: number = env.API_PORT
    ? parseInt(env.API_PORT, 10)
    : 8080;

  // Database settings
  public static readonly DB_DATABASE: string = env.DB_DATABASE || 'rudget';
  public static readonly DB_HOST: string = env.DB_HOST || 'localhost';
  public static readonly DB_PASS: string = env.DB_PASS || 'postgres';
  public static readonly DB_USER: string = env.DB_USER || 'postgres';
  public static readonly DB_PORT: number = env.DB_PORT
    ? parseInt(env.DB_PORT, 10)
    : 5432;

  // user authentication
  public static readonly JWT_SECRET: Buffer = env.JWT_SECRET
    ? Buffer.from(env.JWT_SECRET, 'base64')
    : crypto.randomBytes(32);
}

export default Config;
