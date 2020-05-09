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
import AllocationDateInput from '../inputs/AllocationDateInput';
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

  @FieldResolver(() => Int)
  public allocation(
    @Root() category: Category,
    @Arg('date') date: AllocationDateInput
  ): Promise<number> {
    return category.getAllocation(date.toDate());
  }

  @Mutation(() => Category)
  public async allocateCategory(
    @Arg('id', () => ID) id: string,
    @Arg('amount', () => Int) amount: number,
    @Arg('date') date: AllocationDateInput,
    @Arg('budgetId', () => ID) budgetId: string,
    @Ctx() ctx: Context
  ): Promise<Category> {
    const budget = await Budget.find(budgetId, auth(ctx));
    const category = await Category.find(id, budget);
    return category.setAllocation(date.toDate(), amount);
  }

  @Mutation(() => [CategoryGroup])
  public async changeCategoryGroup(
    @Arg('id', () => ID) id: string,
    @Arg('groupId', () => ID) groupId: string,
    @Arg('index', () => Int) index: number,
    @Arg('budgetId', () => ID) budgetId: string,
    @Ctx() ctx: Context
  ): Promise<CategoryGroup[]> {
    const budget = await Budget.find(budgetId, auth(ctx));
    const [category, group] = await Promise.all([
      Category.find(id, budget),
      CategoryGroup.find(groupId, budget),
    ]);
    return category.changeGroup(group, index);
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

  @Mutation(() => [Category])
  public async sortCategory(
    @Arg('id', () => ID) id: string,
    @Arg('index', () => Int) index: number,
    @Arg('budgetId', () => ID) budgetId: string,
    @Ctx() ctx: Context
  ): Promise<Category[]> {
    const budget = await Budget.find(budgetId, auth(ctx));
    const category = await Category.find(id, budget);
    return category.changeSort(index);
  }
}
