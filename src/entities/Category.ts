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

  public async changeGroup(
    group: CategoryGroup,
    index: number
  ): Promise<CategoryGroup[]> {
    // remove category from current group
    const currentGroup = await this.group;
    const currentGroupCategories = await currentGroup.categories;
    currentGroupCategories.sort((a, b) => {
      if (a.sort > b.sort) return 1;
      if (a.sort < b.sort) return -1;
      return 0;
    });
    const currentIndex = currentGroupCategories.findIndex(
      c => c.id === this.id
    );
    if (!~currentIndex) return [];
    const [category] = currentGroupCategories.splice(currentIndex, 1);

    // resort indices in the old group
    for (let i = 0; i < currentGroupCategories.length; i += 1) {
      currentGroupCategories[i].sort = i;
    }

    // get categories in the new group
    const newGroupCategories = await group.categories;
    newGroupCategories.sort((a, b) => {
      if (a.sort > b.sort) return 1;
      if (a.sort < b.sort) return -1;
      return 0;
    });

    // move category to the new group
    category.group = Promise.resolve(group);
    newGroupCategories.splice(index, 0, category);

    // resort indices in the new group
    for (let i = 0; i < newGroupCategories.length; i += 1) {
      newGroupCategories[i].sort = i;
    }

    await getRepository(Category).save([
      ...newGroupCategories,
      ...currentGroupCategories,
    ]);

    return [currentGroup, group];
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
