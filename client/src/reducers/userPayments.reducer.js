import initialState from '../initialStates/userPayments.js';
export function userPayments(state = initialState, action) {
  switch (action.type) {
    case "USER_PAYMENTS":
      return {
        ...state,
        pages: action.payload.pages,
        paymentTypes: action.payload.paymentTypes,
        userPayments: action.payload.userPayments.result
      };
    case "PAYMENT_CREATED":
      return {
        ...state,
        page: action.payload.page,
        pageSize: action.payload.pageSize,
        addPayment: action.payload.addPayment
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
    case "ADDING_PAYMENT":
    return {
      ...state,
      addPayment: action.payload.isAdding
    }
    default:
      return state;
  }
}
