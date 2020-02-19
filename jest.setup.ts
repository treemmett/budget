import 'reflect-metadata';
import createSqlConnection, { purgeDatabase } from './src/server/sql';
import { getConnection } from 'typeorm';

beforeAll(async () => {
  await createSqlConnection();
});

beforeEach(async () => {
  await purgeDatabase();
});

afterAll(async () => {
  await getConnection().close();
});
