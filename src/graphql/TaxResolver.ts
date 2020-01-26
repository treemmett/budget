import {
  Arg,
  Ctx,
  FieldResolver,
  Float,
  Mutation,
  Resolver,
  Root
} from 'type-graphql';
import Tax, { FilingStatus, State } from '../entities/Tax';
import Budget from '../entities/Budget';
import BudgetController from '../controllers/BudgetController';
import { Context } from '.';
import HttpException from '../utils/HttpException';
import { getManager } from 'typeorm';
import requireAuth from '../utils/requireAuth';

@Resolver(() => Tax)
export default class TaxResolver {
  @FieldResolver(() => Float)
  public async grossIncome(@Root() tax: Tax): Promise<number> {
    const budget = await getManager()
      .createQueryBuilder(Budget, 'budget')
      .leftJoin('budget.tax', 'tax')
      .where('tax.id = :id', { id: tax.id })
      .getOne();

    if (!budget) {
      throw new HttpException({
        error: 'invalid_request',
        message: 'No budget found for tax',
        status: 404
      });
    }

    return new BudgetController(budget).calculateIncome();
  }

  @FieldResolver(() => Float)
  public async incomeTax(): Promise<number> {
    // TODO
    return 100;
  }

  @FieldResolver(() => Float)
  public async netIncome(@Root() tax: Tax): Promise<number> {
    const [gross, incomeTax] = await Promise.all([
      this.grossIncome(tax),
      this.incomeTax()
    ]);

    return parseFloat((gross - incomeTax).toFixed(2));
  }

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
