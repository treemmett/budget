import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import Account from './Account';
import TransactionCategory from './TransactionCategory';
import User from './User';

@Entity({ name: 'budgets' })
export default class Budget {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @ManyToOne(() => User)
  @Index()
  public user: User;

  @OneToMany(() => TransactionCategory, category => category.budget)
  public categories: TransactionCategory[];

  @OneToMany(() => Account, account => account.budget)
  public accounts: Account[];
}
