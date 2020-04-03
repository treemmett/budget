import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, Float, ID, ObjectType } from 'type-graphql';
import Account from './Account';
import Budget from './Budget';
import DateScalar from '../graphql/scalars/Date';
import TransactionCategory from './TransactionCategory';

@ObjectType({ description: 'Transaction' })
@Entity({ name: 'transactions ' })
export default class Transaction {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field(() => Budget, { description: 'Budget the transaction is in' })
  @ManyToOne(() => Budget, { nullable: false, onDelete: 'CASCADE' })
  public budget: Budget;

  @Field({ description: 'Details of the transaction' })
  @Column()
  public description: string;

  @Field(() => DateScalar, {
    description: 'Date the transaction occurred',
  })
  @Column({ type: 'date' })
  public date: Date;

  @Field(() => Float, { description: 'Amount of the transaction' })
  @Column({ precision: 13, scale: 2, type: 'decimal' })
  public amount: number;

  @Field(() => TransactionCategory, {
    description: 'Category of the transaction',
  })
  @Index()
  @ManyToOne(() => TransactionCategory, category => category.transactions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  public category: TransactionCategory;

  @Field(() => Account, {
    description: 'The bank account the transaction was charged from',
  })
  @ManyToOne(() => Account, account => account.transactions)
  public account: Account;
}
