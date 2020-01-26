import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Float,
  InputType,
  Int,
  Mutation,
  Resolver,
  Root
} from 'type-graphql';
import { Max, Min } from 'class-validator';
import Allocation from '../entities/Allocation';
import BudgetController from '../controllers/BudgetController';
import { Context } from '.';
import HttpException from '../utils/HttpException';
import TransactionCategory from '../entities/TransactionCategory';
import { getManager } from 'typeorm';
import requireAuth from '../utils/requireAuth';

@InputType()
class AllocateInput {
  @Field()
  public categoryId: string;

  @Field()
  public budgetId: string;

  @Field(() => Int, {
    defaultValue: new Date().getFullYear(),
    description:
      'Year of the allocation. Can be set up to 10 years in the future, 5 years in the past.'
  })
  @Max(new Date().getFullYear() + 10)
  @Min(new Date().getFullYear() - 5)
  public year: number;

  @Field(() => Int, {
    defaultValue: new Date().getMonth(),
    description: '0-based month of allocation. Min: 0, Max: 11'
  })
  @Max(11)
  @Min(0)
  public month: number;

  @Field(() => Float)
  public amount: number;
}

@Resolver(() => Allocation)
export default class AllocationResolver {
  @FieldResolver()
  public async category(
    @Root() allocation: Allocation
  ): Promise<TransactionCategory> {
    const category = await getManager()
      .createQueryBuilder(TransactionCategory, 'category')
      .leftJoin('category.allocations', 'allocation')
      .where('allocation.id = :id', { id: allocation.id })
      .getOne();

    if (!category) {
      throw new HttpException({
        error: 'invalid_request',
        message: 'No category found for allocation',
        status: 404
      });
    }

    return category;
  }

  @FieldResolver()
  public date(@Root() allocation: Allocation): string {
    return allocation.date.toISOString().substr(0, 10);
  }

  @FieldResolver()
  public month(@Root() allocation: Allocation): number {
    return allocation.date.getUTCMonth();
  }

  @FieldResolver()
  public year(@Root() allocation: Allocation): number {
    return allocation.date.getUTCFullYear();
  }

  @Mutation(() => Allocation)
  public async allocateCategory(
    @Arg('input') input: AllocateInput,
    @Ctx() ctx: Context
  ): Promise<Allocation> {
    const budget = await BudgetController.getBudgets(
      requireAuth(ctx),
      input.budgetId
    );
    return new BudgetController(budget).setAllocation(
      input.categoryId,
      new Date(input.year, input.month, 1),
      input.amount
    );
  }
}
