import React, { Component } from 'react';
import classes from './UserTransactions.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import { connect } from 'react-redux';
import { userTransactionActions } from '../../actions/userTransactions.actions';
import ReactTable from 'react-table';
import Modal from '../../components/UI/Modal/Modal';
import CreateTrasaction from '../UserTransactions/CreateTransaction/CreateTransaction';

class UserTransactions extends Component {


    fetchData = (state, instance) => {
        let username = this.props.username;
        this.props.loadUserTransactions(username, state.pageSize, state.page);
    }

    addTransCancelHandler = () => {
        this.props.addingTransaction(false);
    }

    addTransHandler = () => {
        this.props.addingTransaction(true);
    }

    onPageChangeHandler(pageIndex) {
        // if (this.props.page != pageIndex) {
            this.props.changePage(pageIndex);
        // }
    }

    onPageSizeChangeHandler(pageSize, pageIndex) {
        this.props.changePageSize(pageSize, pageIndex);
    }

    render() {
        return (
            <div>
                <Toolbar username={this.props.username} />
                <div className={classes.UserTransactions}>
                    <ReactTable className={classes.Table} style={{ marginTop: '75px' }}
                        pages={this.props.pages}
                        page={this.props.page}
                        pageSize={this.props.pageSize}
                        onPageSizeChange={(pageSize, pageIndex) => this.onPageSizeChangeHandler(pageSize, pageIndex)}
                        onPageChange={(pageIndex) => this.onPageChangeHandler(pageIndex)}
                        columns={[
                            { Header: 'Id', accessor: 'id' },
                            { Header: 'Transaction Type', accessor: 'type' },
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
                    <div>
                        <button className={classes.myButton}
                            onClick={this.addTransHandler}>Add Transaction</button>
                    </div>
                </div>
                <Modal show={this.props.addTransaction} modalClosed={this.addTransCancelHandler}>
                    {<CreateTrasaction 
                        show={this.props.addTransaction}
                        closeModal={this.addTransCancelHandler}
                        // username={this.props.username}
                        // transactionTypes={this.props.transactionTypes}
                        // paymentModes={this.props.paymentModes}
                        // page={0}
                        // pageSize={20}
                    />}
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { userTransactions, 
           transactionTypes, 
           paymentModes, 
           pages, 
           page, 
           pageSize,
           addTransaction   
        } = state.userTransactions;
    const { username } = state.login.userDetails;
    return {
        userTransactions, username, pages, page, pageSize, transactionTypes, paymentModes, addTransaction
    }
}

const mapDispatchToProps = {
    loadUserTransactions: userTransactionActions.loadUserTransactions,
    changePageSize: userTransactionActions.changePageSize,
    changePage: userTransactionActions.changePage,
    addingTransaction : userTransactionActions.addingTransaction
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTransactions);