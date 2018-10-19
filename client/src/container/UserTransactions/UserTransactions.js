import React, { Component } from 'react';
import classes from './UserTransactions.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import { connect } from 'react-redux';
import { userTransactionActions } from '../../actions/userTransactions.actions';
import ReactTable from 'react-table';


class UserTransactions extends Component {
    state = {
        open: true,
        pages: 4
    };

    fetchData = (state, instance) => {
        let username = this.props.username;
        username="rrv461";
        this.props.loadUserTransactions(username, state.pageSize, state.page);

    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    pageChangeHandler = (pageNum) => {
        console.log('Page Number' + pageNum)
    }

    render() {
        return (
            <div>
                <Toolbar username={this.props.username}/>
                <ReactTable /*showPagination = {false}   */ style={{ marginTop: '75px' }}
                    pages={this.state.pages}
                    onPageChange={(pageIndex) => this.pageChangeHandler(pageIndex)}
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
    const { userTransactions } = state.userTransactions;
    const { username } = state.login.userDetails;
    return {
        userTransactions, username
    }
}

const mapDispatchToProps = {
    loadUserTransactions: userTransactionActions.loadUserTransactions
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTransactions);