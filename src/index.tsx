import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Router } from '@reach/router';
import App from './views/App';
import Login from './views/Login';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
    <App path="/foo" />
    <Login path="/login" />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
