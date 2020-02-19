import 'reflect-metadata';
import createSqlConnection, { purgeDatabase } from './src/server/sql';
import { Connection } from 'typeorm';

let conn: Connection;

beforeAll(async () => {
  conn = await createSqlConnection();
  await purgeDatabase();
});

afterAll(async () => {
  await conn.close();
});
