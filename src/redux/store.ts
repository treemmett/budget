import {
  Middleware,
  applyMiddleware,
  combineReducers,
  createStore
} from 'redux';
import authentication from './reducers/authentication';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

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
