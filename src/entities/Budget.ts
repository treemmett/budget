import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  getRepository,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { MaxLength, validateOrReject } from 'class-validator';
import CategoryGroup from './CategoryGroup';
import User from './User';
import { UserInputError } from 'apollo-server-express';

@ObjectType({ description: 'Budget' })
@Entity({ name: 'budgets' })
export default class Budget {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Field({ description: 'Name of the budget' })
  @MaxLength(62)
  @Column({ length: 62 })
  public name: string;

  @Field(() => User, { description: "Budget's owner" })
  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @Index()
  public user: Promise<User>;

  @Field(() => [CategoryGroup], {
    description: 'All category groups within the budget',
  })
  @OneToMany(() => CategoryGroup, group => group.budget)
  public categoryGroups: Promise<CategoryGroup[]>;

  public static async create(name: string, user: User): Promise<Budget> {
    const budget = new Budget();
    budget.name = name;
    budget.user = Promise.resolve(user);
    await getRepository(Budget).save(budget);
    return budget;
  }

  public static async find(id: string, user: User): Promise<Budget> {
    const budget = await getRepository(Budget).findOne(id, { where: { user } });

    if (!budget) {
      throw new UserInputError('Budget not found', { invalidArgs: ['id'] });
    }

    return budget;
  }

  public async delete(): Promise<boolean> {
    await getRepository(Budget).remove(this);
    return true;
  }

  public async rename(name: string): Promise<this> {
    this.name = name;
    await getRepository(Budget).save(this);
    return this;
  }

  @BeforeInsert()
  @BeforeUpdate()
  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
