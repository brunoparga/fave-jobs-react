import { combineReducers } from 'redux';
import jobsReducer from '../ducks/jobs';

const rootReducer = combineReducers({ jobs: jobsReducer });
export default rootReducer;
