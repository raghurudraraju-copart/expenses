import React, { Component } from 'react';
import { history } from './helpers/history.js';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

// import Home from './home/home';
import Home from './container/Home/Home';
import Login from './login/Login';
import { store } from './store.js'

import './App.css';

class App extends Component {

  render(){
    return(
      <div>
      <Provider store={store}>
        <Router history = {history}>
          <Switch>
                  <Route path="/home" component={Home} />
                  <Route exact path="/" component={Login} />
          </Switch>
        </Router>
      </Provider>
      </div>
    );
  }
}

export default App;
