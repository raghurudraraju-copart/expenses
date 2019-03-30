import initialState from '../initialStates/home.js';

export function home(state = initialState , action){
  switch(action.type){
    case "USER_EXPENSES":
      return {...state,
        userTransactions : action.payload.userTransactions,
        userPayments : action.payload.userPayments,
      };
    default:
      return state;
  }
}
