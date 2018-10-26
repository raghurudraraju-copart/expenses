import axios from 'axios';


export const userTransactionActions = {
  loadUserTransactions,
  createTransaction,
  changePageSize,
  changePage,
  addingTransaction
};


function createTransaction(transaction, pageSize, page) {
  return dispatch => {
    axios.post('http://localhost:5000/createTransaction', transaction)
      .then(res => {
        const payload = {
          page : 0,
          pageSize : 20,
          addTransaction: false
        }
        dispatch({
          type: "TRANSACTION_CREATED",
          payload
        })
        dispatch(loadUserTransactions(transaction.username, 20, 0));
      }).catch(err => {
        console.log(err);
      })
  }
}

function changePageSize(pageSize, pageIndex){
  return dispatch => {
    const payload = {pageSize, page:pageIndex};
    dispatch({
      type: "PAGE_SIZE_CHANGED",
      payload
    })
  }
}

function changePage(pageIndex){
  return dispatch => {
    const payload = {page:pageIndex};
    dispatch({
      type: "PAGE_CHANGED",
      payload
    })
  }
}

function addingTransaction(isAdding){
  return dispatch => {
    const payload = {isAdding};
    dispatch({
      type: "ADDING_TRANSACTION",
      payload
    })
  }
}


function loadUserTransactions(username, pageSize, page) {
  return dispatch => {
    // axios.get("http://localhost:5000/getUserTransactions?username=" + username + "&pageNumber=" + page + "&pageSize=" + pageSize).then(res => {
    //   const payload = res.data;
    //   const pages = Math.ceil(payload.totalCount/pageSize);
    //   payload.pages = pages;
    Promise.all([
      axios.get("http://localhost:5000/getUserTransactions?username=" + username + "&pageNumber=" + page + "&pageSize=" + pageSize),
      axios.get("http://localhost:5000/transactionTypes"),
      axios.get("http://localhost:5000/getUserPayments?username=" + username),
      axios.get("http://localhost:5000/getUserTransactionsLength?username=" + username),
    ]).then(([userTransactions, transactionTypes, paymentModes, totalCountRes]) => {
      const pages = Math.ceil(totalCountRes.data.noOfRecords / pageSize);
      const payload = {
        userTransactions: userTransactions.data,
        transactionTypes: transactionTypes.data,
        paymentModes: paymentModes.data,
        pages
      }
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