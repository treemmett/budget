import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  getRepository,
} from 'typeorm';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import { IsInt, MaxLength, Min, validateOrReject } from 'class-validator';
import Allocation from './Allocation';
import Budget from './Budget';
import CategoryGroup from './CategoryGroup';
import { UserInputError } from 'apollo-server-express';

@ObjectType({ description: 'Budget category' })
@Entity({ name: 'categories' })
export default class Category {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @ManyToOne(() => Allocation, allocation => allocation.category)
  public allocations: Promise<Allocation[]>;

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

  @IsInt()
  @Min(0)
  @Field(() => Int, { description: 'Sorting index of the group' })
  @Column({ type: 'int2' })
  public sort: number;

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
    group: CategoryGroup,
    index?: number
  ): Promise<Category> {
    const category = new Category();
    category.name = name;
    category.group = Promise.resolve(group);
    category.sort = index ?? (await group.categories).length;
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

  public async getAllocation(date: Date): Promise<number> {
    const firstOfMonth = new Date(date);
    firstOfMonth.setDate(1);

    const allocation = await getRepository(Allocation)
      .createQueryBuilder('allocation')
      .leftJoin('allocation.category', 'category')
      .where('category.id = :id', { id: this.id })
      .andWhere('EXTRACT(MONTH FROM allocation.date) = :month', {
        month: firstOfMonth.getMonth() + 1,
      })
      .andWhere('EXTRACT(YEAR FROM allocation.date) = :year', {
        year: firstOfMonth.getFullYear(),
      })
      .getOne();

    return allocation?.amount ?? 0;
  }

  public async rename(name: string): Promise<this> {
    this.name = name;
    await getRepository(Category).save(this);
    return this;
  }

  public async setAllocation(date: Date, amount: number): Promise<this> {
    const allocation = new Allocation();
    allocation.amount = amount;
    allocation.category = Promise.resolve(this);
    allocation.date = date;

    await getRepository(Allocation)
      .createQueryBuilder('allocation')
      .insert()
      .values(allocation)
      .onConflict('ON CONSTRAINT "cat_date" DO UPDATE SET "amount" = :amount')
      .setParameter('amount', amount)
      .execute();

    return this;
  }

  public async changeSort(index: number): Promise<Category[]> {
    const group = await this.group;
    const categories = await group.categories;

    // sort the categories before modification
    categories.sort((a, b) => {
      if (a.sort > b.sort) return 1;
      if (a.sort < b.sort) return -1;
      return 0;
    });

    categories.splice(this.sort, 1);
    categories.splice(index, 0, this);

    for (let i = 0; i < categories.length; i += 1) {
      categories[i].sort = i;
    }

    await getRepository(Category).save(categories);

    return categories;
  }

  @BeforeInsert()
  @BeforeUpdate()
  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
