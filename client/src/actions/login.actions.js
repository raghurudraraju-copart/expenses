import { history} from '../helpers/history.js';
import axios from 'axios';


export const loginActions = {
  login
};

function loadUserExpenses(username, pageSize, page) {
  return dispatch => {
    Promise.all([
      axios.get("http://localhost:5000/getUserTransactions?username=" + username + "&pageNumber=" + page + "&pageSize=" + pageSize),
      axios.get("http://localhost:5000/getUserPayments?username=" + username)
    ]).then(([userTransactions, userPayments]) => {
      const payload = {
        userTransactions: userTransactions.data.result,
        userPayments: userPayments.data.result,
      }
      dispatch({
        type: "USER_EXPENSES",
        payload
      });
    }
    ).catch((err) => {
      console.log(err);
    });
  }
}

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
        const userDetails = res.data.userDetails;
        dispatch(success(userDetails));
        dispatch(loadUserExpenses(userDetails.username, 100, 0));

        localStorage.setItem('userDetails', JSON.stringify(res.data)); // storing userdetails in localStorageObject

        history.push('/home');
      })
      .catch(function (error) {
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
