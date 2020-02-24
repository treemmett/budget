import 'reflect-metadata';
import { Connection } from 'typeorm';
import createSqlConnection from '../server/sql';

let conn: Connection;

beforeAll(async () => {
  conn = await createSqlConnection({ suffix: '-test' });
});

afterAll(async () => {
  await conn.close();
});
