import {
  Arg,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  Resolver,
  Root
} from 'type-graphql';
import HttpException from '../utils/HttpException';
import Token from '../entities/Token';
import User from '../entities/User';
import bcrypt from 'bcryptjs';
import { getManager } from 'typeorm';

@InputType({ description: 'New user data' })
class CreateUserInput {
  @Field()
  public email: string;

  @Field()
  public password: string;

  @Field()
  public firstName: string;

  @Field()
  public lastName: string;
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
  public async createUser(@Arg('data') data: CreateUserInput): Promise<User> {
    const user = new User();
    user.email = data.email;
    user.firstName = data.firstName;
    user.lastName = data.lastName;

    // hash password through bcrypt
    const hash = await bcrypt.hash(data.password, 10);

    user.hash = Buffer.from(hash);

    await getManager().save(user);

    return user;
  }

  @Mutation(() => User)
  public async login(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<User> {
    const user = await getManager().findOne(User, { where: { email } });

    if (!user) {
      throw new HttpException({
        error: 'unauthorized_request',
        message: 'Email not registered',
        status: 401
      });
    }

    const hashMatch = await bcrypt.compare(password, user.hash.toString());

    if (!hashMatch) {
      throw new HttpException({
        error: 'unauthorized_request',
        message: 'Incorrect password.',
        status: 401
      });
    }

    return user;
  }
}
