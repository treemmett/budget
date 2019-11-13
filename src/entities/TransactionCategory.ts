import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import Budget from './Budget';
import Transaction from './Transaction';

@Entity({ name: 'transaction-categories' })
export default class TransactionCategory {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @ManyToOne(
    () => Budget,
    budget => budget.categories
  )
  public budget: Budget;

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
