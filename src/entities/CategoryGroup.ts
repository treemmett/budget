import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import Budget from './Budget';
import TransactionCategory from './TransactionCategory';

@Entity({ name: 'category_groups' })
@ObjectType({ description: 'Category groups' })
export default class CategoryGroup {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field({ description: 'Name of the group' })
  @Column()
  public name: string;

  @Field(() => Budget, { description: 'The budget of the group' })
  @ManyToOne(
    () => Budget,
    budget => budget.categoryGroups,
    { onDelete: 'CASCADE', nullable: false }
  )
  public budget: Budget;

  @Field(() => [TransactionCategory], {
    description: 'List of categories within the group'
  })
  @OneToMany(
    () => TransactionCategory,
    category => category.group
  )
  public categories: TransactionCategory[];
}
