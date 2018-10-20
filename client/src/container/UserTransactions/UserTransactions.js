import React, { Component } from 'react';
import classes from './UserTransactions.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import { connect } from 'react-redux';
import { userTransactionActions } from '../../actions/userTransactions.actions';
import ReactTable from 'react-table';


class UserTransactions extends Component {

    fetchData = (state, instance) => {
        let username = this.props.username;
        this.props.loadUserTransactions(username, state.pageSize, state.page);
    }

    render() {
        return (
            <div>
                <Toolbar username={this.props.username} />
                <ReactTable style={{ marginTop: '75px' }}
                    pages={this.props.pages}
                    className={classes.Table}
                    columns={[
                        { Header: 'Id', accessor: 'id' },
                        { Header: 'Payment Type', accessor: 'type' },
                        { Header: 'Description', accessor: 'description' },
                        { Header: 'Payment From', accessor: 'paymentFrom' },
                        { Header: 'Payment To', accessor: 'paymentTo' },
                        { Header: 'Amount', accessor: 'amount' },
                        { Header: 'Date', accessor: 'date' },
                    ]}
                    data={this.props.userTransactions}
                    title="User Transactions"
                    manual
                    onFetchData={this.fetchData}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { userTransactions, pages } = state.userTransactions;
    const { username } = state.login.userDetails;
    return {
        userTransactions, username, pages
    }
}

const mapDispatchToProps = {
    loadUserTransactions: userTransactionActions.loadUserTransactions
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTransactions);