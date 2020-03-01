import './index.scss';
import React, { FC } from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from '@apollo/react-hooks';
import Budget from './views/Budgets/Budgets';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Login from './views/Login/Login';
import { Router } from '@reach/router';
import { onError } from 'apollo-link-error';
import { render } from 'react-dom';

const client = new ApolloClient({
  link: ApolloLink.from([
    new ApolloLink((operation, forward) => {
      // add authorization
      operation.setContext({
        headers: {
          Authorization: localStorage.getItem('token') || null
        }
      });

      return forward(operation);
    }),
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
          // eslint-disable-next-line no-console
          console.log(`[GraphQL error]:`, { message, locations, path });
        });
      }

      if (networkError) {
        // eslint-disable-next-line no-console
        console.log(`[Network error]:`, networkError);
      }
    }),
    new HttpLink({
      uri: `${window.location.origin}/api/graphql`,
      credentials: 'same-origin'
    })
  ]),
  cache: new InMemoryCache()
});

const App: FC = () => (
  <ApolloProvider client={client}>
    <Router>
      <Budget path="/" />
      <Login path="/login" />
      <Login path="/register" />
    </Router>
  </ApolloProvider>
);

render(<App />, document.getElementById('root'));
