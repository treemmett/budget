import Account, { AccountType } from '../entities/Account';
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
import { getManager } from 'typeorm';
import requireAuth from '../utils/requireAuth';

@Resolver(() => Account)
export default class AccountResolver {
  @FieldResolver(() => Budget)
  public async budget(@Root() parent: Budget): Promise<Budget> {
    const budget = await getManager()
      .createQueryBuilder(Budget, 'budget')
      .leftJoin('budget.accounts', 'account')
      .where('account.id = :accountId', { accountId: parent.id })
      .getOne();

    if (!budget) {
      throw new HttpException({
        error: 'invalid_request',
        status: 404,
        message: 'Budget not found.'
      });
    }

    return budget;
  }

  @FieldResolver(() => [Transaction])
  public transactions(@Root() parent: Account): Promise<Transaction[]> {
    return getManager()
      .createQueryBuilder(Transaction, 'transaction')
      .leftJoin('transaction.account', 'account')
      .where('account.id = :accountId', { accountId: parent.id })
      .getMany();
  }

  @Mutation(() => Account)
  public async createAccount(
    @Arg('name') name: string,
    @Arg('type', () => AccountType) type: AccountType,
    @Arg('budgetId') budgetId: string,
    @Ctx() ctx: Context
  ): Promise<Account> {
    const budget = await BudgetController.getBudgets(
      requireAuth(ctx),
      budgetId
    );

    return new BudgetController(budget).createAccount(name, type);
  }
}
