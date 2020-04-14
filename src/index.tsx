import './index.scss';
import React, { FC } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import Budget from './views/Budget/Budget';
import Budgets from './views/Budgets/Budgets';
import Categories from './views/Categories/Categories';
import Login from './views/Login/Login';
import { Router } from '@reach/router';
import { Toaster } from './components/Toast/Toast';
import Transactions from './views/Transactions/Transcations';
import client from './graph/client';
import { render } from 'react-dom';

const App: FC = () => (
  <Toaster>
    <ApolloProvider client={client}>
      <Router>
        <Budgets path="/" />
        <Login path="/login" />
        <Login path="/register" />
        <Budget path="/:budgetId">
          <Categories path="/" />
          <Transactions path="/transactions" />
        </Budget>
      </Router>
    </ApolloProvider>
  </Toaster>
);

render(<App />, document.getElementById('root'));
