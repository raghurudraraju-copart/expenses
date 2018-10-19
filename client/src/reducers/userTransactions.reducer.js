import initialState from '../initialStates/userTransactions.js';
export function userTransactions(state = initialState, action) {
  switch (action.type) {
    case "USER_TRANSACTIONS":
      return {
        ...state,
        userTransactions: action.payload.result,
        pages : action.payload.pages
      };
    default:
      return state;
  }
}
