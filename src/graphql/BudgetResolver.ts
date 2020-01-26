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
import IncomeSource from '../entities/IncomeSource';
import Tax from '../entities/Tax';
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

  @FieldResolver(() => [IncomeSource])
  public incomes(@Root() parent: Budget): Promise<IncomeSource[]> {
    return new BudgetController(parent).getIncomes();
  }

  @FieldResolver(() => IncomeSource)
  public income(
    @Root() parent: Budget,
    @Arg('id') id: string
  ): Promise<IncomeSource> {
    return new BudgetController(parent).getIncomes(id);
  }

  @FieldResolver(() => Tax)
  public tax(@Root() parent: Budget): Promise<Tax> {
    return new BudgetController(parent).getTax();
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
}
