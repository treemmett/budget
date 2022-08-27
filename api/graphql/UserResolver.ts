import { Arg, Mutation, Resolver } from 'type-graphql';
import CreateUserInput from '../inputs/CreateUserInput';
import LoginInput from '../inputs/LoginInput';
import User from '../entities/User';

@Resolver(() => User)
export default class UserResolver {
  @Mutation(() => User)
  public createUser(@Arg('data') data: CreateUserInput): Promise<User> {
    return User.create(data);
  }

  @Mutation(() => String)
  public login(@Arg('credentials') credentials: LoginInput): Promise<string> {
    return User.login(credentials);
  }
}
