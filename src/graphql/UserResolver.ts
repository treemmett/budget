import { Arg, Mutation, Resolver } from 'type-graphql';
import CreateUserInput from '../inputs/CreateUserInput';
import User from '../entities/User';

@Resolver()
export default class UserResolver {
  @Mutation(() => User)
  public createUser(@Arg('data') data: CreateUserInput): Promise<User> {
    return User.create(data);
  }
}
