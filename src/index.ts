import 'dotenv/config';
import 'reflect-metadata';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import { errors } from 'celebrate';
import express from 'express';
import genRouter from './routes';
import helmet from 'helmet';
import path from 'path';

const {
  DB_DATABASE,
  DB_HOST,
  DB_PASS,
  DB_PORT = '5432',
  DB_USER = 'postgres',
  PORT = '8080'
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
  .then(async () => {
    const app = express();
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(await genRouter());

    app.use(errors());

    const port = parseInt(PORT, 10);

    app.listen(port, () => console.log(`Rudget API running on port ${port}.`));
  })
  .catch(err => {
    console.error('Error while opening database connection.');
    console.error(err);
    process.exit(1);
  });
