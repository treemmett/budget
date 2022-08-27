import { IsInt, IsUUID, Max, Min } from 'class-validator';

export default class BudgetAllocation {
  @IsUUID()
  public id: string;

  @IsInt()
  @Min(2018)
  @Max(2099)
  public year: number;

  @IsInt()
  @Min(0)
  @Max(11)
  public month: number;

  @IsInt()
  public amount: number;
}
