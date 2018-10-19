import axios from 'axios';


export const userTransactionActions = {
  loadUserTransactions
};


function loadUserTransactions(username, pageSize, page) {
  return dispatch => {
    axios.get("http://localhost:5000/getUserTransactions?username=" + username + "&pageNumber=" + page + "&pageSize=" + pageSize).then(res => {
      const payload = res.data;
      const pages = Math.ceil(payload.totalCount/pageSize);
      payload.pages = pages;
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