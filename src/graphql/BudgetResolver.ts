import { Arg, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import Account from '../entities/Account';
import Budget from '../entities/Budget';
import BudgetController from '../controllers/BudgetController';
import HttpException from '../utils/HttpException';
import IncomeSource from '../entities/IncomeSource';
import TransactionCategory from '../entities/TransactionCategory';
import User from '../entities/User';
import { getManager } from 'typeorm';

@Resolver(() => Budget)
export default class BudgetResolver {
  @Query(() => Budget)
  public async budget(@Arg('id') id: string): Promise<Budget> {
    const user = await getManager().findOneOrFail(User, {
      email: 'tregan@tregan.me'
    });
    const budget = await BudgetController.openBudget(id, user);
    return budget.budget;
  }

  @Query(() => [Budget])
  public async budgets(): Promise<Budget[]> {
    const user = await getManager().findOneOrFail(User, {
      email: 'tregan@tregan.me'
    });
    return BudgetController.listBudgets(user);
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
}
