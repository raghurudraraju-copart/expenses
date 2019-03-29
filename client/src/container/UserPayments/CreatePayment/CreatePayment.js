import React, { Component } from 'react';
import classes from './CreatePayment.css';
import Button from '../../../components/UI/Button/Button';
import { connect } from 'react-redux';
import { userPaymentActions } from '../../../actions/userPayments.actions';

class CreatePayment extends Component {

    DEFAULT_STATE = {
        username: this.props.username,
        balance: 0,
        description: '',
        paymentType: 1,
    }

    state = {
        payment: { ...this.DEFAULT_STATE }
    }

    createPaymentHandler = (event) => {
        event.preventDefault();
        this.props.createPayment(this.state.payment, this.props.pageSize, this.props.page);
        this.props.closeModal();
        this.setState({
            payment: {...this.DEFAULT_STATE}
        })
    }

    inputChangedHandler = (event) => {
        event.preventDefault();
        const newPayment = { ...this.state.payment };
        if ("description" === event.target.name) {
            newPayment[event.target.name] = event.target.value;
        } else {
            newPayment[event.target.name] = parseInt(event.target.value ? event.target.value : 0, 10);
        }

        this.setState({
            payment: newPayment
        })
    }

    componentWillReceiveProps(newProps){
        if(!newProps.show){
            this.setState({
                payment: {...this.DEFAULT_STATE}
            })
        }
    }

    render() {

        const paymentTypeOptions = this.props.paymentTypes.map(payment => {
            return (<option key={payment.id} value={payment.id}>{payment.type}</option>)
        });

        return (
            <div className={classes.CreatePayment}>
                <h2>Add New Payment</h2>
                <form onSubmit={this.createPaymentHandler}>
                    <div className={classes.Input}>
                        <label className={classes.Label}>Payment Type</label>
                        <select name="transactionType"
                            className={classes.InputElement}
                            onChange={this.inputChangedHandler}
                            value={this.state.payment.paymentType}>
                            {paymentTypeOptions}
                        </select>
                    </div>
                    <div className={classes.Input}>
                        <label className={classes.Label}>Description</label>
                        <input className={classes.InputElement} type="text"
                            name="description"
                            placeholder="Description"
                            onChange={this.inputChangedHandler}
                            value={this.state.payment.description}
                        />
                    </div>
                    <div className={classes.Input}>
                        <label className={classes.Label}>Balance</label>
                        <input className={classes.InputElement} type="text" name="balance" placeholder="Amount"
                            value={this.state.payment.balance}
                            onChange={this.inputChangedHandler}
                        />
                    </div>
                    <div className={classes.buttons}>
                      <Button btnType="Success">Add Payment</Button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { paymentTypes, userPayments, pages, page, pageSize } = state.userPayments;
    const { username } = state.login.userDetails;
    return {
        username, pages, page, pageSize, paymentTypes, userPayments
    }
}

const mapDispatchToProps = {
    createPayment: userPaymentActions.createPayment
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePayment);
