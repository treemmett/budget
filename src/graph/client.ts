/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { toIdValue } from 'apollo-utilities';

const client = new ApolloClient({
  cache: new InMemoryCache({
    cacheRedirects: {
      Budget: {
        category: (root, args) =>
          toIdValue({ id: args.id, typename: 'TransactionCategory' }),
        categoryGroups: (root, args) =>
          toIdValue({ id: args.id, typename: 'CategoryGroup' }),
      },
      CategoryGroup: {
        allocation: (root, args) =>
          toIdValue({
            id: `${root.id}-${args?.date?.year ?? new Date().getFullYear()}-${
              args?.date?.month ?? new Date().getMonth()
            }`,
            typename: 'Allocation',
          }),
        categories: (root, args) =>
          toIdValue({ id: args.id, typename: 'TransactionCategory' }),
      },
      Query: {
        budget: (root, args) => toIdValue({ id: args.id, typename: 'Budget' }),
        categoryGroup: (root, args) =>
          toIdValue({ id: args.id, typename: 'CategoryGroup' }),
      },
    },
    dataIdFromObject: foo => foo.id,
  }),

  link: ApolloLink.from([
    new ApolloLink((op, next) => {
      // add authorization
      op.setContext({
        headers: {
          Authorization: localStorage.getItem('token') || null,
        },
      });

      return next(op);
    }),

    new HttpLink({
      credentials: 'same-origin',
      uri: `${window.location.origin}/api/graphql`,
    }),
  ]),

  resolvers: {},
});

export default client;
