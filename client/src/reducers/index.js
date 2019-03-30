import { combineReducers } from 'redux';

import { login } from './login.reducer';
import { home } from './home.reducer';
import { userTransactions } from './userTransactions.reducer';
import { userPayments } from './userPayments.reducer';

const rootReducer = combineReducers({
  login, home, userTransactions, userPayments
});

export default rootReducer;
