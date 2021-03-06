import React, { Component } from 'react';
import { history } from './helpers/history.js';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Home from './components/Home/Home.js';
import Login from './container/Login/Login';
import UserTransactions from './container/UserTransactions/UserTransactions';
import UserPayments from './container/UserPayments/UserPayments';
import { store } from './store.js'
import { BrowserRouter } from 'react-router-dom';

import './App.css';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/userTransactions" component={UserTransactions} />
              <Route path="/userPayments" component={UserPayments} />
              <Route exact path="/" component={Login} />
            </Switch>
          </Router>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
