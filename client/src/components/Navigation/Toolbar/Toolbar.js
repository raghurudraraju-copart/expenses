import React from 'react';
import classes from './Toolbar.css';
// import Logo from '../../Logo/Logo';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div style={{width:'100%'}}><span>Welcome {props.username}</span></div>
    </header>
);

export default toolbar;
