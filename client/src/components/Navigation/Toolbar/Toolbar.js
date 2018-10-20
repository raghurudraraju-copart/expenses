import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import { history} from '../../../helpers/history';

const logoClickedHandler = () => {
    history.push('/home');
}

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div className={classes.Logo} onClick={logoClickedHandler}>
            <Logo />
        </div>
        <div style={{width:'100%'}}><span>Welcome {props.username}</span></div>
    </header>
);

export default toolbar;
