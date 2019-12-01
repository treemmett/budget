import { FieldResolver, Resolver, Root } from 'type-graphql';
import Account from '../entities/Account';
import Budget from '../entities/Budget';
import HttpException from '../utils/HttpException';
import Transaction from '../entities/Transaction';
import { getManager } from 'typeorm';

@Resolver(() => Account)
export default class AccountResolver {
  @FieldResolver(() => Budget)
  public async budget(@Root() parent: Budget): Promise<Budget> {
    const budget = await getManager()
      .createQueryBuilder(Budget, 'budget')
      .leftJoin('budget.accounts', 'account')
      .where('account.id = :accountId', { accountId: parent.id })
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

  @FieldResolver(() => [Transaction])
  public transactions(@Root() parent: Account): Promise<Transaction[]> {
    return getManager()
      .createQueryBuilder(Transaction, 'transaction')
      .leftJoin('transaction.account', 'account')
      .where('account.id = :accountId', { accountId: parent.id })
      .getMany();
  }
}
