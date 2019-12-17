import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root
} from 'type-graphql';
import Account from '../entities/Account';
import Budget from '../entities/Budget';
import BudgetController from '../controllers/BudgetController';
import { Context } from '.';
import HttpException from '../utils/HttpException';
import IncomeSource from '../entities/IncomeSource';
import TransactionCategory from '../entities/TransactionCategory';
import User from '../entities/User';
import { getManager } from 'typeorm';
import requireAuth from '../utils/requireAuth';

@Resolver(() => Budget)
export default class BudgetResolver {
  @Query(() => Budget)
  public async budget(
    @Arg('id') id: string,
    @Ctx() ctx: Context
  ): Promise<Budget> {
    const budget = await getManager()
      .createQueryBuilder(Budget, 'budget')
      .leftJoin('budget.user', 'user')
      .where('user.id = :userId', { userId: requireAuth(ctx).id })
      .andWhere('budget.id = :budgetId', { budgetId: id })
      .getOne();

    if (!budget) {
      throw new HttpException({
        error: 'invalid_request',
        message: 'Budget not found.',
        status: 404
      });
    }

    return budget;
  }

  @Query(() => [Budget])
  public async budgets(@Ctx() ctx: Context): Promise<Budget[]> {
    return getManager()
      .createQueryBuilder(Budget, 'budget')
      .leftJoin('budget.user', 'user')
      .where('user.id = :userId', { userId: requireAuth(ctx).id })
      .getMany();
  }

  @FieldResolver(() => [Account])
  public accounts(@Root() parent: Budget): Promise<Account[]> {
    return getManager()
      .createQueryBuilder(Account, 'account')
      .leftJoin('account.budget', 'budget')
      .where('budget.id = :budgetId', { budgetId: parent.id })
      .getMany();
  }

  @FieldResolver(() => [TransactionCategory])
  public categories(@Root() parent: Budget): Promise<TransactionCategory[]> {
    return getManager()
      .createQueryBuilder(TransactionCategory, 'category')
      .leftJoin('category.budget', 'budget')
      .where('budget.id = :budgetId', { budgetId: parent.id })
      .getMany();
  }

  @FieldResolver(() => [IncomeSource])
  public incomes(@Root() parent: Budget): Promise<IncomeSource[]> {
    return getManager()
      .createQueryBuilder(IncomeSource, 'income')
      .leftJoin('income.budget', 'budget')
      .where('budget.id = :budgetId', { budgetId: parent.id })
      .getMany();
  }

  @FieldResolver(() => User)
  public async user(@Root() parent: Budget): Promise<User> {
    const budget = await getManager()
      .createQueryBuilder(Budget, 'budget')
      .leftJoinAndSelect('budget.user', 'user')
      .where('budget.id = :budgetId', { budgetId: parent.id })
      .getOne();

    if (!budget) {
      throw new HttpException({
        error: 'invalid_request',
        status: 404,
        message: 'Budget not found.'
      });
    }

    return budget.user;
  }

  @Mutation(() => Budget)
  public async createBudget(
    @Arg('name') name: string,
    @Ctx() ctx: Context
  ): Promise<Budget> {
    const budget = await BudgetController.createBudget(name, requireAuth(ctx));

    return budget;
  }
}
