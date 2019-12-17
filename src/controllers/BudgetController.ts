import Budget from '../entities/Budget';
import TransactionCategory from '../entities/TransactionCategory';
import User from '../entities/User';
import { getManager } from 'typeorm';

export default class BudgetController {
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

    await Promise.all(
      defaultCategories.map(category =>
        BudgetController.createCategory(category, budget)
      )
    );

    return budget;
  }

  public static async createCategory(
    name: string,
    budget: Budget
  ): Promise<TransactionCategory> {
    const category = new TransactionCategory();
    category.name = name;
    category.budget = budget;
    await getManager().save(category);
    return category;
  }
}
