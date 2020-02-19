import { Connection, createConnection, getManager } from 'typeorm';
import config from '../utils/config';
import path from 'path';

const { DEVELOPMENT, DB_DATABASE, DB_HOST, DB_PASS, DB_PORT, DB_USER } = config;

const createSqlConnection = (): Promise<Connection> =>
  createConnection({
    entities: [
      path.resolve(__dirname, '../entities/*.ts'),
      path.resolve(__dirname, '../entities/*.ts')
    ],
    type: 'postgres',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASS,
    database: DB_DATABASE,
    synchronize: DEVELOPMENT
  });

export async function purgeDatabase(): Promise<void> {
  await getManager().query('DELETE FROM users WHERE id IS NOT NULL');
}

export default createSqlConnection;
