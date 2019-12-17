import {
  Arg,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
  Root
} from 'type-graphql';
import HttpException from '../utils/HttpException';
import Token from '../entities/Token';
import User from '../entities/User';
import bcrypt from 'bcryptjs';
import config from '../utils/config';
import { getManager } from 'typeorm';
import jwt from 'jsonwebtoken';
import uuid from 'uuid/v4';

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

  @Mutation(() => LoginToken)
  public async login(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<LoginToken> {
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

    // generate jwt
    const token = new Token();
    token.jti = uuid();
    token.expires = new Date(Date.now() + 1000 * 60 * 60);
    token.user = user;

    const signedToken = jwt.sign(
      {
        exp: Math.floor(token.expires.getTime() / 1000)
      },
      config.JWT_SECRET,
      {
        jwtid: token.jti,
        subject: user.id
      }
    );

    await getManager().save(Token, token);

    return {
      token,
      user,
      jwt: signedToken
    };
  }
}
