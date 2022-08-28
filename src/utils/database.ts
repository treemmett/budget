import { DataSource } from 'typeorm';
import type { ApiMiddleware } from './nc';
import BudgetGroup from '@entities/BudgetGroup';

export const AppDataSource = new DataSource({
  database: 'budget',
  entities: [BudgetGroup],
  host: 'localhost',
  logging: true,
  migrations: [],
  password: process.env.DB_PASSWORD,
  port: 5432,
  subscribers: [],
  synchronize: true,
  type: 'postgres',
  username: process.env.DB_USERNAME,
});

export const connectToDatabase: ApiMiddleware = async (req, res, next) => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  next();
};
