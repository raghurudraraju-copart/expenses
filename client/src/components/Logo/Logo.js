import React from 'react';
import expensesLogo from '../../assets/images/expenses-logo.jpeg';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={expensesLogo} alt="Expenses"/>
    </div>
);

export default logo;