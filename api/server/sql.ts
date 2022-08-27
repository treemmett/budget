import { Connection, createConnection } from 'typeorm';
import config from '../utils/config';
import path from 'path';

const { PG_DATABASE, PG_HOST, PG_PASSWORD, PG_PORT, PG_USERNAME } = config;

interface Options {
  prefix?: string;
  suffix?: string;
  synchronize?: boolean;
  drop?: boolean;
}

export default function createSqlConnection(
  options?: Options
): Promise<Connection> {
  const { prefix, suffix, synchronize, drop } = options ?? {};

  if (drop && !(prefix || suffix)) {
    throw new Error('Attempt to drop primary database failed.');
  }

  return createConnection({
    database: `${prefix ?? ''}${PG_DATABASE}${suffix ?? ''}`,
    dropSchema: drop,
    entities: [
      path.join(__dirname, '../entities/!(*.test).ts'),
      path.join(__dirname, '../entities/!(*.test).js'),
    ],
    host: PG_HOST,
    password: PG_PASSWORD,
    port: PG_PORT,
    synchronize,
    type: 'postgres',
    username: PG_USERNAME,
  });
}
