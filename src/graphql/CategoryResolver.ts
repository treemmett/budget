import {
  Arg,
  Ctx,
  FieldResolver,
  ID,
  Mutation,
  Resolver,
  Root,
} from 'type-graphql';
import Budget from '../entities/Budget';
import Category from '../entities/Category';
import CategoryGroup from '../entities/CategoryGroup';
import { Context } from 'vm';
import auth from '../utils/requireAuth';

@Resolver(() => Category)
export default class CategoryResolver {
  @FieldResolver(() => CategoryGroup)
  public group(@Root() category: Category): Promise<CategoryGroup> {
    return category.group;
  }

  @Mutation(() => Category)
  public async createCategory(
    @Arg('name') name: string,
    @Arg('groupId', () => ID) groupId: string,
    @Arg('budgetId', () => ID) budgetId: string,
    @Ctx() ctx: Context
  ): Promise<Category> {
    const budget = await Budget.find(budgetId, auth(ctx));
    const group = await CategoryGroup.find(groupId, budget);
    return Category.create(name, group);
  }

  @Mutation(() => Boolean)
  public async deleteCategory(
    @Arg('id', () => ID) id: string,
    @Arg('budgetId', () => ID) budgetId: string,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    const budget = await Budget.find(budgetId, auth(ctx));
    const category = await Category.find(id, budget);
    return category.delete();
  }

  @Mutation(() => Category)
  public async renameCategory(
    @Arg('name') name: string,
    @Arg('id', () => ID) id: string,
    @Arg('budgetId', () => ID) budgetId: string,
    @Ctx() ctx: Context
  ): Promise<Category> {
    const budget = await Budget.find(budgetId, auth(ctx));
    const category = await Category.find(id, budget);
    return category.rename(name);
  }
}
