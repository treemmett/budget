import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
} from 'type-graphql';
import Account from '../entities/Account';
import BudgetController from '../controllers/BudgetController';
import { Context } from '.';
import DateScalar from './scalars/Date';
import HttpException from '../utils/HttpException';
import Transaction from '../entities/Transaction';
import TransactionCategory from '../entities/TransactionCategory';
import { getManager } from 'typeorm';
import requireAuth from '../utils/requireAuth';

@Resolver(() => Transaction)
export default class TransactionResolver {
  @FieldResolver()
  public async account(@Root() parent: Transaction): Promise<Account> {
    const account = await getManager()
      .createQueryBuilder(Account, 'account')
      .leftJoin('account.transactions', 'transaction')
      .where('transaction.id = :transactionId', { transactionId: parent.id })
      .getOne();

    if (!account) {
      throw new HttpException({
        error: 'invalid_request',
        message: 'No account found for transaction',
        status: 404,
      });
    }

    return account;
  }

  @FieldResolver()
  public async category(
    @Root() parent: Transaction
  ): Promise<TransactionCategory> {
    const category = await getManager()
      .createQueryBuilder(TransactionCategory, 'category')
      .leftJoin('category.transactions', 'transaction')
      .where('transaction.id = :transactionId', { transactionId: parent.id })
      .getOne();

    if (!category) {
      throw new HttpException({
        error: 'invalid_request',
        message: 'No category found for transaction',
        status: 404,
      });
    }

    return category;
  }

  @Mutation(() => Transaction)
  public async createTransaction(
    @Arg('amount') amount: number,
    @Arg('date', () => DateScalar) date: Date,
    @Arg('categoryId') categoryId: string,
    @Arg('accountId') accountId: string,
    @Arg('description') description: string,
    @Arg('budgetId') budgetId: string,
    @Ctx() ctx: Context
  ): Promise<Transaction> {
    const budget = await BudgetController.getBudgets(
      requireAuth(ctx),
      budgetId
    );
    return new BudgetController(budget).createTransaction(
      accountId,
      amount,
      categoryId,
      date,
      description
    );
  }
}
