import { FieldResolver, Resolver, Root } from 'type-graphql';
import HttpException from '../utils/HttpException';
import Token from '../entities/Token';
import User from '../entities/User';
import { getManager } from 'typeorm';

@Resolver(() => Token)
export default class TokenResolver {
  @FieldResolver(() => User)
  public async user(@Root() parent: Token): Promise<User> {
    const user = await getManager()
      .createQueryBuilder(User, 'user')
      .leftJoin('user.tokens', 'token')
      .where('token.id = :tokenId', { tokenId: parent.id })
      .getOne();

    if (!user) {
      throw new HttpException({
        error: 'invalid_request',
        message: 'User not found.',
        status: 404,
      });
    }

    return user;
  }
}
