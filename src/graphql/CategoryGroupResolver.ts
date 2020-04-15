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
    @Arg('budgetId', () => ID) budgetId: string,
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
    @Arg('budgetId', () => ID) budgetId: string,
    @Arg('categoryGroupId', () => ID) categoryGroupId: string,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    const budget = await BudgetController.getBudgets(
      requireAuth(ctx),
      budgetId
    );

    return new BudgetController(budget).deleteCategoryGroup(categoryGroupId);
  }
}
