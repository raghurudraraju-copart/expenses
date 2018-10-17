import axios from 'axios';


export const homeActions = {
  loadHomePageData,
  loadUserTransactions
};

function loadHomePageData(){
  return dispatch => {
    Promise.all([
      axios.get("http://localhost:5000/users"),
      axios.get("http://localhost:5000/usersList"),
      axios.get("http://localhost:5000/transcationsTypes"),
      axios.get("http://localhost:5000/paymentModes"),
    ]).then(([users, usersList, transcationsTypes, paymentModes]) => {
      console.log(users, usersList, transcationsTypes, paymentModes);
        const payload = {
          users : users.data , usersList : usersList.data, transcationsTypes : transcationsTypes.data, paymentModes : paymentModes.data
        }
        dispatch(success(payload));

    }).catch((err) => {
      console.log(err);
    });
  }

  function success(payload){ return {
    type: "HOME_PAGE",
    payload
  }}
}


function loadUserTransactions(username){
  return dispatch => {
   axios.get("http://localhost:5000/getUserTransactions?username="+username).then(res => {
        const payload = res.data;
        dispatch({
            type: "USER_TRANSACTIONS",
            payload
          });
       }
      ).catch((err) => {
      console.log(err);
    });
  }
}