import { Arg, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import Budget from '../entities/Budget';
import BudgetController from '../controllers/BudgetController';
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

  @FieldResolver(() => [TransactionCategory])
  public async category(
    @Root() budget: Budget
  ): Promise<TransactionCategory[]> {
    const user = await getManager().findOneOrFail(User, {
      email: 'tregan@tregan.me'
    });
    const controller = await BudgetController.openBudget(budget.id, user);
    return controller.budget.categories;
  }
}
