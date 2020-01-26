import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  Resolver,
  Root
} from 'type-graphql';
import { Max, Min } from 'class-validator';
import Allocation from '../entities/Allocation';
import Budget from '../entities/Budget';
import BudgetController from '../controllers/BudgetController';
import { Context } from '.';
import HttpException from '../utils/HttpException';
import Transaction from '../entities/Transaction';
import TransactionCategory from '../entities/TransactionCategory';
import { getManager } from 'typeorm';
import requireAuth from '../utils/requireAuth';

@InputType()
class AllocationInput {
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
}

@Resolver(() => TransactionCategory)
export default class CategoryResolver {
  @FieldResolver()
  public async allocation(
    @Root() category: TransactionCategory,
    @Arg('date', { nullable: true }) data?: AllocationInput
  ): Promise<Allocation> {
    const date = data ? new Date(data.year, data.month, 1) : new Date();
    date.setDate(1);

    return new BudgetController(await this.budget(category)).getAllocation(
      category.id,
      date
    );
  }

  @FieldResolver()
  public async budget(@Root() parent: TransactionCategory): Promise<Budget> {
    const budget = await getManager()
      .createQueryBuilder(Budget, 'budget')
      .leftJoin('budget.categories', 'category')
      .where('category.id = :categoryId', { categoryId: parent.id })
      .getOne();

    if (!budget) {
      throw new HttpException({
        error: 'invalid_request',
        message: 'No budget found for category',
        status: 404
      });
    }

    return budget;
  }

  @FieldResolver()
  public async transactions(
    @Root() parent: TransactionCategory
  ): Promise<Transaction[]> {
    return getManager()
      .createQueryBuilder(Transaction, 'transaction')
      .leftJoin('transaction.category', 'category')
      .where('category.id = :categoryId', { categoryId: parent.id })
      .getMany();
  }

  @Mutation(() => TransactionCategory)
  public async createCategory(
    @Arg('name') name: string,
    @Arg('budgetId') budgetId: string,
    @Ctx() ctx: Context
  ): Promise<TransactionCategory> {
    const budget = await BudgetController.getBudgets(
      requireAuth(ctx),
      budgetId
    );

    return new BudgetController(budget).createCategory(name);
  }

  @Mutation(() => Boolean)
  public async deleteCategory(
    @Arg('id') id: string,
    @Arg('budgetId') budgetId: string,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    const budget = await BudgetController.getBudgets(
      requireAuth(ctx),
      budgetId
    );
    return new BudgetController(budget).deleteCategory(id);
  }
}
