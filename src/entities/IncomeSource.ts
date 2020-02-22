import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Float, ID, ObjectType, registerEnumType } from 'type-graphql';
import Budget from './Budget';

export enum PayScale {
  yearly,
  monthly,
  weekly,
  hourly
}

registerEnumType(PayScale, {
  name: 'PayScale',
  description: 'Income payment scale'
});

@ObjectType({ description: 'Income source' })
@Entity({ name: 'income-sources' })
export default class IncomeSource {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field({ description: 'Name of the income' })
  @Column()
  public name: string;

  @Field(() => PayScale, { description: 'Type of income' })
  @Column({ type: 'enum', enum: PayScale })
  public scale: PayScale;

  @Field(() => Float, { description: 'Pay rate per scale' })
  @Column()
  public rate: number;

  @Field(() => Float, {
    description: 'Number of hours per week',
    nullable: true
  })
  @Column({ nullable: true })
  public hours?: number;

  @Field(() => Budget, {
    description: 'Budget the income source is attached to'
  })
  @ManyToOne(
    () => Budget,
    budget => budget.incomeSources,
    { onDelete: 'CASCADE', nullable: false }
  )
  public budget: Budget;

  @Field(() => Float, {
    description: 'The total annual income from the source'
  })
  public annualIncome: number;
}
