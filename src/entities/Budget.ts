import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import Account from './Account';
import CategoryGroup from './CategoryGroup';
import IncomeSource from './IncomeSource';
import Tax from './Tax';
import Transaction from './Transaction';
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
  @ManyToOne(() => User, { onDelete: 'CASCADE', nullable: false })
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

  @Field(() => TransactionCategory, { description: 'Category in the budget' })
  public category: TransactionCategory;

  @Field(() => [CategoryGroup], {
    description: 'All category groups within the budget'
  })
  @OneToMany(
    () => CategoryGroup,
    group => group.budget
  )
  public categoryGroups: CategoryGroup[];

  @Field(() => [Account], {
    description: 'List of bank accounts in the budget'
  })
  @OneToMany(
    () => Account,
    account => account.budget
  )
  public accounts: Account[];

  @Field(() => [Transaction], { description: 'All transactions in the budget' })
  @OneToMany(
    () => Transaction,
    transaction => transaction.budget
  )
  public transactions: Transaction[];

  @Field(() => Account, { description: 'Bank account in the budget' })
  public account: Account;

  @Field(() => [IncomeSource], {
    description: 'List of income sources in the budget'
  })
  @OneToMany(
    () => IncomeSource,
    incomeSource => incomeSource.budget
  )
  public incomeSources: IncomeSource[];

  @Field(() => IncomeSource, { description: 'Income source' })
  public incomeSource: IncomeSource;

  @OneToOne(
    () => Tax,
    tax => tax.budget
  )
  @Field(() => Tax, { description: 'Tax details' })
  public tax: Tax;
}
