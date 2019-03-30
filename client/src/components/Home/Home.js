import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import classes from './Home.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Aux from '../../hoc/Auxilary/Auxilary';
import Pie from '../UI/PieChart/pieChartNew';

let width = 250;
let height = 250;
let minViewportSize = Math.min(width, height);
let radius = (minViewportSize * .9) / 2;
let x = width / 2+30;
let y = height / 2+30;

const pieChartGraph = (data) => (
    <svg width="300" height="300">
      <Pie x={x} y={y} radius={radius} data={data} />
    </svg>
)

const home = (props) => {

    return (
        <div style={{marginTop: '60px'}}>
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
                </div>
            </Aux>
            <div className={classes.tabsContainer}>
                <MuiThemeProvider>
                    <Tabs>
                        <Tab
                          icon={<FontIcon className="material-icons">receipt</FontIcon>}
                          label="My Transactions">
                          <div style={{
                              borderRight: '1px solid grey',
                              borderBottom: '1px solid grey',
                              borderLeft: '1px solid grey',
                              padding: '15px',
                              minHeight: '350px',
                            }}>
                            <h2 style={{marginTop:0}}>My Transactions</h2>
                            {pieChartGraph([{label:"Credit", value:100},{label:"Debit", value:5},{label:"Transfer", value:3}])}
                          </div>
                        </Tab>
                        <Tab
                          icon={<FontIcon className="material-icons">credit_card</FontIcon>}
                          label="My Payments">
                          <div style={{
                              borderRight: '1px solid grey',
                              borderBottom: '1px solid grey',
                              borderLeft: '1px solid grey',
                              padding: '15px',
                              minHeight: '350px',
                            }}>
                            <h2 style={{marginTop:0}}>My Payments</h2>
                            {pieChartGraph([{label:"Cash", value:500},{label:"Debit Card", value:2000},{label:"Others", value:1000}])}
                          </div>
                        </Tab>
                    </Tabs>
                </MuiThemeProvider>
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
