import React, { Component } from 'react';
import classes from './Home.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Aux from '../../hoc/Auxilary/Auxilary';
import { connect } from 'react-redux';

class Home extends Component {
  render() {
    return (
        <Aux>
            <Toolbar username={this.props.username}/>
            <div className={classes.UserTransactions}>
                <div className={classes.Container}>
                    <a className={classes.Tile}>
                        <div>My Transactions</div>
                    </a>
                    <a className={classes.Tile}>
                        <div>Payments</div>
                    </a>
                    <a className={classes.Tile}>
                        <div>Add User Roles</div>
                    </a>
                    <a className={classes.Tile}>
                        <div>Add Payment Modes</div>
                    </a>
                </div>
            </div>
        </Aux>
    );
}
}

const mapStateToProps = (state) => {
  const { username } = state.login.userDetails;
  return {
      username
  }
}

export default connect(mapStateToProps)(Home);
