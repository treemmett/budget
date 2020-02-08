import Account, { AccountType } from '../entities/Account';
import IncomeSource, { PayScale } from '../entities/IncomeSource';
import Tax, { FilingStatus, State } from '../entities/Tax';
import Allocation from '../entities/Allocation';
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

  // allocations
  public async setAllocation(
    categoryId: string,
    date: Date,
    amount: number
  ): Promise<Allocation> {
    // ensure date is set to the first
    date.setDate(1);

    const allocation = await this.getAllocation(categoryId, date);

    allocation.amount = parseFloat(amount.toFixed(2));

    await getManager().save(allocation);
    return allocation;
  }

  public async getAllocation(
    categoryId: string,
    date: Date
  ): Promise<Allocation> {
    const foundAllocation = await getManager()
      .createQueryBuilder(Allocation, 'allocation')
      .leftJoin('allocation.category', 'category')
      .leftJoin('category.budget', 'budget')
      .where('category.id = :categoryId', { categoryId })
      .andWhere('budget.id = :budgetId', { budgetId: this.budget.id })
      .andWhere('EXTRACT(YEAR FROM allocation.date) = :year', {
        year: date.getFullYear()
      })
      .andWhere('EXTRACT(MONTH FROM allocation.date) = :month', {
        month: date.getMonth() + 1
      })
      .getOne();

    if (foundAllocation) {
      return foundAllocation;
    }

    const fauxAllocation = new Allocation();
    fauxAllocation.date = date;
    fauxAllocation.category = await this.getCategories(categoryId);
    fauxAllocation.amount = 0;

    return fauxAllocation;
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

  // income source
  public async createIncomeSource(
    name: string,
    rate: number,
    scale: PayScale,
    hours?: number
  ): Promise<IncomeSource> {
    const incomeSource = new IncomeSource();
    incomeSource.budget = this.budget;
    incomeSource.name = name;
    incomeSource.rate = rate;
    incomeSource.scale = scale;
    incomeSource.hours = hours;
    await getManager().save(incomeSource);
    return incomeSource;
  }

  public async deleteIncomeSource(id: string): Promise<boolean> {
    const incomeSource = await this.getIncomeSource(id);
    await getManager().remove(incomeSource);
    return true;
  }

  public async getIncomeSource(): Promise<IncomeSource[]>;
  public async getIncomeSource(id: string): Promise<IncomeSource>;
  public async getIncomeSource(
    id?: string
  ): Promise<IncomeSource[] | IncomeSource> {
    const query = getManager()
      .createQueryBuilder(IncomeSource, 'incomeSource')
      .leftJoin('incomeSource.budget', 'budget')
      .where('budget.id = :budgetId', { budgetId: this.budget.id });

    const incomeSource = id
      ? await query
          .andWhere('incomeSource.id = :incomeId', { incomeId: id })
          .getOne()
      : await query.getMany();

    if (!incomeSource) {
      throw new HttpException({
        error: 'invalid_request',
        message: 'Income source not found',
        status: 404
      });
    }

    return incomeSource;
  }

  public async calculateIncome(incomeSourceId?: string): Promise<number> {
    function parseIncomeSource(source: IncomeSource): number {
      switch (PayScale[source.scale]) {
        case 'yearly':
          return source.rate;

        case 'monthly':
          return source.rate * 12;

        case 'weekly':
          return source.rate * 52;

        case 'hourly':
          if (!source.hours) {
            return 0;
          }
          return source.rate * 52 * source.hours;

        default:
          return 0;
      }
    }

    if (incomeSourceId) {
      const incomeSource = await this.getIncomeSource(incomeSourceId);

      return parseIncomeSource(incomeSource);
    }

    const incomeSources = await this.getIncomeSource();

    return incomeSources.reduce((acc, cur) => {
      switch (PayScale[cur.scale]) {
        case 'yearly':
          return acc + cur.rate;

        case 'monthly':
          return acc + cur.rate * 12;

        case 'weekly':
          return acc + cur.rate * 52;

        case 'hourly':
          if (!cur.hours) {
            return acc;
          }
          return acc + cur.rate * 52 * cur.hours;

        default:
          return acc;
      }
    }, 0);
  }

  // tax
  public async getTax(): Promise<Tax> {
    const tax = await getManager()
      .createQueryBuilder(Tax, 'tax')
      .leftJoin('tax.budget', 'budget')
      .where('budget.id = :id', { id: this.budget.id })
      .getOne();

    if (tax) {
      return tax;
    }

    // if no tax data is saved yet, create one
    const newTax = new Tax();
    newTax.budget = this.budget;
    newTax.state = State.Alabama;
    newTax.status = FilingStatus.single;
    await getManager().save(newTax);
    return newTax;
  }

  public async setTax({
    state,
    status
  }: {
    state?: State;
    status?: FilingStatus;
  }): Promise<Tax> {
    const tax = await this.getTax();
    tax.state = state || tax.state;
    tax.status = status || tax.status;
    await getManager().save(tax);
    return tax;
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
