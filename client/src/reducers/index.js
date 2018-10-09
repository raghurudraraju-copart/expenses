import { combineReducers } from 'redux';

import { login } from './login.reducer';
import { home } from './home.reducer';

const rootReducer = combineReducers({
  login , home
});

export default rootReducer;
