import React, { Component } from 'react';
import classes from './UserPayments.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import { connect } from 'react-redux';
import { userPaymentActions } from '../../actions/userPayments.actions';
import ReactTable from 'react-table';
import Modal from '../../components/UI/Modal/Modal';
import CreatePayment from '../UserPayments/CreatePayment/CreatePayment';

class UserPayments extends Component {
  componentDidUpdate(prevProps, prevState){
    console.log("=== Updated ===");
  }

    fetchData = (state, instance) => {
        let username = this.props.username;
        this.props.loadUserPayments(username, state.pageSize, state.page);
    }

    addPaymentCancelHandler = () => {
        this.props.addingPayment(false);
    }

    addPaymentHandler = () => {
        this.props.addingPayment(true);
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
      console.log(JSON.stringify(this.props.userPayments));
        return (
            <div>
                <Toolbar username={this.props.username} />

                <div className={classes.UserPayments}>
                    <ReactTable className={classes.Table} style={{ marginTop: '75px' }}
                        pages={this.props.pages}
                        page={this.props.page}
                        pageSize={this.props.pageSize}
                        onPageSizeChange={(pageSize, pageIndex) => this.onPageSizeChangeHandler(pageSize, pageIndex)}
                        onPageChange={(pageIndex) => this.onPageChangeHandler(pageIndex)}
                        columns={[
                            { Header: 'Id', accessor: 'id' },
                            { Header: 'Payment Mode Type', accessor: 'type' },
                            { Header: 'Description', accessor: 'description' },
                            { Header: 'Balance', accessor: 'balance' },
                            { Header: 'Last Modified', accessor: 'lastModified' },
                        ]}
                        data={this.props.userPayments}
                        title="User Payments"
                        manual
                        onFetchData={this.fetchData}
                    />
                    <div>
                        <button className={classes.myButton}
                            onClick={this.addPaymentHandler}>Add Payment</button>
                    </div>
                </div>
                <Modal show={this.props.addPayment} modalClosed={this.addPaymentCancelHandler}>
                    {<CreatePayment
                        show={this.props.addPayment}
                        closeModal={this.addPaymentCancelHandler}
                    />}
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { pages,
           page,
           pageSize,
           transactionTypes,
           userPayments,
           addPayment,
        } = state.userPayments;
    const { username } = state.login.userDetails;
    return {
        username, pages, page, pageSize, transactionTypes, userPayments, addPayment
    }
}

const mapDispatchToProps = {
    loadUserPayments: userPaymentActions.loadUserPayments,
    changePageSize: userPaymentActions.changePageSize,
    changePage: userPaymentActions.changePage,
    addingPayment : userPaymentActions.addingPayment
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPayments);
