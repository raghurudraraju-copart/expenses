import React, { Component } from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import { withRouter } from 'react-router-dom';
import Aux from '../../../hoc/Auxilary/Auxilary';

const toolbar = class extends Component {

    logoClickedHandler = () => {
      if(!this.props.username) {
        this.props.history.push('/');
      } else{
       this.props.history.push('/home');
     }
    }

    logOutHandler = () => {
      this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <Aux>
                    <header className={classes.Toolbar} >
                        <div className={classes.Logo} onClick={this.logoClickedHandler}>
                            <Logo />
                        </div>
                        <div style={{ width: '100%' }}>
                            <span style={{paddingTop:'10px'}}>Welcome {this.props.username}</span>
                            { this.props.username &&
                                <span onClick={this.logOutHandler} style={{cursor: 'pointer', display:'flex', flexDirection: 'column', alignItems: 'center'}} >
                                  <i className="material-icons">exit_to_app</i>
                                  <span style={{padding: 0}}>Logout</span>
                                </span>
                            }
                        </div>
                    </header>
                </Aux>
            </div>
        )
    }
}

export default withRouter(toolbar);
