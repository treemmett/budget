import Account, { AccountType } from '../entities/Account';
import Budget from '../entities/Budget';
import HttpException from '../utils/HttpException';
import TransactionCategory from '../entities/TransactionCategory';
import User from '../entities/User';
import { getManager } from 'typeorm';

export default class BudgetController {
  public budget: Budget;

  public constructor(budget: Budget) {
    this.budget = budget;
  }

  public static async createBudget(name: string, user: User): Promise<Budget> {
    const budget = new Budget();
    budget.name = name;
    budget.user = user;
    await getManager().save(budget);

    const defaultCategories = [
      'Housing',
      'Transportation',
      'Food',
      'Personal Care',
      'Quality of Life'
    ];

    const ctrl = new BudgetController(budget);

    await Promise.all(
      defaultCategories.map(category => ctrl.createCategory(category))
    );

    return budget;
  }

  public static async getBudgets(user: User): Promise<Budget[]>;
  public static async getBudgets(user: User, id: string): Promise<Budget>;
  public static async getBudgets(
    user: User,
    id?: string
  ): Promise<Budget | Budget[]> {
    const query = getManager()
      .createQueryBuilder(Budget, 'budget')
      .leftJoin('budget.user', 'user')
      .where('user.id = :userId', { userId: user.id });

    const budget = id
      ? await query.andWhere('budget.id = :budgetId', { budgetId: id }).getOne()
      : await query.getMany();

    if (!budget) {
      throw new HttpException({
        error: 'invalid_request',
        message: 'Budget not found',
        status: 404
      });
    }

    return budget;
  }

  // accounts
  public async createAccount(
    name: string,
    type: AccountType
  ): Promise<Account> {
    const account = new Account();
    account.budget = this.budget;
    account.name = name;
    account.type = type;
    await getManager().save(account);
    return account;
  }

  public async getAccounts(): Promise<Account[]>;
  public async getAccounts(id: string): Promise<Account>;
  public async getAccounts(id?: string): Promise<Account | Account[]> {
    const query = getManager()
      .createQueryBuilder(Account, 'account')
      .leftJoin('account.budget', 'budget')
      .where('budget.id = :budgetId', { budgetId: this.budget.id });

    const account = id
      ? await query
          .andWhere('account.id = :accountId', { accountId: id })
          .getOne()
      : await query.getMany();

    if (!account) {
      throw new HttpException({
        error: 'invalid_request',
        message: 'Account not found',
        status: 404
      });
    }

    return account;
  }

  // categories
  public async createCategory(name: string): Promise<TransactionCategory> {
    const category = new TransactionCategory();
    category.name = name;
    category.budget = this.budget;
    await getManager().save(category);
    return category;
  }

  public async getCategories(): Promise<TransactionCategory[]>;
  public async getCategories(id: string): Promise<TransactionCategory>;
  public async getCategories(
    id?: string
  ): Promise<TransactionCategory | TransactionCategory[]> {
    const query = getManager()
      .createQueryBuilder(TransactionCategory, 'category')
      .leftJoin('category.budget', 'budget')
      .where('budget.id = :budgetId', { budgetId: this.budget.id });

    const category = id
      ? await query
          .andWhere('category.id = :categoryId', { categoryId: id })
          .getOne()
      : await query.getMany();

    if (!category) {
      throw new HttpException({
        error: 'invalid_request',
        message: 'Category not found',
        status: 404
      });
    }

    return category;
  }
}
