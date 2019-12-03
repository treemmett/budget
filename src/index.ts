import 'reflect-metadata';
import bodyParser from 'body-parser';
import config from './utils/config';
import { createConnection } from 'typeorm';
import express from 'express';
import generateGQL from './graphql';
import helmet from 'helmet';
import logger from './utils/logger';
import path from 'path';

const {
  API_PORT,
  DEVELOPMENT,
  DB_DATABASE,
  DB_HOST,
  DB_PASS,
  DB_PORT,
  DB_USER
} = config;

createConnection({
  entities: [
    path.resolve(__dirname, 'entities/*.ts'),
    path.resolve(__dirname, 'entities/*.js')
  ],
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASS,
  database: DB_DATABASE,
  synchronize: DEVELOPMENT
})
  .then(async () => {
    const app = express();
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    const gql = await generateGQL();
    gql.applyMiddleware({ app });

    app.listen(API_PORT, () => logger.info(`API is up on port: ${API_PORT}`));
  })
  .catch(err => {
    logger.error('Error occurred while starting API.');
    // eslint-disable-next-line no-console
    console.log(err);
    process.exit(1);
  });
