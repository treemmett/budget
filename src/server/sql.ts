import { Connection, createConnection } from 'typeorm';
import config from '../utils/config';
import path from 'path';

const { DB_DATABASE, DB_HOST, DB_PASS, DB_PORT, DB_USER } = config;

interface Options {
  prefix?: string;
  suffix?: string;
  synchronize?: boolean;
  drop?: boolean;
}

export default function createSqlConnection(
  options?: Options
): Promise<Connection> {
  const { prefix, suffix, synchronize, drop } = options || {};

  if (drop && !(prefix || suffix)) {
    throw new Error('Attempt to drop primary database failed.');
  }

  return createConnection({
    entities: [
      path.resolve(__dirname, '../entities/*.ts'),
      path.resolve(__dirname, '../entities/*.js')
    ],
    type: 'postgres',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASS,
    database: `${prefix || ''}${DB_DATABASE}${suffix || ''}`,
    dropSchema: drop,
    synchronize
  });
}
