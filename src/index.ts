/* eslint-disable sort-imports */
/* eslint-disable import/first */
import dotenv from 'dotenv';

dotenv.config();

import { createConnection } from 'typeorm';
import path from 'path';

const {
  DB_DATABASE,
  DB_HOST,
  DB_PASS,
  DB_PORT = '5432',
  DB_USER = 'postgres'
} = process.env;

createConnection({
  entities: [path.resolve(__dirname, 'entities/*.ts')],
  type: 'postgres',
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  username: DB_USER,
  password: DB_PASS,
  database: DB_DATABASE,
  synchronize: process.env.NODE_ENV === 'development'
})
  .then(() => {
    console.log('Database connected.');
  })
  .catch(err => {
    console.error('Error while opening database connection.');
    console.error(err);
    process.exit(1);
  });
