import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { reduceBy, forEachObjIndexed } from 'ramda';

import classes from './Home.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Aux from '../../hoc/Auxilary/Auxilary';
import Piechart from '../UI/PieChart/pieChart';
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


let formatGraphData = (data, valueField, labelField) => {
  let formatGraphInnerData = reduceBy((acc, next) => acc + next[valueField], 0, (x) => x[labelField], data);

  let finalArray = []

  let convertAsArrayOfObj = (value, key) => {
    finalArray.push({value: value, label: key});
  }

  forEachObjIndexed(convertAsArrayOfObj, formatGraphInnerData);
  return finalArray
}

let userTransactionsGraphData = [];
let userPaymentsGraphData = [];

class home extends Component {
  constructor(props) {
    super();
    this.state={
      showMyTranscationsChart: false,
      showMyPaymentsChart: false,
    }
  }

  componentDidMount() {

    if(this.props.userTransactions.length > 0) {
      userTransactionsGraphData = formatGraphData(this.props.userTransactions, 'amount', 'paymentFrom');
      this.setState({
        showMyTranscationsChart: true
      });
    }
    if(this.props.userPayments.length > 0){
      userPaymentsGraphData = formatGraphData(this.props.userPayments, 'balance', 'description');
      this.setState({
        showMyPaymentsChart: true
      });
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.userTransactions.length > 0) {
      userTransactionsGraphData = formatGraphData(newProps.userTransactions, 'amount', 'paymentFrom');
      this.setState({
        showMyTranscationsChart: true
      });
    }
    if(newProps.userPayments.length > 0){
      userPaymentsGraphData = formatGraphData(newProps.userPayments, 'balance', 'description');
      this.setState({
        showMyPaymentsChart: true
      });
    }
  }

  render() {

    return (
        <div style={{marginTop: '60px'}}>
            <Aux>
                <Toolbar username={this.props.username}/>
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
                            {this.state.showMyTranscationsChart && pieChartGraph(userTransactionsGraphData)}
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
                            {this.state.showMyPaymentsChart && pieChartGraph(userPaymentsGraphData)}
                          </div>
                        </Tab>
                    </Tabs>
                </MuiThemeProvider>
            </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { username } = state.login.userDetails;
  const { userTransactions, userPayments} = state.home;
  return {
      username,
      userTransactions,
      userPayments
  }
}

export default connect(mapStateToProps)(home);
