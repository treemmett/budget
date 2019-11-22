import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import User from './User';

@ObjectType({ description: 'User access token' })
@Entity({ name: 'tokens' })
export default class Token {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field({ description: 'JWT token id' })
  @Column()
  @Index({ unique: true })
  public jti: string;

  @Field({ description: 'Date the token is set to expire' })
  @Column()
  public expires: Date;

  @Field({ description: 'Date the token was issued' })
  @CreateDateColumn()
  public issued: Date;

  @Field({ description: 'Date the token was last refreshed' })
  @UpdateDateColumn()
  public lastUsed: Date;

  @Field(() => User, { description: 'The tokens owning user' })
  @ManyToOne(
    () => User,
    user => user.tokens
  )
  public user: User;
}
