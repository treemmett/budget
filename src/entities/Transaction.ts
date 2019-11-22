import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Field, Float, GraphQLISODateTime, ID, ObjectType } from 'type-graphql';
import Account from './Account';
import TransactionCategory from './TransactionCategory';

@ObjectType({ description: 'Transaction' })
@Entity({ name: 'transactions ' })
export default class Transaction {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field({ description: 'Details of the transaction' })
  @Column()
  public description: string;

  @Field(() => GraphQLISODateTime, {
    description: 'Date the transaction occurred'
  })
  @Column({ type: 'date' })
  public date: string;

  @Field(() => Float, { description: 'Amount of the transaction' })
  @Column({ type: 'decimal', precision: 13, scale: 2 })
  public amount: number;

  @Field(() => TransactionCategory, {
    description: 'Category of the transaction'
  })
  @Index()
  @ManyToOne(
    () => TransactionCategory,
    category => category.transactions
  )
  public category: TransactionCategory;

  @Field(() => Account, {
    description: 'The bank account the transaction was charged from'
  })
  @ManyToOne(
    () => Account,
    account => account.transactions
  )
  public account: Account;

  public getDetails(): {
    id: string;
    description: string;
    date: string;
    amount: number;
    account: string;
    category: string;
  } {
    return {
      id: this.id,
      description: this.description,
      date: this.date,
      amount: Number(this.amount),
      category: this.category.id,
      account: this.account.id
    };
  }
}
