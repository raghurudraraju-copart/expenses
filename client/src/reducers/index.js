import { combineReducers } from 'redux';

import { login } from './login.reducer';
import { userTransactions } from './userTransactions.reducer';
import { userPayments } from './userPayments.reducer';

const rootReducer = combineReducers({
  login , userTransactions, userPayments
});

export default rootReducer;
