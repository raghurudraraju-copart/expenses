import {
  history
} from '../helpers/history.js';
import axios from 'axios';


export const loginActions = {
  login
};

function login(username, password) {
  return dispatch => {
    const requestOptions = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        "username": username,
        "password": password
      }
    };

    axios.post('http://localhost:5000/login', requestOptions.body)
      .then(res => {
        const userDetails = res.data;
        console.log('Login User Details ', userDetails.username, userDetails.role);        
          dispatch(success(userDetails));
          history.push('/home');
       })
      .catch(function(error) {
        dispatch(failure());
      });
  }

  function success(userDetails) {
    return {
      type: "Login_User",
      payload: userDetails
    }
  }

  function failure() {
    return {
      type: "Login_Failure"
    }
  }

}
