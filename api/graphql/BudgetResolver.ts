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
import CategoryGroup from '../entities/CategoryGroup';
import { Context } from '.';
import auth from '../utils/requireAuth';

@Resolver(() => Budget)
export default class BudgetResolver {
  @Query(() => [Budget])
  public budgets(@Ctx() ctx: Context): Promise<Budget[]> {
    return auth(ctx).budgets;
  }

  @Query(() => Budget)
  public budget(
    @Arg('id', () => ID) id: string,
    @Ctx() ctx: Context
  ): Promise<Budget> {
    return Budget.find(id, auth(ctx));
  }

  @FieldResolver(() => CategoryGroup)
  public categoryGroup(
    @Root() budget: Budget,
    @Arg('id', () => ID) id: string
  ): Promise<CategoryGroup> {
    return CategoryGroup.find(id, budget);
  }

  @FieldResolver(() => [CategoryGroup])
  public categoryGroups(@Root() budget: Budget): Promise<CategoryGroup[]> {
    return budget.categoryGroups;
  }

  @Mutation(() => Budget)
  public createBudget(
    @Arg('name') name: string,
    @Ctx() ctx: Context
  ): Promise<Budget> {
    return Budget.create(name, auth(ctx));
  }

  @Mutation(() => Boolean)
  public async deleteBudget(
    @Arg('id', () => ID) id: string,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    const budget = await Budget.find(id, auth(ctx));
    return budget.delete();
  }

  @Mutation(() => Budget)
  public async renameBudget(
    @Arg('id', () => ID) id: string,
    @Arg('name') name: string,
    @Ctx() ctx: Context
  ): Promise<Budget> {
    const budget = await Budget.find(id, auth(ctx));
    return budget.rename(name);
  }
}
