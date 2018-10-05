import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    users: [],
    usersList: [],
    transcationsTypes: [],
    paymentModes: []
  }

  componentDidMount() {

    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));

    fetch('http://localhost:5000/usersList')
        .then(res => res.json())
        .then(usersList => this.setState({ usersList }));

    fetch('http://localhost:5000/transcationsTypes')
      .then(res => res.json())
      .then(transcationsTypes => this.setState({ transcationsTypes }));

    fetch('http://localhost:5000/paymentModes')
      .then(res => res.json())
      .then(paymentModes => this.setState({ paymentModes }));

    };

  render() {
    return (
      <div className="App" >
        <div class="DB_data" >
          <p class="ui-users"><b>Users</b></p>
          {this.state.users.map(user =>
            <div class="ui-users">{user.id}) {user.username}</div>
          )}
          <br/>
            <p class="ui-users"><b>UsersList </b></p>
            {this.state.usersList.map(usersList =>
              <div class="ui-users">{usersList.id}) {usersList.userName}</div>
            )}
            <br/>
          <p class="ui-transcations_types"><b>Transcations Types</b></p>
          {this.state.transcationsTypes.map(transcationsTypes =>
            <div class="ui-transcations_types">{transcationsTypes.id}) {transcationsTypes.type}</div>
          )}
          <br/>
          <p class="ui-payment_modes"><b>Payment Types</b></p>
          {this.state.paymentModes.map(paymentModes =>
            <div class="ui-payment_modes">{paymentModes.id}) {paymentModes.type}</div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
