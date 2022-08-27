import { IsInt, IsNotEmpty, IsUUID, MaxLength, Min, ValidateNested } from 'class-validator';
import Budget from './Budget';
import BudgetCategory from './BudgetCategory';

export default class BudgetGroup {
  @IsUUID()
  public id: string;

  @MaxLength(62)
  @IsNotEmpty()
  public name: string;

  @IsInt()
  @Min(0)
  public sort: number;

  @ValidateNested()
  public categories: BudgetCategory[];

  @ValidateNested()
  public budget: Budget;
}
