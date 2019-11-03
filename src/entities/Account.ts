import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Budget from './Budget';

export enum AccountType {
  checking,
  savings,
  creditCard
}

@Entity({ name: 'accounts' })
export default class Account {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column({
    type: 'enum',
    enum: AccountType
  })
  public type: AccountType;

  @ManyToOne(() => Budget, budget => budget.accounts)
  public budget: Budget;

  public getDetails(): { id: string; name: string; type: string } {
    return {
      id: this.id,
      name: this.name,
      type: AccountType[this.type]
    };
  }
}
