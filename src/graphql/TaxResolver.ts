import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import Tax, { FilingStatus, State } from '../entities/Tax';
import BudgetController from '../controllers/BudgetController';
import { Context } from '.';
import requireAuth from '../utils/requireAuth';

@Resolver(() => Tax)
export default class TaxResolver {
  @Mutation(() => Tax)
  public async setTax(
    @Arg('budgetId') budgetId: string,
    @Ctx() ctx: Context,
    @Arg('state', () => State, { nullable: true }) state?: State,
    @Arg('status', () => FilingStatus, { nullable: true })
    status?: FilingStatus
  ): Promise<Tax> {
    const budget = await BudgetController.getBudgets(
      requireAuth(ctx),
      budgetId
    );

    return new BudgetController(budget).setTax({ state, status });
  }
}
