import { IsDate, IsInt, IsNotEmpty, IsUUID, MaxLength, Min, ValidateNested } from 'class-validator';
import BudgetCategory from './BudgetCategory';

export default class Transaction {
  @IsUUID()
  public id: string;

  @MaxLength(62)
  @IsNotEmpty()
  public description: string;

  @IsInt()
  @Min(0)
  public amount: number;

  @IsDate()
  public date: Date;

  @ValidateNested()
  public category: BudgetCategory;
}
