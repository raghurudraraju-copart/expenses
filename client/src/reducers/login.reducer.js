import initialState from '../initialStates/login.js';

export function login(state = initialState , action){
  switch(action.type){
    case "Login_User":
      return {...state,
        userDetails : action.payload.data,
        logginIn : false,
        logged : true
      };
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
