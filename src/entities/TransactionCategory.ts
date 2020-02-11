import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import Allocation from './Allocation';
import Budget from './Budget';
import CategoryGroup from './CategoryGroup';
import Transaction from './Transaction';

@ObjectType({ description: 'Budget category' })
@Entity({ name: 'transaction-categories' })
export default class TransactionCategory {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field({ description: 'Name of the category' })
  @Column()
  public name: string;

  @Field(() => Budget, { description: 'Budget the transaction is attached to' })
  @ManyToOne(
    () => Budget,
    budget => budget.categories
  )
  public budget: Budget;

  @Field(() => CategoryGroup, { description: 'The group the category is in' })
  @ManyToOne(
    () => CategoryGroup,
    group => group.categories
  )
  public group: CategoryGroup;

  @Field(() => [Transaction], {
    description: 'List of transactions within the category'
  })
  @OneToMany(
    () => Transaction,
    transaction => transaction.category
  )
  public transactions: Transaction[];

  @OneToMany(
    () => Allocation,
    allocation => allocation.category
  )
  public allocations: Allocation[];

  @Field(() => Allocation, { description: 'Allocation for the category' })
  public allocation: Allocation;
}
