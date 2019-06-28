import {
  Middleware,
  combineReducers,
  createStore,
  applyMiddleware
} from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import authentication from './reducers/authentication';

const reducers = combineReducers({
  authentication
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
