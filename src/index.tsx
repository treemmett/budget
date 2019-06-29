import './index.css';
import * as serviceWorker from './serviceWorker';
import Budget from './views/Budget';
import Login from './views/Login';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Register from './views/Register';
import { Router } from '@reach/router';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Budget path="/" />
      <Login path="/login" />
      <Register path="/register" />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
