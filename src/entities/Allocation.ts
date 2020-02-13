import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique
} from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import TransactionCategory from './TransactionCategory';

@ObjectType({ description: 'Category allocation for given month-year' })
@Entity({ name: 'allocations' })
@Unique(['date', 'category'])
export default class Allocation {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field(() => TransactionCategory, {
    description: 'Category of the allocation'
  })
  @ManyToOne(
    () => TransactionCategory,
    category => category.allocations,
    { onDelete: 'CASCADE', nullable: false }
  )
  public category: TransactionCategory;

  @Field({ description: 'Amount of the allocation' })
  @Column({ type: 'numeric', precision: 13, scale: 2 })
  public amount: number;

  @Field(() => String, {
    description:
      'ISO 8601 date string of the allocation. Date will be set to the first.'
  })
  @Column({
    type: 'date',
    transformer: {
      to: (entityValue: Date): Date => {
        entityValue.setDate(1);
        return entityValue;
      },
      from: (databaseValue: string): Date => {
        const [year, month] = databaseValue.split('-');
        const d = new Date();
        d.setFullYear(parseInt(year, 10));
        d.setMonth(parseInt(month, 10) - 1);
        d.setDate(1);
        return d;
      }
    }
  })
  public date: Date;

  @Field(() => Int, { description: 'Year of the allocation' })
  public year: number;

  @Field(() => Int, {
    description:
      'Month of the allocation. 0 based (January is 0, December is 11)'
  })
  public month: number;
}
