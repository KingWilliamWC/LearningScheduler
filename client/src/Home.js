import React, { Component } from 'react';
import {Howl, Howler} from 'howler';

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
            CurrentTime: new Date('2021-12-05 0:00:03'),
        }
    }

    UserPressPlay = () => {
        if(this.state.PlayState === 0){
            this.setState({PlayState: 1})
        }else{
            this.setState({PlayState: 0})
        }
    }

    componentDidMount(){
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
                    <p id='mainWelcomeTitle'>Good Afternoon, William</p>
                    <p id='mainSubTitle'>Ready For Some Learning?</p>
                </div>
                <div id='genreContainer'>
                    <p id='genreText'>Science</p>
                </div>
                <IconButton onClick={() => this.UserPressPlay()} id='buttonFull' aria-label="delete">
                        <div id='playIcon'>
                            <img className={this.state.PlayClasses[this.state.PlayState]} src={PlaySVG}></img>
                            <img className={this.state.PauseClasses[this.state.PlayState]} src={PauseSVG}></img>
                        </div>
                </IconButton>
                <p id='TimeCounterText'>{this.state.CurrentTime.toLocaleTimeString('en-GB', {hour: 'numeric', minute: '2-digit', second: '2-digit'})}</p>
            </div>
        )
    }
}

export default Home;