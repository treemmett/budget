import { ApolloServer } from 'apollo-server-express';
import { Request } from 'express';
import User from '../entities/User';
import UserController from '../controllers/UserController';
import { buildSchema } from 'type-graphql';
import config from '../utils/config';
import path from 'path';

export interface Context {
  user?: User;
}

async function generateGQL(): Promise<ApolloServer> {
  const schema = await buildSchema({
    emitSchemaFile: true,
    resolvers: [
      path.join(__dirname, '/**/*Resolver.ts'),
      path.join(__dirname, '/**/*Resolver.js'),
    ],
  });

  const apollo = new ApolloServer({
    context: async ({ req }: { req: Request }): Promise<Context> => {
      const [user] = await Promise.all([
        UserController.verifyToken(req.get('authorization')),
      ]);

      const ctx: Context = {
        user: user || undefined,
      };

      return ctx;
    },
    playground: config.DEVELOPMENT,
    schema,
  });

  return apollo;
}

export default generateGQL;
