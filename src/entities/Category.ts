import { IsInt, IsNotEmpty, IsUUID, MaxLength, Min, ValidateNested } from 'class-validator';
import Allocation from './Allocation';

export default class Category {
  @IsUUID()
  public readonly id: string;

  @ValidateNested()
  public allocations: Allocation[];

  @MaxLength(62)
  @IsNotEmpty()
  public name: string;

  @IsInt()
  @Min(0)
  public sort: number;
}
