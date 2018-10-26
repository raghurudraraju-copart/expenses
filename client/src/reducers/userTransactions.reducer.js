import initialState from '../initialStates/userTransactions.js';
export function userTransactions(state = initialState, action) {
  switch (action.type) {
    case "USER_TRANSACTIONS":
      return {
        ...state,
        userTransactions: action.payload.userTransactions.result,
        pages: action.payload.pages,
        transactionTypes: action.payload.transactionTypes,
        paymentModes: action.payload.paymentModes.result
      };
    case "TRANSACTION_CREATED":
      return {
        ...state,
        page: action.payload.page,
        pageSize: action.payload.pageSize,
        addTransaction: action.payload.addTransaction
      }
    case "PAGE_SIZE_CHANGED":
      return {
        ...state,
        page: action.payload.page,
        pageSize: action.payload.pageSize
      }
    case "PAGE_CHANGED":
      return {
        ...state,
        page: action.payload.page
      }
    case "ADDING_TRANSACTION":
    return {
      ...state,
      addTransaction: action.payload.isAdding
    }
    default:
      return state;
  }
}
