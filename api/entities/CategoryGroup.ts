import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  getRepository,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { MaxLength, validateOrReject } from 'class-validator';
import Budget from './Budget';
import Category from './Category';
import { UserInputError } from 'apollo-server-express';

@Entity({ name: 'category_groups' })
@ObjectType({ description: 'Category groups' })
export default class CategoryGroup {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @MaxLength(62)
  @Field({ description: 'Name of the group' })
  @Column({ length: 62 })
  public name: string;

  @Field(() => Budget, { description: 'The budget of the group' })
  @ManyToOne(() => Budget, budget => budget.categoryGroups, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  public budget: Promise<Budget>;

  @Field(() => [Category], {
    description: 'List of categories within the group',
  })
  @OneToMany(() => Category, category => category.group)
  public categories: Promise<Category[]>;

  @Field({ description: 'Sorting index of the group' })
  @Column({ default: 0, type: 'int2' })
  public sort: number;

  public static async create(
    name: string,
    budget: Budget,
    sort?: number
  ): Promise<CategoryGroup> {
    const group = new CategoryGroup();
    group.name = name;
    group.budget = Promise.resolve(budget);
    group.sort = sort ?? (await budget.categoryGroups).length;
    await getRepository(CategoryGroup).save(group);
    return group;
  }

  public static async find(id: string, budget: Budget): Promise<CategoryGroup> {
    const group = await getRepository(CategoryGroup)
      .createQueryBuilder('group')
      .leftJoin('group.budget', 'budget')
      .where('group.id = :id', { id })
      .andWhere('budget.id = :budgetId', { budgetId: budget.id })
      .getOne();

    if (!group) {
      throw new UserInputError('Group not found', { invalidArgs: ['id'] });
    }

    return group;
  }

  public async delete(): Promise<boolean> {
    try {
      await getRepository(CategoryGroup).remove(this);
      return true;
    } catch {
      return false;
    }
  }

  public async rename(name: string): Promise<this> {
    this.name = name;
    await getRepository(CategoryGroup).save(this);
    return this;
  }

  public async changeSort(index: number): Promise<CategoryGroup[]> {
    const budget = await this.budget;
    const groups = await budget.categoryGroups;

    // sort the groups before modification
    groups.sort((a, b) => {
      if (a.sort > b.sort) return 1;
      if (a.sort < b.sort) return -1;
      return 0;
    });

    const currentIndex = groups.findIndex(g => g.id === this.id);
    if (!~currentIndex) return [];

    groups.splice(currentIndex, 1);
    groups.splice(index, 0, this);

    for (let i = 0; i < groups.length; i += 1) {
      groups[i].sort = i;
    }

    await getRepository(CategoryGroup).save(groups);

    return groups;
  }

  @BeforeInsert()
  @BeforeUpdate()
  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
