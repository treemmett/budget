import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Resolver,
  Root
} from 'type-graphql';
import Budget from '../entities/Budget';
import BudgetController from '../controllers/BudgetController';
import { Context } from '.';
import HttpException from '../utils/HttpException';
import Transaction from '../entities/Transaction';
import TransactionCategory from '../entities/TransactionCategory';
import { getManager } from 'typeorm';
import requireAuth from '../utils/requireAuth';

@Resolver(() => TransactionCategory)
export default class CategoryResolver {
  @FieldResolver()
  public async budget(@Root() parent: TransactionCategory): Promise<Budget> {
    const budget = await getManager()
      .createQueryBuilder(Budget, 'budget')
      .leftJoin('budget.categories', 'category')
      .where('category.id = :categoryId', { categoryId: parent.id })
      .getOne();

    if (!budget) {
      throw new HttpException({
        error: 'invalid_request',
        message: 'No budget found for category',
        status: 404
      });
    }

    return budget;
  }

  @FieldResolver()
  public async transactions(
    @Root() parent: TransactionCategory
  ): Promise<Transaction[]> {
    return getManager()
      .createQueryBuilder(Transaction, 'transaction')
      .leftJoin('transaction.category', 'category')
      .where('category.id = :categoryId', { categoryId: parent.id })
      .getMany();
  }

  @Mutation(() => TransactionCategory)
  public async createCategory(
    @Arg('name') name: string,
    @Arg('budgetId') budgetId: string,
    @Ctx() ctx: Context
  ): Promise<TransactionCategory> {
    const budget = await BudgetController.getBudgets(
      requireAuth(ctx),
      budgetId
    );

    const controller = new BudgetController(budget);

    const transaction = await controller.createCategory(name);

    return transaction;
  }
}
