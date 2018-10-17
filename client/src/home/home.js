import React, { Component } from 'react';
import { connect } from 'react-redux';
import { homeActions } from '../actions/home.actions.js';
import ReactTable from 'react-table';

class Home extends Component {
  state = {
    open: true,
  };

  componentDidMount() {
    this.props.loadUserTransactions(this.props.username);
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div style={{maxWidth: '70%' }}>
        <ReactTable showPagination = {false}   
          columns={[
            {Header: 'Id', accessor: 'id'},
            {Header: 'Payment Type', accessor: 'type'},
            {Header: 'Description', accessor: 'description'},
            {Header: 'Payment From', accessor: 'paymentFrom'},
            {Header: 'Payment To', accessor: 'paymentTo'},
            {Header: 'Amount', accessor: 'amount'},
            {Header: 'Date', accessor: 'date'},
          ]}
          data={this.props.userTransactions}
          title="User Transactions"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { users, usersList, transcationsTypes, paymentModes, userTransactions } = state.home;
  const {username} = state.login.userDetails;
  return {
    users, usersList, transcationsTypes, paymentModes, userTransactions, username
  }
}

const mapDispatchToProps = {
  loadUserTransactions : homeActions.loadUserTransactions
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
