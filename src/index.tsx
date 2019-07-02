import './index.scss';
import * as serviceWorker from './serviceWorker';
import Budget from './views/Budget';
import Login from './views/Login';
import NavBar from './components/NavBar';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Register from './views/Register';
import { Router } from '@reach/router';
import Toaster from './components/Toaster';
import Transactions from './views/Transactions';
import navStyles from './components/NavBar.module.scss';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <Toaster />
    <NavBar />
    <Router className={navStyles.next}>
      <Budget path="/" />
      <Login path="/login" />
      <Register path="/register" />
      <Transactions path="/transactions" />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
