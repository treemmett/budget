import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import BudgetAllocation from './BudgetAllocation';
import BudgetGroup from './BudgetGroup';

@Entity({ name: 'budget_categories' })
export default class BudgetCategory {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @ManyToOne(() => BudgetGroup, group => group.categories, {
    onDelete: 'CASCADE',
    nullable: false
  })
  public group: BudgetGroup;

  @OneToMany(() => BudgetAllocation, allocation => allocation.category)
  public allocations: BudgetAllocation[];
}
