import {
  Arg,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
  Root,
} from 'type-graphql';
import { IsEmail } from 'class-validator';
import Token from '../entities/Token';
import User from '../entities/User';
import UserController from '../controllers/UserController';
import { getManager } from 'typeorm';

@InputType({ description: 'New user data' })
class CreateUserInput {
  @IsEmail()
  @Field()
  public email: string;

  @Field()
  public password: string;

  @Field()
  public firstName: string;

  @Field()
  public lastName: string;
}

@ObjectType({ description: 'Token details for authorization' })
class LoginToken {
  @Field({ description: 'The authorization token' })
  public jwt: string;

  @Field({ description: 'Token details' })
  public token: Token;

  @Field({ description: 'Details about the logged in user' })
  public user: User;
}

@Resolver(() => User)
export default class UserResolver {
  @FieldResolver(() => Token)
  public tokens(@Root() parent: User): Promise<Token[]> {
    return getManager()
      .createQueryBuilder(Token, 'token')
      .leftJoin('token.user', 'user')
      .where('user.id = :userId', { userId: parent.id })
      .getMany();
  }

  @Mutation(() => User)
  public createUser(@Arg('data') data: CreateUserInput): Promise<User> {
    return UserController.createUser(
      data.email,
      data.firstName,
      data.lastName,
      data.password
    );
  }

  @Mutation(() => LoginToken)
  public login(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<LoginToken> {
    return UserController.login(email, password);
  }
}
