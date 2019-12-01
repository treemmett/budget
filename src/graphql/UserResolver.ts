import { FieldResolver, Resolver, Root } from 'type-graphql';
import Token from '../entities/Token';
import User from '../entities/User';
import { getManager } from 'typeorm';

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
}
