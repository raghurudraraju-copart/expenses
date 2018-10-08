import initialState from '../initialStates/login.js';

export function login(state = initialState , action){
  switch(action.type){
    case "Master_Page":
      return state;
    case "Login_Failure":
      return {...state ,
         loginFailed : true
       };
    case "Login_Request":
        return {
          ...state,
          logginIn : true
        };
    default:
      return state;
  }
}
