import Budget from '../entities/Budget';
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

  public getBudgetDetails(): BudgetDetails {
    return {
      id: this.budget.id,
      name: this.budget.name
    };
  }
}
