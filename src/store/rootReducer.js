import { combineReducers } from 'redux';
// import * as reducers from '../ducks/index';
import jobsReducer from '../ducks/jobs';

const rootReducer = combineReducers({ jobs: jobsReducer });
export default rootReducer;
