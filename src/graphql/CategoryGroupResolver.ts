import {
  Arg,
  Ctx,
  FieldResolver,
  ID,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import Allocation from '../entities/Allocation';
import AllocationFilterInput from './inputs/AllocationFilterInput';
import Budget from '../entities/Budget';
import BudgetController from '../controllers/BudgetController';
import CategoryGroup from '../entities/CategoryGroup';
import { Context } from '.';
import HttpException from '../utils/HttpException';
import TransactionCategory from '../entities/TransactionCategory';
import { getManager } from 'typeorm';
import requireAuth from '../utils/requireAuth';

@Resolver(() => CategoryGroup)
export default class CategoryGroupResolver {
  @Query(() => CategoryGroup)
  public async categoryGroup(
    @Arg('id', () => ID) id: string,
    @Arg('budgetId', () => ID) budgetId: string,
    @Ctx() ctx: Context
  ): Promise<CategoryGroup> {
    const budget = await BudgetController.getBudgets(
      requireAuth(ctx),
      budgetId
    );
    return new BudgetController(budget).getCategoryGroups(id);
  }

  @FieldResolver(() => Allocation)
  public async allocation(
    @Root() categoryGroup: CategoryGroup,
    @Arg('date', { nullable: true }) input?: AllocationFilterInput
  ): Promise<Allocation> {
    const budget = await this.budget(categoryGroup);
    const date = input ? new Date(input.year, input.month, 1) : new Date();
    date.setDate(1);

    return new BudgetController(budget).getCategoryGroupAllocation(
      categoryGroup.id,
      date
    );
  }

  @FieldResolver(() => Budget)
  public async budget(@Root() categoryGroup: CategoryGroup): Promise<Budget> {
    const budget = await getManager()
      .createQueryBuilder(Budget, 'budget')
      .leftJoin('budget.categoryGroups', 'group')
      .where('group.id = :groupId', { groupId: categoryGroup.id })
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

  @FieldResolver(() => [TransactionCategory])
  public async categories(
    @Root() categoryGroup: CategoryGroup
  ): Promise<TransactionCategory[]> {
    const budget = await this.budget(categoryGroup);

    return new BudgetController(budget).getCategoriesInGroup(categoryGroup.id);
  }

  @Mutation(() => CategoryGroup)
  public async createCategoryGroup(
    @Arg('budgetId') budgetId: string,
    @Arg('name') name: string,
    @Ctx() ctx: Context
  ): Promise<CategoryGroup> {
    const budget = await BudgetController.getBudgets(
      requireAuth(ctx),
      budgetId
    );
    return new BudgetController(budget).createCategoryGroup(name);
  }

  @Mutation(() => Boolean)
  public async deleteCategoryGroup(
    @Arg('budgetId') budgetId: string,
    @Arg('categoryGroupId') categoryGroupId: string,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    const budget = await BudgetController.getBudgets(
      requireAuth(ctx),
      budgetId
    );

    return new BudgetController(budget).deleteCategoryGroup(categoryGroupId);
  }
}
