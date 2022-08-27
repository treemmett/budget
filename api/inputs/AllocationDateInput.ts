import { Field, InputType } from 'type-graphql';
import { IsInt, Max, Min } from 'class-validator';

@InputType()
export default class AllocationDateInput {
  @Field()
  @IsInt()
  @Min(0)
  @Max(11)
  public month: number;

  @Field()
  @IsInt()
  @Min(2010)
  @Max(2030)
  public year: number;

  public constructor(data: AllocationDateInput) {
    this.month = data?.month;
    this.year = data?.year;
  }

  public toDate(): Date {
    return new Date(this.year, this.month, 1);
  }
}
