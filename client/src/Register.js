import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './Register.css';

class Register extends Component {
    constructor(props){
        super(props);

        this.state = {
            AccountSwitchHTMl: [<p>Don't have an account? <span onClick={() => this.userSwitch()} id='linkSwitchText'>Sign Up</span></p>, <p>Already have an account? <span onClick={() => this.userSwitch()} id='linkSwitchText'>Sign In</span></p>],
            RegisterTitleText: ['Sign In', 'Sign Up'],
            RegisterTitleIDs: ['registerTitleBig', 'registerTitle'],
            errorClasses: ['hide', 'errorText'],
            errorState: 0,
            errorMessage: '',
            AccountSwitchState: 0,
        }
    }

    userSwitch = () => {
        this.state.AccountSwitchState === 0 ? this.setState({AccountSwitchState: 1, errorState: 0}) : this.setState({AccountSwitchState: 0, errorState: 0})
        document.getElementsByClassName('MuiInputBase-input')[0].value = '';
        document.getElementsByClassName('MuiInputBase-input')[1].value = '';
    }

    sendData = async(url, data) =>{
        await axios.post(url, data)
        .then(res => {
            return(res)
        })
    }

    error = (message) =>{
        this.setState({errorState: 1, errorMessage: message})
    }

    userRegister = async() => {
        var username =  document.getElementsByClassName('MuiInputBase-input')[0]
        var password = document.getElementsByClassName('MuiInputBase-input')[1]
        if(this.state.AccountSwitchState === 0){
            // Sign in
            await axios.post(this.props.routes.signin, {'username': username.value, 'password': password.value})
            .then(res => {
                if(res.data.error === false){
                    localStorage.setItem('user', JSON.stringify(res.data.message));
                    window.location = this.props.routes.app;
                }else{
                    this.error('Incorrect username or password')
                }
            })
        }else{
            // Sign Up
            await axios.post(this.props.routes.signup, {'username': username.value, 'password': password.value})
            .then(res => {
                if(res.data.error === false){
                    localStorage.setItem('user', JSON.stringify(res.data.message));
                    window.location = this.props.routes.app;
                }else{
                    console.log(res.data)
                    if(res.data.message === 'duplicate'){
                        this.error('Username already exists');
                    }
                }
            })
        }

    }

    render(){
        return(
            <div id='RegisterContainer'>
                <div id='logoTopContainerRegister'>
                    <p>Lear-<span id='nineLogoTextTop'>9</span></p>
                </div>
                <div id='registerContainer'>
                    <p id={this.state.RegisterTitleIDs[this.state.errorState]}>{this.state.RegisterTitleText[this.state.AccountSwitchState]}</p>
                    <p className={this.state.errorClasses[this.state.errorState]}>{this.state.errorMessage}</p>
                    <div id='inputsContainer'>
                        <TextField id="InputContainerUserName" label="Username" variant="outlined" />
                        <TextField style={{marginTop: 20}} className="InputContainerPassword" type='Password' label="Password" variant="outlined" />
                        <Button onClick={() => this.userRegister()} style={{color: 'white', backgroundColor: '#1d63dc', width: 125, margin: '20px auto'}} variant="contained">
                        {this.state.RegisterTitleText[this.state.AccountSwitchState]}
                        </Button>
                        {this.state.AccountSwitchHTMl[this.state.AccountSwitchState]}
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;