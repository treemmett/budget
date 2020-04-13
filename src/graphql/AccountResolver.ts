import Account, { AccountType } from '../entities/Account';
import {
  Arg,
  Ctx,
  FieldResolver,
  ID,
  Mutation,
  Resolver,
  Root,
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
        message: 'Budget not found.',
        status: 404,
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
    @Arg('budgetId', () => ID) budgetId: string,
    @Ctx() ctx: Context
  ): Promise<Account> {
    const budget = await BudgetController.getBudgets(
      requireAuth(ctx),
      budgetId
    );

    return new BudgetController(budget).createAccount(name, type);
  }

  @Mutation(() => Boolean)
  public async deleteAccount(
    @Arg('id', () => ID) id: string,
    @Arg('budgetId', () => ID) budgetId: string,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    const budget = await BudgetController.getBudgets(
      requireAuth(ctx),
      budgetId
    );

    return new BudgetController(budget).deleteAccount(id);
  }

  @Mutation(() => Account)
  public async updateAccount(
    @Arg('id', () => ID) id: string,
    @Arg('budgetId', () => ID) budgetId: string,
    @Ctx() ctx: Context,
    @Arg('name', { nullable: true }) name?: string,
    @Arg('type', () => AccountType, { nullable: true }) type?: AccountType
  ): Promise<Account> {
    const budget = await BudgetController.getBudgets(
      requireAuth(ctx),
      budgetId
    );
    return new BudgetController(budget).updateAccount(id, name, type);
  }
}
