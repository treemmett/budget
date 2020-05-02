import { ApolloServer } from 'apollo-server-express';
import { ContextFunction } from 'apollo-server-core';
import { GraphQLSchema } from 'graphql';
import { Request } from 'express';
import User from '../entities/User';
import { buildSchema } from 'type-graphql';
import config from '../utils/config';
import path from 'path';

export interface Context {
  user?: User;
}

const schemaTask: Promise<GraphQLSchema> = new Promise((res, rej) => {
  buildSchema({
    emitSchemaFile: true,
    resolvers: [
      path.join(__dirname, '/**/*Resolver.ts'),
      path.join(__dirname, '/**/*Resolver.js'),
    ],
  })
    .then(schema => res(schema))
    .catch(err => rej(err));
});

const generateGQL = async (
  context?: Context | ContextFunction<unknown, Context>
): Promise<ApolloServer> =>
  new ApolloServer({
    context:
      context ??
      (async ({ req }: { req: Request }): Promise<Context> => {
        const ctx: Context = {};

        if (req?.headers?.authorization) {
          const user = await User.validateToken(
            req.headers.authorization
          ).catch(() => {});

          if (user) {
            ctx.user = user;
          }
        }

        return ctx;
      }),
    playground: config.NODE_ENV === 'development',
    schema: await schemaTask,
  });

export default generateGQL;
