import React, {Component} from 'react';
import { connect } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { loginActions } from '../actions/login.actions.js';

class Login extends Component {
constructor(props){
  super(props);
  this.state={
    username:'',
    password:'',
    submitted: false,
  };

   this.handleSubmit = this.handleSubmit.bind(this);
 }

handleSubmit(e) {
       e.preventDefault();
       this.setState({ submitted: true });
       const { username, password } = this.state;
       const { dispatch } = this.props;
       if (username && password) {
           dispatch(loginActions.login(username, password));
       }
}


render() {
    const {loginFailed} = this.props;
    const loginFailedFlag = loginFailed ? 0 : 1;
    const error = loginFailed === undefined ? 0 : loginFailedFlag;
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Login"
           />
           <TextField
             hintText="Enter your Username"
             floatingLabelText="Username" style={style}
             onChange = {(event,newValue) => this.setState({username:newValue})}
             error={error}
             errorText = {error ? ' ' : ''}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password" style={style}
               onChange = {(event,newValue) => this.setState({password:newValue})}
               error = {error}
               errorText = {error ? ' ' : ''}
               />
               {loginFailed && <div style={errorStyle}>Invalid Credentials </div>}
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleSubmit(event)}/>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
 margin: 10,
};

const errorStyle = {
    color: "red",
    fontSize: "12px",
    marginLeft: "15px",
  }




const mapStateToProps = (state) => {
   const { loginFailed } = state.login;
  return{
    loginFailed
  }
}


export default connect(mapStateToProps)(Login)
