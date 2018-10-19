import { combineReducers } from 'redux';

import { login } from './login.reducer';
import { userTransactions } from './userTransactions.reducer';

const rootReducer = combineReducers({
  login , userTransactions
});

export default rootReducer;
