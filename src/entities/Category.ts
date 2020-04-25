import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  getRepository,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { MaxLength, validateOrReject } from 'class-validator';
import Budget from './Budget';
import CategoryGroup from './CategoryGroup';
import { UserInputError } from 'apollo-server-express';

@ObjectType({ description: 'Budget category' })
@Entity({ name: 'categories' })
export default class Category {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @MaxLength(62)
  @Field({ description: 'Name of the category' })
  @Column({ length: 62 })
  public name: string;

  @Field(() => CategoryGroup, { description: 'The group the category is in' })
  @ManyToOne(() => CategoryGroup, group => group.categories, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  public group: Promise<CategoryGroup>;

  public static async find(id: string, budget: Budget): Promise<Category> {
    const category = await getRepository(Category)
      .createQueryBuilder('category')
      .leftJoin('category.group', 'group')
      .leftJoin('group.budget', 'budget')
      .where('category.id = :id', { id })
      .andWhere('budget.id = :budgetId', { budgetId: budget.id })
      .getOne();

    if (!category) {
      throw new UserInputError('Category not found', { properties: ['id'] });
    }

    return category;
  }

  public static async create(
    name: string,
    group: CategoryGroup
  ): Promise<Category> {
    const category = new Category();
    category.name = name;
    category.group = Promise.resolve(group);
    await getRepository(Category).save(category);
    return category;
  }

  public async delete(): Promise<boolean> {
    try {
      await getRepository(Category).remove(this);
      return true;
    } catch {
      return false;
    }
  }

  public async rename(name: string): Promise<this> {
    this.name = name;
    await getRepository(Category).save(this);
    return this;
  }

  @BeforeInsert()
  @BeforeUpdate()
  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
