import { FieldResolver, Resolver, Root } from 'type-graphql';
import Budget from '../entities/Budget';
import HttpException from '../utils/HttpException';
import IncomeSource from '../entities/IncomeSource';
import { getManager } from 'typeorm';

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
}
