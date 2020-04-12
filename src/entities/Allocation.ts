import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Field, Float, ID, Int, ObjectType } from 'type-graphql';
import TransactionCategory from './TransactionCategory';

@ObjectType({ description: 'Category allocation for given month-year' })
@Entity({ name: 'allocations' })
@Unique(['date', 'category'])
export default class Allocation {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne(() => TransactionCategory, category => category.allocations, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  public category: TransactionCategory;

  @Field(() => Float, { description: 'Amount of the allocation' })
  @Column({
    precision: 13,
    scale: 2,
    transformer: {
      from: (data: string): number => parseFloat(data),
      to: (data: number): number => data,
    },
    type: 'numeric',
  })
  public amount: number;

  // @Field(() => Float, { description: 'Total amount used' })
  // public used: number;

  @Field(() => String, {
    description:
      'ISO 8601 date string of the allocation. Date will be set to the first.',
  })
  @Column({
    transformer: {
      from: (databaseValue: string): Date => {
        const [year, month] = databaseValue.split('-');
        const d = new Date();
        d.setFullYear(parseInt(year, 10));
        d.setMonth(parseInt(month, 10) - 1);
        d.setDate(1);
        return d;
      },
      to: (entityValue: Date): Date => {
        entityValue.setDate(1);
        return entityValue;
      },
    },
    type: 'date',
  })
  public date: Date;

  @Field(() => Int, { description: 'Year of the allocation' })
  public year: number;

  @Field(() => Int, {
    description:
      'Month of the allocation. 0 based (January is 0, December is 11)',
  })
  public month: number;
}
