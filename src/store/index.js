/* eslint no-underscore-dangle: ["error",
  { "allow": ["__REDUX_DEVTOOLS_EXTENSION__"] }] */
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

window.__REDUX_DEVTOOLS_EXTENSION__ = window.__REDUX_DEVTOOLS_EXTENSION__
  || function id(x) { return x; };

const middlewares = [
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__(),
].filter((fn) => fn !== undefined && fn !== null);

const createStoreWithMiddleware = compose(...middlewares)(createStore);
export default createStoreWithMiddleware(rootReducer);
