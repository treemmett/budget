/* eslint-disable lines-between-class-members */
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const { env } = process;

class Config {
  public readonly JWT_SECRET: Buffer = crypto.randomBytes(32);

  public readonly NODE_ENV: 'production' | 'development' | 'testing' =
    'development';

  // postgres
  public readonly PG_DATABASE: string = 'budget';
  public readonly PG_HOST: string = 'localhost';
  public readonly PG_PASSWORD: string = '';
  public readonly PG_PORT: number = 5432;
  public readonly PG_USERNAME: string = 'postgres';

  public PORT: number = 3000;

  // avoid setting default values in the constructor
  // set defaults in the class definition above
  public constructor() {
    if (env.JWT_SECRET) {
      const buffer = Buffer.from(env.JWT_SECRET, 'base64');
      this.JWT_SECRET = buffer.length > 0 ? buffer : this.JWT_SECRET;
    }

    switch (env.NODE_ENV) {
      default:
        break;

      case 'prod':
      case 'production':
        this.NODE_ENV = 'production';
        break;

      case 'test':
      case 'testing':
      case 'qa':
        this.NODE_ENV = 'testing';
        break;
    }

    this.PG_DATABASE = env.PG_DATABASE ?? this.PG_DATABASE;
    this.PG_HOST = env.PG_HOST ?? this.PG_HOST;
    this.PG_PASSWORD = env.PG_PASSWORD ?? this.PG_PASSWORD;
    const pgPort = parseInt(env.PG_PORT ?? 'NaN', 10);
    this.PG_PORT = Number.isNaN(pgPort) ? this.PG_PORT : pgPort;
    this.PG_USERNAME = env.PG_USERNAME ?? this.PG_USERNAME;

    const port = parseInt(env.PORT ?? 'NaN', 10);
    this.PORT = Number.isNaN(port) ? this.PORT : port;
  }
}

const config = new Config();

export default config;
