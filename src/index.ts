import 'reflect-metadata';
import bodyParser from 'body-parser';
import config from './utils/config';
import createSqlConnection from './server/sql';
import express from 'express';
import generateGQL from './graphql';
import helmet from 'helmet';
import logger from './utils/logger';

const { API_PORT } = config;

createSqlConnection()
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
