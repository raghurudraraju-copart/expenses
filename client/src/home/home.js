import React, {Component} from 'react';
import { connect } from 'react-redux';
import { homeActions } from '../actions/home.actions.js';

class Home extends Component{

    constructor(props) {
    super(props);

    }

    componentDidMount(){

        const { dispatch } = this.props;
        dispatch(homeActions.loadHomePageData());
    }

    render() {
      return (
        <div className="App" >
          <div class="DB_data" >
            <p class="ui-users"><b>Users</b></p>
            {this.props.users.map(user =>
              <div class="ui-users">{user.id}) {user.username}</div>
            )}
            <br/>
              <p class="ui-users"><b>UsersList </b></p>
              {this.props.usersList.map(usersList =>
                <div class="ui-users">{usersList.id}) {usersList.username}</div>
              )}
              <br/>
            <p class="ui-transcations_types"><b>Transcations Types</b></p>
            {this.props.transcationsTypes.map(transcationsTypes =>
              <div class="ui-transcations_types">{transcationsTypes.id}) {transcationsTypes.type}</div>
            )}
            <br/>
            <p class="ui-payment_modes"><b>Payment Types</b></p>
            {this.props.paymentModes.map(paymentModes =>
              <div class="ui-payment_modes">{paymentModes.id}) {paymentModes.type}</div>
            )}
          </div>
        </div>
      );
    }
}

const mapStateToProps = (state) => {
    const { users , usersList, transcationsTypes, paymentModes } = state.home;
    return {
        users , usersList, transcationsTypes, paymentModes
    }
}

export default connect(mapStateToProps)(Home)
