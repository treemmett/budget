import Budget from '../entities/Budget';
import HttpException from '../utils/HttpException';
import User from '../entities/User';
import { getManager } from 'typeorm';

export interface BudgetDetails {
  id: string;
  name: string;
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

  public getBudgetDetails(): BudgetDetails {
    return {
      id: this.budget.id,
      name: this.budget.name
    };
  }
}
