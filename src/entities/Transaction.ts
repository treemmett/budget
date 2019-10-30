import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
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

  public getDetails(): {
    id: string;
    description: string;
    date: string;
    amount: number;
    category: string;
  } {
    return {
      id: this.id,
      description: this.description,
      date: this.date,
      amount: Number(this.amount),
      category: this.category.id
    };
  }
}
