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
import { Toaster } from './components/Toast/Toast';
import { render } from 'react-dom';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    new ApolloLink((operation, forward) => {
      // add authorization
      operation.setContext({
        headers: {
          Authorization: localStorage.getItem('token') || null,
        },
      });

      return forward(operation);
    }),
    new HttpLink({
      credentials: 'same-origin',
      uri: `${window.location.origin}/api/graphql`,
    }),
  ]),
});

const App: FC = () => (
  <Toaster>
    <ApolloProvider client={client}>
      <Router>
        <Budget path="/" />
        <Login path="/login" />
        <Login path="/register" />
      </Router>
    </ApolloProvider>
  </Toaster>
);

render(<App />, document.getElementById('root'));
