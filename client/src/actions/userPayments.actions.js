import axios from 'axios';


export const userPaymentActions = {
  loadUserPayments,
  createPayment,
  changePageSize,
  changePage,
  addingPayment
};


function createPayment(paymentBody, pageSize, page) {
  return dispatch => {
    axios.post('http://localhost:5000/addUserPayment', paymentBody)
      .then(res => {
        const payload = {
          page : 0,
          pageSize : 5,
          addPayment: false
        }
        dispatch({
          type: "PAYMENT_CREATED",
          payload
        })
        dispatch(loadUserPayments(paymentBody.username, 20, 0));
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

function addingPayment(isAdding){
  return dispatch => {
    const payload = {isAdding};
    dispatch({
      type: "ADDING_PAYMENT",
      payload
    })
  }
}


function loadUserPayments(username, pageSize, page) {
  return dispatch => {
    Promise.all([
      axios.get("http://localhost:5000/paymentModes"),
      axios.get("http://localhost:5000/getUserPayments?username=" + username),
      axios.get("http://localhost:5000/getUserPaymentsLength?username=" + username),
    ]).then(([paymentTypes, userPayments, totalCountRes]) => {
      const pages = Math.ceil(totalCountRes.data.noOfRecords / pageSize);
      const payload = {
        paymentTypes: paymentTypes.data,
        userPayments: userPayments.data,
        pages
      }
      dispatch({
        type: "USER_PAYMENTS",
        payload
      });
    }
    ).catch((err) => {
      console.log(err);
    });
  }
}
