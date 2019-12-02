import 'dotenv/config';
import 'reflect-metadata';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import express from 'express';
import generateGQL from './graphql';
import helmet from 'helmet';
import logger from './utils/logger';
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
  entities: [
    path.resolve(__dirname, 'entities/*.ts'),
    path.resolve(__dirname, 'entities/*.js')
  ],
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

    const gql = await generateGQL();
    gql.applyMiddleware({ app });

    const port = parseInt(PORT, 10);

    app.listen(port, () => logger.info(`API is up on port: ${port}`));
  })
  .catch(err => {
    logger.error('Error occurred while starting API.');
    // eslint-disable-next-line no-console
    console.log(err);
    process.exit(1);
  });
