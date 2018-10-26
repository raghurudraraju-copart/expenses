import React, { Component } from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import { withRouter } from 'react-router-dom';
import Aux from '../../../hoc/Auxilary/Auxilary';

const toolbar = class extends Component {

    logoClickedHandler = () => {
       this.props.history.push('/home');
    }

    render() {
        return (
            <Aux>
                <header className={classes.Toolbar} >
                    <div className={classes.Logo} onClick={this.logoClickedHandler}>
                        <Logo />
                    </div>
                    <div style={{ width: '100%' }}><span>Welcome {this.props.username}</span></div>
                </header>
            </Aux>
        )
    }
}

export default withRouter(toolbar);
