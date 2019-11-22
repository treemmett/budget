import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import Account from './Account';
import IncomeSource from './IncomeSource';
import TransactionCategory from './TransactionCategory';
import User from './User';

@ObjectType({ description: 'Budget' })
@Entity({ name: 'budgets' })
export default class Budget {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field({ description: 'Name of the budget' })
  @Column()
  public name: string;

  @Field(() => User, { description: "Budget's owner" })
  @ManyToOne(() => User)
  @Index()
  public user: User;

  @Field(() => [TransactionCategory], {
    description: 'Categories in the budget'
  })
  @OneToMany(
    () => TransactionCategory,
    category => category.budget
  )
  public categories: TransactionCategory[];

  @Field(() => [Account], {
    description: 'List of bank accounts in the budget'
  })
  @OneToMany(
    () => Account,
    account => account.budget
  )
  public accounts: Account[];

  @Field(() => [IncomeSource], { description: 'List of incomes in the budget' })
  @OneToMany(
    () => IncomeSource,
    income => income.budget
  )
  public incomes: IncomeSource[];

  public getDetails(): { id: string; name: string } {
    return {
      id: this.id,
      name: this.name
    };
  }
}
