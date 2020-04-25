import { ApolloServer } from 'apollo-server-express';
import { Request } from 'express';
import User from '../entities/User';
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
      const ctx: Context = {};

      if (req?.headers?.authorization) {
        ctx.user = await User.validateToken(req.headers.authorization);
      }

      return ctx;
    },
    playground: config.DEVELOPMENT,
    schema,
  });

  return apollo;
}

export default generateGQL;
