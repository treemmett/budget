import { FieldResolver, Resolver, Root } from 'type-graphql';
import Allocation from '../entities/Allocation';

@Resolver(() => Allocation)
export default class AllocationResolver {
  @FieldResolver()
  public id(@Root() allocation: Allocation): string {
    return (
      allocation.id ??
      `${
        allocation.category.id
      }-${allocation.date.getFullYear()}-${allocation.date.getMonth()}`
    );
  }

  @FieldResolver()
  public date(@Root() allocation: Allocation): string {
    return allocation.date.toISOString().substr(0, 10);
  }

  @FieldResolver()
  public month(@Root() allocation: Allocation): number {
    return allocation.date.getUTCMonth();
  }

  @FieldResolver()
  public year(@Root() allocation: Allocation): number {
    return allocation.date.getUTCFullYear();
  }
}
