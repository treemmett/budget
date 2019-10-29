import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Budget from './Budget';

@Entity({ name: 'transaction-categories' })
export default class TransactionCategory {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @ManyToOne(() => Budget, budget => budget.categories)
  public budget: Budget;
}
