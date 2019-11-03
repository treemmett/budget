import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Budget from './Budget';

export enum PayScale {
  yearly,
  monthly,
  weekly,
  hourly,
  fixed
}

@Entity({ name: 'income-sources' })
export default class IncomeSource {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column({ type: 'enum', enum: PayScale })
  public scale: PayScale;

  @Column()
  public rate: number;

  @Column({ nullable: true })
  public hours?: number;

  @ManyToOne(() => Budget, budget => budget.incomes)
  public budget: Budget;

  public getDetails(): {
    id: string;
    name: string;
    scale: string;
    rate: number;
    hours?: number;
  } {
    return {
      id: this.id,
      name: this.name,
      scale: PayScale[this.scale],
      rate: this.rate,
      hours: this.hours
    };
  }
}
