import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import Budget from './Budget';
import Transaction from './Transaction';

export enum AccountType {
  checking,
  savings,
  creditCard,
}

registerEnumType(AccountType, {
  description: 'Bank account type',
  name: 'AccountType',
});

@ObjectType({ description: 'Bank account' })
@Entity({ name: 'accounts' })
export default class Account {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field({ description: 'Name of the bank account' })
  @Column()
  public name: string;

  @Field(() => AccountType, { description: 'Bank account type' })
  @Column({ enum: AccountType, type: 'enum' })
  public type: AccountType;

  @Field(() => Budget)
  @ManyToOne(() => Budget, budget => budget.accounts, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  public budget: Budget;

  @Field(() => [Transaction])
  @OneToMany(() => Transaction, transaction => transaction.account)
  public transactions: Transaction[];
}
