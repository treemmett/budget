import { Arg, Ctx, ID, Mutation, Resolver } from 'type-graphql';
import Account from '../entities/Account';
import Budget from '../entities/Budget';
import { Context } from '.';
import requireAuth from '../utils/requireAuth';

@Resolver(() => Account)
export default class AccountResolver {
  @Mutation(() => Account)
  public async createAccount(
    @Arg('name') name: string,
    @Arg('budgetId', () => ID) budgetId: string,
    @Ctx() ctx: Context
  ): Promise<Account> {
    const budget = await Budget.find(budgetId, requireAuth(ctx));
    return Account.create(budget, name);
  }

  @Mutation(() => Account)
  public async renameAccount(
    @Arg('id', () => ID) id: string,
    @Arg('name') name: string,
    @Arg('budgetId', () => ID) budgetId: string,
    @Ctx() ctx: Context
  ): Promise<Account> {
    const budget = await Budget.find(budgetId, requireAuth(ctx));
    const account = await Account.find(budget, id);
    return account.rename(name);
  }
}
