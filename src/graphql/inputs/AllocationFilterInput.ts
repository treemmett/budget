import { Field, InputType, Int } from 'type-graphql';
import { Max, Min } from 'class-validator';

@InputType()
export default class AllocationFilterInput {
  @Field(() => Int, {
    defaultValue: new Date().getFullYear(),
    description:
      'Year of the allocation. Can be set up to 10 years in the future, 5 years in the past.',
  })
  @Max(new Date().getFullYear() + 10)
  @Min(new Date().getFullYear() - 5)
  public year: number;

  @Field(() => Int, {
    defaultValue: new Date().getMonth(),
    description: '0-based month of allocation. Min: 0, Max: 11',
  })
  @Max(11)
  @Min(0)
  public month: number;
}
