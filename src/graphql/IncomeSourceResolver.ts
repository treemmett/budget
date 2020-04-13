import {
  Arg,
  Ctx,
  FieldResolver,
  Float,
  ID,
  Int,
  Mutation,
  Resolver,
  Root,
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
      .leftJoin('budget.incomeSources', 'income')
      .where('income.id = :incomeId', { incomeId: parent.id })
      .getOne();

    if (!budget) {
      throw new HttpException({
        error: 'invalid_request',
        message: 'Budget not found.',
        status: 404,
      });
    }

    return budget;
  }

  @FieldResolver(() => Float)
  public async annualIncome(@Root() parent: IncomeSource): Promise<number> {
    const budget = await getManager()
      .createQueryBuilder(Budget, 'budget')
      .leftJoin('budget.incomeSources', 'income')
      .where('income.id = :incomeId', { incomeId: parent.id })
      .getOne();

    if (!budget) {
      throw new HttpException({
        error: 'invalid_request',
        message: 'Budget not found.',
        status: 404,
      });
    }

    return new BudgetController(budget).calculateIncome(parent.id);
  }

  @Mutation(() => IncomeSource)
  public async createIncomeSource(
    @Arg('name') name: string,
    @Arg('rate', () => Int) rate: number,
    @Arg('scale', () => PayScale) scale: PayScale,
    @Arg('budgetId', () => ID) budgetId: string,
    @Arg('hours') hours: number,
    @Ctx() ctx: Context
  ): Promise<IncomeSource> {
    const budget = await BudgetController.getBudgets(
      requireAuth(ctx),
      budgetId
    );

    return new BudgetController(budget).createIncomeSource(
      name,
      rate,
      scale,
      hours
    );
  }

  @Mutation(() => Boolean)
  public async deleteIncomeSource(
    @Arg('id', () => ID) id: string,
    @Arg('budgetId', () => ID) budgetId: string,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    const budget = await BudgetController.getBudgets(
      requireAuth(ctx),
      budgetId
    );
    return new BudgetController(budget).deleteIncomeSource(id);
  }
}
