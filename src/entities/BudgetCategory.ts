import { IsInt, IsNotEmpty, IsUUID, MaxLength, Min, ValidateNested } from 'class-validator';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import BudgetAllocation from './BudgetAllocation';
import BudgetGroup from './BudgetGroup';

@Entity()
export default class BudgetCategory {
  @IsUUID()
  @PrimaryColumn()
  public id: string;

  @MaxLength(62)
  @IsNotEmpty()
  public name: string;

  @ValidateNested()
  public allocations: BudgetAllocation[];

  @IsInt()
  @Min(0)
  public sort: number;

  @ManyToOne('BudgetGroup', 'categories')
  group: BudgetGroup;
}
