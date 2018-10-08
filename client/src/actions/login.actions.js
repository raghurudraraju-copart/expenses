import {history} from '../helpers/history.js';
import axios from 'axios';

export const loginActions = {
    login
};

function login(username, password) {
  return dispatch => {
  const requestOptions = {
      headers: { 'Content-Type': 'application/json' },
      body: {"username": username, "password": password}
  };

  axios.post('https://g-ops-qa4.copart.com/login', requestOptions.body)
  .then(res => {
    const userDetails = res.data;
    dispatch(success());
    history.push('/master');
  })
  .catch(function (error) {
    dispatch(failure());
  });
}

  function success() { return { type: "Master_Page" } }
  function failure() { return { type: "Login_Failure" } }

 }
}
