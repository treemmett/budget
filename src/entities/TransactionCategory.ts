import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import Budget from './Budget';
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

  @Field(() => [Transaction], {
    description: 'List of transactions within the category'
  })
  @OneToMany(
    () => Transaction,
    transaction => transaction.category
  )
  public transactions: Transaction[];

  public getDetails(): { id: string; name: string } {
    return {
      id: this.id,
      name: this.name
    };
  }
}
