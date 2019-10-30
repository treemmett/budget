import Budget from '../entities/Budget';
import HttpException from '../utils/HttpException';
import Transaction from '../entities/Transaction';
import TransactionCategory from '../entities/TransactionCategory';
import User from '../entities/User';
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
    user: User,
    name: string
  ): Promise<BudgetController> {
    const budget = getManager().create(Budget, {
      user,
      name
    });

    await getManager().save(Budget, budget);

    return new BudgetController(budget);
  }

  public static listBudgets(user: User): Promise<Budget[]> {
    return getManager()
      .createQueryBuilder(Budget, 'budget')
      .leftJoin('budget.user', 'user')
      .where('user.id = :userId', { userId: user.id })
      .getMany();
  }

  public static async openBudget(
    budgetId: string,
    user: User
  ): Promise<BudgetController> {
    const budget = await getManager()
      .createQueryBuilder(Budget, 'budget')
      .leftJoin('budget.user', 'user')
      .leftJoinAndSelect('budget.categories', 'categories')
      .where('user.id = :userId', { userId: user.id })
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
}
