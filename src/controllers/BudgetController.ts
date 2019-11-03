import Account, { AccountType } from '../entities/Account';
import Budget from '../entities/Budget';
import HttpException from '../utils/HttpException';
import Transaction from '../entities/Transaction';
import TransactionCategory from '../entities/TransactionCategory';
import User from '../entities/User';
import UserController from './UserController';
import { getManager } from 'typeorm';

export interface BudgetDetails {
  id: string;
  name: string;
}

export interface CategoryDetails extends BudgetDetails {
  budget: string;
}

export default class BudgetController {
  public budget: Budget;

  private constructor(budget: Budget) {
    this.budget = budget;
  }

  public static async createBudget(
    user: User | UserController,
    name: string
  ): Promise<BudgetController> {
    const u = user instanceof User ? user : user.user;

    const budget = getManager().create(Budget, {
      user: u,
      name
    });

    await getManager().save(Budget, budget);

    return new BudgetController(budget);
  }

  public static listBudgets(user: User | UserController): Promise<Budget[]> {
    const userId = user instanceof User ? user.id : user.user.id;

    return getManager()
      .createQueryBuilder(Budget, 'budget')
      .leftJoin('budget.user', 'user')
      .where('user.id = :userId', { userId })
      .getMany();
  }

  public static async openBudget(
    budgetId: string,
    user: User | UserController
  ): Promise<BudgetController> {
    const userId = user instanceof User ? user.id : user.user.id;

    const budget = await getManager()
      .createQueryBuilder(Budget, 'budget')
      .leftJoin('budget.user', 'user')
      .leftJoinAndSelect('budget.categories', 'categories')
      .leftJoinAndSelect('budget.accounts', 'accounts')
      .where('user.id = :userId', { userId })
      .andWhere('budget.id = :budgetId', { budgetId })
      .getOne();

    if (!budget) {
      throw new HttpException({
        error: 'invalid_request',
        message: 'Budget not found.',
        status: 404
      });
    }

    return new BudgetController(budget);
  }

  public async createAccount(
    name: string,
    type: AccountType
  ): Promise<Account> {
    const account = getManager().create(Account, {
      budget: this.budget,
      name,
      type
    });

    await getManager().save(Account, account);

    return account;
  }

  public async createCateogry(name: string): Promise<TransactionCategory> {
    const category = getManager().create(TransactionCategory, {
      name,
      budget: this.budget
    });

    await getManager().save(TransactionCategory, category);

    this.budget.categories.push(category);

    return category;
  }

  public async createTransaction(
    description: string,
    date: string,
    categoryId: string,
    amount: number
  ): Promise<Transaction> {
    const category = this.getCategory(categoryId);
    const transaction = getManager().create(Transaction, {
      amount,
      category,
      date: date.substr(0, 10),
      description
    });
    await getManager().save(Transaction, transaction);
    return transaction;
  }

  public getAccounts(): { name: string; id: string; type: string }[] {
    return this.budget.accounts.map(a => a.getDetails());
  }

  public getBudgetDetails(): BudgetDetails {
    return {
      id: this.budget.id,
      name: this.budget.name
    };
  }

  public getCategories(): CategoryDetails[] {
    return this.budget.categories.map(c => ({
      budget: this.budget.id,
      id: c.id,
      name: c.name
    }));
  }

  public getCategory(categoryId: string): TransactionCategory {
    const category = this.budget.categories.find(c => c.id === categoryId);

    if (!category) {
      throw new HttpException({
        error: 'invalid_request',
        message: 'Category not found.',
        status: 404
      });
    }

    return category;
  }

  public getCategoryDetails(categoryId: string): CategoryDetails {
    const category = this.getCategory(categoryId);

    return {
      id: category.id,
      name: category.name,
      budget: category.budget.id
    };
  }

  public getTransactions(year: number, month: number): Promise<Transaction[]> {
    if (month < 1 || month > 12 || year.toString().length !== 4) {
      throw new HttpException({
        error: 'invalid_request',
        message: 'Invalid date provided.',
        status: 400
      });
    }

    // create from date
    const fromDate = new Date();
    fromDate.setUTCFullYear(year);
    fromDate.setUTCMonth(month - 1);
    fromDate.setUTCDate(1);
    fromDate.setUTCHours(0);
    fromDate.setUTCMinutes(0);
    fromDate.setUTCSeconds(0);
    fromDate.setUTCMilliseconds(0);

    // create to date
    const toDate = new Date(fromDate.toISOString());
    toDate.setUTCMonth(month);

    return getManager()
      .createQueryBuilder(Transaction, 'transaction')
      .leftJoinAndSelect('transaction.category', 'category')
      .leftJoin('category.budget', 'budget')
      .orderBy('transaction.date')
      .addOrderBy('transaction.description')
      .where('budget.id = :budgetId', { budgetId: this.budget.id })
      .andWhere('transaction.date >= :fromDate', {
        fromDate: fromDate.toISOString().substr(0, 10)
      })
      .andWhere('transaction.date < :toDate', {
        toDate: toDate.toISOString().substr(0, 10)
      })
      .getMany();
  }
}
