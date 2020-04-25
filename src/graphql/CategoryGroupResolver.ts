import {
  Arg,
  Ctx,
  FieldResolver,
  ID,
  Int,
  Mutation,
  Resolver,
  Root,
} from 'type-graphql';
import Budget from '../entities/Budget';
import Category from '../entities/Category';
import CategoryGroup from '../entities/CategoryGroup';
import { Context } from '.';
import auth from '../utils/requireAuth';

@Resolver(() => CategoryGroup)
export default class CategoryGroupResolver {
  @FieldResolver(() => Budget)
  public budget(@Root() group: CategoryGroup): Promise<Budget> {
    return group.budget;
  }

  @FieldResolver(() => [Category])
  public categories(@Root() group: CategoryGroup): Promise<Category[]> {
    return group.categories;
  }

  @Mutation(() => CategoryGroup)
  public async createCategoryGroup(
    @Arg('name') name: string,
    @Arg('budgetId', () => ID) budgetId: string,
    @Ctx() ctx: Context
  ): Promise<CategoryGroup> {
    const budget = await Budget.find(budgetId, auth(ctx));
    return CategoryGroup.create(name, budget);
  }

  @Mutation(() => Boolean)
  public async deleteCategoryGroup(
    @Arg('id', () => ID) id: string,
    @Arg('budgetId', () => ID) budgetId: string,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    const budget = await Budget.find(budgetId, auth(ctx));
    const group = await CategoryGroup.find(id, budget);
    return group.delete();
  }

  @Mutation(() => CategoryGroup)
  public async renameCategoryGroup(
    @Arg('id', () => ID) id: string,
    @Arg('name') name: string,
    @Arg('budgetId', () => ID) budgetId: string,
    @Ctx() ctx: Context
  ): Promise<CategoryGroup> {
    const budget = await Budget.find(budgetId, auth(ctx));
    const group = await CategoryGroup.find(id, budget);
    return group.rename(name);
  }

  @Mutation(() => [CategoryGroup])
  public async resortCategoryGroups(
    @Arg('id', () => ID) id: string,
    @Arg('index', () => Int) index: number,
    @Arg('budgetId', () => ID) budgetId: string,
    @Ctx() ctx: Context
  ): Promise<CategoryGroup[]> {
    const budget = await Budget.find(budgetId, auth(ctx));
    const group = await CategoryGroup.find(id, budget);
    return group.resort(index);
  }
}
