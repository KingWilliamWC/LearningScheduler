import React, { Component } from 'react';

import { Avatar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

import './Bartop.css';

class Bartop extends Component{
    constructor(props){
        super(props);

        this.state = {
            dropDownClasses: ['dropdown-content-hide ', 'dropdown-content-hide dropdown-content'],
            dropDownState: 0,
            time: new Date(),
        }
    }

    componentDidMount(){
        this.clockUpdate = setInterval(
            () => this.updateClock(), 1000
        )

        const ProfileContainer = document.getElementsByClassName('userProfileContainer')[0]
        document.addEventListener("mousedown", (event) => {
            if(!ProfileContainer.contains(event.target)){
                if(this.state.dropDownState === 1){
                    this.setState({dropDownState: 0});
                }
            }
        })
    }

    updateClock = () => {
        this.setState({time: new Date()});
    }

    onUserProfileClick = () => {
        if(this.state.dropDownState === 0){
            this.setState({dropDownState: 1})
        }
    }

    DropdownClick = (index) => {
        this.props.tabHandler(index);
        this.setState({dropDownState: 0});
    }
    
    render(){
        return(
            <div id='bartop'>
                <p>{this.state.time.toLocaleTimeString().substring(0, 5)}</p>
                <div id='logoTopContainer'>
                    <p>Lear-<span id='nineLogoTextTop'>9</span></p>
                </div>
                <div onClick={() => this.onUserProfileClick()} className='userProfileContainer'>
                    <IconButton aria-label="delete">
                        <Avatar id='avatarImg'>WW</Avatar>
                    </IconButton>
                    <div class={this.state.dropDownClasses[this.state.dropDownState]}>
                        <div id='userNameContainer'>
                            <p id='userName'>William</p>
                        </div>
                        <div onClick={() => this.DropdownClick(1)} className='dropdownItem'>
                            <p>Settings</p>
                        </div>
                        <div className='dropdownItem'>
                            <p>About</p>
                        </div>
                        <div className='dropdownItem'>
                            <p>Sign Out</p>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Bartop;