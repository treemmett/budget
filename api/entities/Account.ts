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
import { IsNotEmpty, MaxLength, validateOrReject } from 'class-validator';
import Budget from './Budget';
import { UserInputError } from 'apollo-server-core';

@Entity()
@ObjectType()
export default class Account {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  public readonly id: string;

  @MaxLength(62)
  @IsNotEmpty()
  @Column({ length: 62 })
  @Field()
  public name: string;

  @ManyToOne(() => Budget, budget => budget.accounts)
  public budget: Promise<Budget>;

  public static async create(budget: Budget, name: string): Promise<Account> {
    const account = new Account();
    account.budget = Promise.resolve(budget);
    account.name = name;
    await getRepository(Account).save(account);
    return account;
  }

  public static async find(budget: Budget, id: string): Promise<Account> {
    const account = await getRepository(Account)
      .createQueryBuilder('account')
      .leftJoin('account.budget', 'budget')
      .where('account.id = :id', { id })
      .andWhere('budget.id = :budgetId', { budgetId: budget.id })
      .getOne();

    if (!account) {
      throw new UserInputError('Category not found', { properties: ['id'] });
    }

    return account;
  }

  public async delete(): Promise<boolean> {
    await getRepository(Account).remove(this);
    return true;
  }

  public async rename(name: string): Promise<this> {
    this.name = name;
    await getRepository(Account).save(this);
    return this;
  }

  @BeforeInsert()
  @BeforeUpdate()
  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
