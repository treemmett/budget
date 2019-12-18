import Account, { AccountType } from '../entities/Account';
import IncomeSource, { PayScale } from '../entities/IncomeSource';
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

  public async deleteAccount(id: string): Promise<boolean> {
    const account = await this.getAccounts(id);
    await getManager().remove(account);
    return true;
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

  public async deleteCategory(id: string): Promise<boolean> {
    const category = await this.getCategories(id);
    await getManager().remove(category);
    return true;
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

  // incomes
  public async createIncome(
    name: string,
    rate: number,
    scale: PayScale,
    hours?: number
  ): Promise<IncomeSource> {
    const income = new IncomeSource();
    income.budget = this.budget;
    income.name = name;
    income.rate = rate;
    income.scale = scale;
    income.hours = hours;
    await getManager().save(income);
    return income;
  }

  public async deleteIncome(id: string): Promise<boolean> {
    const income = await this.getIncomes(id);
    await getManager().remove(income);
    return true;
  }

  public async getIncomes(): Promise<IncomeSource[]>;
  public async getIncomes(id: string): Promise<IncomeSource>;
  public async getIncomes(id?: string): Promise<IncomeSource[] | IncomeSource> {
    const query = getManager()
      .createQueryBuilder(IncomeSource, 'income')
      .leftJoin('income.budget', 'budget')
      .where('budget.id = :budgetId', { budgetId: this.budget.id });

    const income = id
      ? await query.andWhere('income.id = :incomeId', { incomeId: id }).getOne()
      : await query.getMany();

    if (!income) {
      throw new HttpException({
        error: 'invalid_request',
        message: 'Income not found',
        status: 404
      });
    }

    return income;
  }

  // user management
  public async getUser(): Promise<User> {
    const budget = await getManager()
      .createQueryBuilder(Budget, 'budget')
      .leftJoinAndSelect('budget.user', 'user')
      .where('budget.id = :budgetId', { budgetId: this.budget.id })
      .getOne();

    if (!budget) {
      throw new HttpException({
        error: 'invalid_request',
        message: 'Budget not found',
        status: 404
      });
    }

    return budget.user;
  }
}
