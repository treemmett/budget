import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
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
    playground: process.env.NODE_ENV === 'development'
  });

  return apollo;
}

export default generateGQL;
