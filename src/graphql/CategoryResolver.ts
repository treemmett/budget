import { FieldResolver, Resolver, Root } from 'type-graphql';
import Budget from '../entities/Budget';
import HttpException from '../utils/HttpException';
import Transaction from '../entities/Transaction';
import TransactionCategory from '../entities/TransactionCategory';
import { getManager } from 'typeorm';

@Resolver(() => TransactionCategory)
export default class CategoryResolver {
  @FieldResolver()
  public async budget(@Root() parent: TransactionCategory): Promise<Budget> {
    if (parent.budget) {
      return parent.budget;
    }

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
}
