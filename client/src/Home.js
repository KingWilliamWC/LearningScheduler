import React, { Component } from 'react';
import {Howl, Howler} from 'howler'; // eslint-disable-line
import axios from 'axios';

import './Home.css'

import IconButton from '@material-ui/core/IconButton';

import PlaySVG from './SVG/play-solid.svg';
import PauseSVG from './SVG/pause-solid.svg';

import dingSound from './Audio/Ding.mp3';

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            PlayClasses: ['iconShow', 'iconHide'],
            PauseClasses: ['iconHide', 'iconShow'],
            PlayState: 0,
            currentSubject: JSON.parse(localStorage.getItem('user')).currentSubject,
            startTime: new Date(`2021-12-05 ${JSON.parse(localStorage.getItem('user')).learningLength}:00:00`),
            CurrentTime: new Date(`2021-12-05 ${JSON.parse(localStorage.getItem('user')).learningLength}:00:00`),
            lastChecked: JSON.parse(localStorage.getItem('user')).lastChecked,
        }
    }

    UserPressPlay = () => {
        if(this.state.PlayState === 0){
            this.setState({PlayState: 1})
        }else{
            this.setState({PlayState: 0})
        }
    }

    userReset = () => {
        this.setState({CurrentTime: this.state.startTime, PlayState: 0});
    }

    componentDidMount(){
        var date = new Date();
        if(this.state.lastChecked.day !== date.getDate()){
            console.log('change');
            var currentUser = JSON.parse(localStorage.getItem('user'))
            var currentLastChecked = currentUser.lastChecked;
            currentLastChecked.day = date.getDate();
            currentLastChecked.month = date.getMonth();
            axios.post(this.props.routes.updateaccount, currentUser) //update current subject with server
            .then(res => {
                if(!res.data.error){
                    localStorage.setItem('user', JSON.stringify(res.data.message));
                    this.setState({lastChecked: currentLastChecked, currentSubject: JSON.parse(localStorage.getItem('user')).subjects[Math.floor(Math.random() * JSON.parse(localStorage.getItem('user')).subjects.length)]}) 
                }
            })

 
        }else{
            console.log('no need!!');
        }
        this.interval = setInterval(() => {
            if(this.state.PlayState === 1){
                var currentTime = this.state.CurrentTime;
                currentTime.setSeconds(currentTime.getSeconds() - 1);
                if(currentTime.getMinutes() === 10 && currentTime.getSeconds() === 0 || currentTime.getMinutes() === 0 && currentTime.getSeconds() === 0){ // eslint-disable-line
                    var DingSoundObject = new Howl({src: [dingSound], volume: 1});
                    DingSoundObject.play();
                }
                if(currentTime.getHours() === 0 && currentTime.getMinutes() === 0 && currentTime.getSeconds() === 0){
                    this.setState({PlayState: 0})
                }
                this.setState({CurrentTime: currentTime});
            }

        }, 1000);
    }
    
    render(){
        return(
            <div id='homeContainer'>
                <div id='titleContainer'>
                    <p id='mainWelcomeTitle'>Good Afternoon, {JSON.parse(localStorage.getItem('user')).username}</p>
                    <p id='mainSubTitle'>Ready For Some Learning?</p>
                </div>
                <div id='genreContainer'>
                    <p id='genreText'>{this.state.currentSubject}</p>
                </div>
                <IconButton onClick={() => this.UserPressPlay()} id='buttonFull' aria-label="delete">
                        <div id='playIcon'>
                            <img alt='' className={this.state.PlayClasses[this.state.PlayState]} src={PlaySVG}></img>
                            <img alt='' className={this.state.PauseClasses[this.state.PlayState]} src={PauseSVG}></img>
                        </div>
                </IconButton>
                <p id='TimeCounterText'>{this.state.CurrentTime.toLocaleTimeString('en-GB', {hour: 'numeric', minute: '2-digit', second: '2-digit'})}</p>
                <p onClick={() => this.userReset()} id='ResetText'>Reset</p>
            </div>
        )
    }
}

export default Home;