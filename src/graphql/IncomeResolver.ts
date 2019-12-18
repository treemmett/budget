import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Resolver,
  Root
} from 'type-graphql';
import IncomeSource, { PayScale } from '../entities/IncomeSource';
import Budget from '../entities/Budget';
import BudgetController from '../controllers/BudgetController';
import { Context } from '.';
import HttpException from '../utils/HttpException';
import { getManager } from 'typeorm';
import requireAuth from '../utils/requireAuth';

@Resolver(() => IncomeSource)
export default class IncomeResolver {
  @FieldResolver(() => Budget)
  public async budget(@Root() parent: IncomeSource): Promise<Budget> {
    const budget = await getManager()
      .createQueryBuilder(Budget, 'budget')
      .leftJoin('budget.incomes', 'income')
      .where('income.id = :incomeId', { incomeId: parent.id })
      .getOne();

    if (!budget) {
      throw new HttpException({
        error: 'invalid_request',
        status: 404,
        message: 'Budget not found.'
      });
    }

    return budget;
  }

  @Mutation(() => IncomeSource)
  public async createIncome(
    @Arg('name') name: string,
    @Arg('rate', () => Int) rate: number,
    @Arg('scale', () => PayScale) scale: PayScale,
    @Arg('budgetId') budgetId: string,
    @Arg('hours') hours: number,
    @Ctx() ctx: Context
  ): Promise<IncomeSource> {
    const budget = await BudgetController.getBudgets(
      requireAuth(ctx),
      budgetId
    );

    return new BudgetController(budget).createIncome(name, rate, scale, hours);
  }

  @Mutation(() => Boolean)
  public async deleteIncome(
    @Arg('id') id: string,
    @Arg('budgetId') budgetId: string,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    const budget = await BudgetController.getBudgets(
      requireAuth(ctx),
      budgetId
    );
    return new BudgetController(budget).deleteIncome(id);
  }
}
