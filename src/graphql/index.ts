import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import config from '../utils/config';
import path from 'path';

async function generateGQL(): Promise<ApolloServer> {
  const schema = await buildSchema({
    resolvers: [
      path.join(__dirname, '/**/*Resolver.ts'),
      path.join(__dirname, '/**/*Resolver.js')
    ]
  });

  const apollo = new ApolloServer({
    schema,
    playground: config.DEVELOPMENT
  });

  return apollo;
}

export default generateGQL;
