import initialState from '../initialStates/home.js';
export function home(state = initialState , action){
  switch(action.type){
    case "HOME_PAGE":
          return {...state,
            users:action.payload.users,
            usersList:action.payload.usersList,
            transcationsTypes:action.payload.transcationsTypes,
            paymentModes:action.payload.paymentModes,
          };
    default:
      return state;
  }
}
