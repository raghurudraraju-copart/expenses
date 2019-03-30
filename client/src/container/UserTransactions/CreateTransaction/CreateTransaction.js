import React, { Component } from 'react';
import classes from './CreateTransaction.css';
import Button from '../../../components/UI/Button/Button';
import { connect } from 'react-redux';
import { userTransactionActions } from '../../../actions/userTransactions.actions';

class CreateTransaction extends Component {

    DEFAULT_STATE = {
        username: this.props.username,
        amount: 0,
        description: '',
        transactionType: 1,
        paymentFrom: 0,
        paymentTo: 0
    }

    state = {
        transaction: { ...this.DEFAULT_STATE }
    }

    createTransactionHandler = (event) => {
        event.preventDefault();
        this.props.createTransaction(this.state.transaction, this.props.pageSize, this.props.page);
        this.props.closeModal();
        this.setState({
            transaction: {...this.DEFAULT_STATE}
        })
    }

    inputChangedHandler = (event) => {
        event.preventDefault();
        const newTransaction = { ...this.state.transaction };
        if ("description" === event.target.name) {
            newTransaction[event.target.name] = event.target.value;
        } else {
            newTransaction[event.target.name] = parseInt(event.target.value ? event.target.value : 0, 10);
        }

        this.setState({
            transaction: newTransaction
        })
    }

    componentWillReceiveProps(newProps){
        if(!newProps.show){
            this.setState({
                transaction: {...this.DEFAULT_STATE}
            })
        }
    }

    render() {

        const transactionTypeOptions = this.props.transactionTypes.map(transaction => {
            return (<option key={transaction.id} value={transaction.id}>{transaction.type}</option>)
        });

        const paymentModeOptions = this.props.paymentModes.map(paymentMode => {
            return (<option key={paymentMode.id} value={paymentMode.id}>{paymentMode.description}</option>)
        });

        return (
            <div className={classes.CreateTransaction}>
                <h2>Add New Transaction</h2>
                <form onSubmit={this.createTransactionHandler}>
                    <div className={classes.Input}>
                        <label className={classes.Label}>Amount</label>
                        <input className={classes.InputElement} type="text" name="amount" placeholder="Amount"
                            value={this.state.transaction.amount}
                            onChange={this.inputChangedHandler}
                        />
                    </div>
                    <div className={classes.Input}>
                        <label className={classes.Label}>Description</label>
                        <input className={classes.InputElement} type="text"
                            name="description"
                            placeholder="Description"
                            onChange={this.inputChangedHandler}
                            value={this.state.transaction.description}
                        />
                    </div>
                    <div className={classes.Input}>
                        <label className={classes.Label}>Transaction Type</label>
                        <select name="transactionType"
                            className={classes.InputElement}
                            onChange={this.inputChangedHandler}
                            value={this.state.transaction.transactionType}>
                            {transactionTypeOptions}
                        </select>
                    </div>
                    <div className={classes.Input}>
                        <label className={classes.Label}>Payment From</label>
                        <select name="paymentFrom"
                            className={classes.InputElement}
                            onChange={this.inputChangedHandler}
                            value={this.state.transaction.paymentFrom}>
                            <option key="0" value="0">Select</option>
                            {paymentModeOptions}
                        </select>
                    </div>
                    <div className={classes.Input}>
                        <label className={classes.Label}>Payment To</label>
                        <select name="paymentTo"
                            className={classes.InputElement}
                            onChange={this.inputChangedHandler}
                            value={this.state.transaction.paymentTo}>
                            <option key="0" value="0">Select</option>
                            {paymentModeOptions}
                        </select>
                    </div>
                    <div className={classes.buttons}>
                      <Button btnType="Success">Add Transaction</Button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { userTransactions, transactionTypes, paymentModes, pages, page, pageSize } = state.userTransactions;
    const { username } = state.login.userDetails;
    return {
        userTransactions, username, pages, page, pageSize, transactionTypes, paymentModes
    }
}

const mapDispatchToProps = {
    createTransaction: userTransactionActions.createTransaction
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTransaction);
