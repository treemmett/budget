import { IsInt, IsNotEmpty, IsUUID, MaxLength, Min, ValidateNested } from 'class-validator';
import BudgetAllocation from './BudgetAllocation';

export default class BudgetCategory {
  @IsUUID()
  public id: string;

  @MaxLength(62)
  @IsNotEmpty()
  public name: string;

  @ValidateNested()
  public allocations: BudgetAllocation[];

  @IsInt()
  @Min(0)
  public sort: number;
}
