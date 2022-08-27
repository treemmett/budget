import {
  Middleware,
  applyMiddleware,
  combineReducers,
  createStore
} from 'redux';
import authentication from './reducers/authentication';
import budget from './reducers/budget';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import toaster from './reducers/toaster';

const reducers = combineReducers({
  authentication,
  budget,
  toasts: toaster
});

const middlewaresToAdd: Middleware[] = [thunk];

if (process.env.NODE_ENV === 'development') {
  middlewaresToAdd.push(createLogger({ collapsed: true }));
}

const middleware = applyMiddleware(...middlewaresToAdd);

const store = createStore(reducers, middleware);

const defaultState = store.getState();
export type State = typeof defaultState;
export default store;
