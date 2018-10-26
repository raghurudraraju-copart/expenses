import React from 'react';
import classes from './Home.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Aux from '../../hoc/Auxilary/Auxilary';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

const home = (props) => {
  
    return (
        <Aux>
            <Toolbar username={props.username}/>
            <div className={classes.UserTransactions}>
                <div className={classes.Container}>
                    <Link to='/userTransactions' className={classes.Tile}>
                        <div>My Transactions</div>
                    </Link>
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

const mapStateToProps = (state) => {
  const { username } = state.login.userDetails;
  return {
      username
  }
}

export default connect(mapStateToProps)(home);
