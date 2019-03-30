import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';

import classes from './Home.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Aux from '../../hoc/Auxilary/Auxilary';

const home = (props) => {
  
    return (
        <Aux>
            <Toolbar username={props.username}/>
            <div className={classes.UserTransactions}>
                <div className={classes.Container}>
                    <Link to='/userTransactions' className={classes.Tile}>
                        <div>My Transactions</div>
                    </Link>
                    <Link to='/userPayments' className={classes.Tile}>
                        <div>Payments</div>
                    </Link>
                    <a className={classes.Tile}>
                        <div>Add User Roles</div>
                    </a>
                    <a className={classes.Tile}>
                        <div>Add Payment Modes</div>
                    </a>
                </div>
            </Aux>
            <div className={classes.tabsContainer}>
                    <Tabs>
                        <Tab
                          icon={<FontIcon className="material-icons">receipt</FontIcon>}
                          label="My Transactions"
                        />
                        <Tab
                          icon={<FontIcon className="material-icons">credit_card</FontIcon>}
                          label="My Payments"
                        />
                    </Tabs>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
  const { username } = state.login.userDetails;
  return {
      username
  }
}

export default connect(mapStateToProps)(home);
