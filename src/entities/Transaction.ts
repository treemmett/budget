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

@Entity({ name: 'transactions ' })
export default class Transaction {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public description: string;

  @Column({ type: 'date' })
  public date: string;

  @Column({ type: 'decimal', precision: 13, scale: 2 })
  public amount: number;

  @Index()
  @ManyToOne(() => TransactionCategory, category => category.transactions)
  public category: TransactionCategory;

  @ManyToOne(() => Account, account => account.transactions)
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
