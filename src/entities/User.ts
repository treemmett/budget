import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import Token from './Token';

@ObjectType({ description: 'User account' })
@Entity({ name: 'users' })
export default class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field({ description: 'Email address of the user' })
  @Column()
  @Index({ unique: true })
  public email: string;

  @Field({ description: 'First name of user' })
  @Column()
  public firstName: string;

  @Field({ description: 'Last name of user' })
  @Column()
  public lastName: string;

  @Column({ type: 'bytea' })
  public hash: Buffer;

  @Field({ description: 'Date the user was registered' })
  @CreateDateColumn()
  public dateCreated: Date;

  @Field(() => [Token], {
    description: 'List of access tokens assigned to the user'
  })
  @OneToMany(
    () => Token,
    token => token.user
  )
  public tokens: Token[];
}
