/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { FC, useRef } from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from '@apollo/react-hooks';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { toIdValue } from 'apollo-utilities';
import { useNavigate } from '@reach/router';
import { useToasts } from './components/Toast/Toast';

const Apollo: FC<{
  /** path isn't used, this is just to ensure it's rendered by @reach/router */
  path?: '/';
}> = ({ children }) => {
  const toast = useToasts();
  const nav = useNavigate();

  // create a new client
  const client = useRef(
    new ApolloClient({
      cache: new InMemoryCache({
        cacheRedirects: {
          Budget: {
            category: (root, args) =>
              toIdValue({ id: args.id, typename: 'TransactionCategory' }),
          },
          CategoryGroup: {
            allocation: (root, args) =>
              toIdValue({
                id: `${root.id}-${
                  args?.date?.year ?? new Date().getFullYear()
                }-${args?.date?.month ?? new Date().getMonth()}`,
                typename: 'Allocation',
              }),
            categories: (root, args) =>
              toIdValue({ id: args.id, typename: 'TransactionCategory' }),
          },
          Query: {
            budget: (root, args) =>
              toIdValue({ id: args.id, typename: 'Budget' }),
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

        onError(({ graphQLErrors, networkError }) => {
          if (networkError) {
            toast.addToast({
              message: networkError.message,
              status: 'error',
              title: 'Network Error',
            });
          }

          graphQLErrors?.forEach(error => {
            if (error.extensions.code === 'UNAUTHENTICATED') {
              nav('/login', { replace: true }).catch(() => {
                window.location.href = '/login';
              });
            }

            toast.addToast({
              message: error.message,
              status: 'error',
            });
          });
        }),

        new HttpLink({
          credentials: 'same-origin',
          uri: `${window.location.origin}/api/graphql`,
        }),
      ]),

      resolvers: {},
    })
  );

  if (!client.current) return null;

  return <ApolloProvider client={client.current}>{children}</ApolloProvider>;
};

export default Apollo;
