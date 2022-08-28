import { DataSource } from 'typeorm';
import type { ApiMiddleware } from './nc';
import BudgetCategory from '@entities/BudgetCategory';
import BudgetGroup from '@entities/BudgetGroup';

export const AppDataSource = new DataSource({
  database: 'budget',
  entities: [BudgetGroup, BudgetCategory],
  host: 'localhost',
  migrations: [],
  password: process.env.DB_PASSWORD,
  port: 5432,
  subscribers: [],
  synchronize: true,
  type: 'postgres',
  username: process.env.DB_USERNAME,
});

AppDataSource.initialize();

export const connectToDatabase: ApiMiddleware = async (req, res, next) => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  next();
};
