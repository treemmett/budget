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
import CategoryGroup from '../entities/CategoryGroup';
import { Context } from '.';
import DateScalar from './scalars/Date';
import IncomeSource from '../entities/IncomeSource';
import Tax from '../entities/Tax';
import Transaction from '../entities/Transaction';
import TransactionCategory from '../entities/TransactionCategory';
import User from '../entities/User';
import requireAuth from '../utils/requireAuth';

@Resolver(() => Budget)
export default class BudgetResolver {
  @Query(() => Budget)
  public budget(@Arg('id') id: string, @Ctx() ctx: Context): Promise<Budget> {
    return BudgetController.getBudgets(requireAuth(ctx), id);
  }

  @Query(() => [Budget])
  public budgets(@Ctx() ctx: Context): Promise<Budget[]> {
    return BudgetController.getBudgets(requireAuth(ctx));
  }

  @FieldResolver(() => [Account])
  public accounts(@Root() parent: Budget): Promise<Account[]> {
    return new BudgetController(parent).getAccounts();
  }

  @FieldResolver(() => Account)
  public account(
    @Root() parent: Budget,
    @Arg('id') id: string
  ): Promise<Account> {
    return new BudgetController(parent).getAccounts(id);
  }

  @FieldResolver(() => [TransactionCategory])
  public categories(@Root() parent: Budget): Promise<TransactionCategory[]> {
    return new BudgetController(parent).getCategories();
  }

  @FieldResolver(() => TransactionCategory)
  public category(
    @Root() parent: Budget,
    @Arg('id') id: string
  ): Promise<TransactionCategory> {
    return new BudgetController(parent).getCategories(id);
  }

  @FieldResolver(() => [CategoryGroup])
  public categoryGroups(@Root() parent: Budget): Promise<CategoryGroup[]> {
    return new BudgetController(parent).getCategoryGroups();
  }

  @FieldResolver(() => [IncomeSource])
  public incomeSources(@Root() parent: Budget): Promise<IncomeSource[]> {
    return new BudgetController(parent).getIncomeSource();
  }

  @FieldResolver(() => IncomeSource)
  public incomeSource(
    @Root() parent: Budget,
    @Arg('id') id: string
  ): Promise<IncomeSource> {
    return new BudgetController(parent).getIncomeSource(id);
  }

  @FieldResolver(() => Tax)
  public tax(@Root() parent: Budget): Promise<Tax> {
    return new BudgetController(parent).getTax();
  }

  @FieldResolver(() => [Transaction])
  public transactions(
    @Root() parent: Budget,
    @Arg('accountId', { nullable: true }) accountId?: string,
    @Arg('categoryId', { nullable: true }) categoryId?: string,
    @Arg('from', () => DateScalar, {
      defaultValue: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
      ),
      description:
        'Minimum date of the transactions. Defaults to the first day of the current month. Cannot be more than 366 days less than "to".'
    })
    from?: Date,
    @Arg('to', () => DateScalar, {
      defaultValue: new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
      ),
      description:
        'Maximum date of the transactions. Defaults to the last day of the current month. Cannot be more than 366 days more than "from".'
    })
    to?: Date
  ): Promise<Transaction[]> {
    return new BudgetController(parent).getTransactions({
      accountId,
      categoryId,
      from,
      to
    });
  }

  @FieldResolver(() => User)
  public user(@Root() parent: Budget): Promise<User> {
    return new BudgetController(parent).getUser();
  }

  @Mutation(() => Budget)
  public async createBudget(
    @Arg('name') name: string,
    @Ctx() ctx: Context
  ): Promise<Budget> {
    const budget = await BudgetController.createBudget(name, requireAuth(ctx));

    return budget;
  }

  @Mutation(() => Budget)
  public async renameBudget(
    @Arg('name') name: string,
    @Arg('id') id: string,
    @Ctx() ctx: Context
  ): Promise<Budget> {
    const budget = await BudgetController.getBudgets(requireAuth(ctx), id);
    return new BudgetController(budget).renameBudget(name);
  }
}
