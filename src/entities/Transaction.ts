import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Field, Float, ID, ObjectType } from 'type-graphql';
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

  @Field({
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
    category => category.transactions,
    { onDelete: 'CASCADE', nullable: false }
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
}
