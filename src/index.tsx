import './index.scss';
import React, { FC } from 'react';
import Apollo from './Apollo';
import Budget from './views/Budget/Budget';
import Budgets from './views/Budgets/Budgets';
import Categories from './views/Categories/Categories';
import Login from './views/Login/Login';
import { Router } from '@reach/router';
import { Toaster } from './components/Toast/Toast';
import Transactions from './views/Transactions/Transcations';
import { render } from 'react-dom';

const App: FC = () => {
  return (
    <Toaster>
      <Router>
        <Apollo path="/">
          <Budgets path="/" />
          <Login path="/login" />
          <Login path="/register" />
          <Budget path="/:budgetId">
            <Categories path="/" />
            <Transactions path="/transactions" />
          </Budget>
        </Apollo>
      </Router>
    </Toaster>
  );
};

render(<App />, document.getElementById('root'));
