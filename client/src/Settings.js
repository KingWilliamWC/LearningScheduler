import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

import './Settings.css';

import PlusSVG from './SVG/plus-circle-solid.svg';
import BackSVG from './SVG/chevron-left-solid.svg';

import SubjectItem from './SubjectItem';
import DropdownTime from './DropdownTime';
import axios from 'axios';

class Settings extends Component{
    constructor(props){
        super(props);

        this.state = {
            genres: JSON.parse(localStorage.getItem('user')).subjects,
            learningLength: JSON.parse(localStorage.getItem('user')).learningLength,
            genresDisplay: [],
            addIDs: ['addGenreInputContainerHide', 'addGenreInputContainerHide addGenreInputContainer'],
            addState: 0,
            errorClasses: ['hide', 'errorText'],
            errorState: 0,
            errorMessage: ''
        }
    }

    componentDidMount(){
        document.getElementsByClassName('MuiInputBase-input')[0].value = JSON.parse(localStorage.getItem('user')).username;
        document.getElementsByClassName('MuiInputBase-input')[1].value = JSON.parse(localStorage.getItem('user')).password;
    }

    handleUserDelete = (index) =>{
        var currentGenres = this.state.genres;
        currentGenres.splice(index, 1);
        this.setState({genres: currentGenres});
    }

    handleUserChangeLearningLength = (length) => {
        this.setState({learningLength: length})
    }
    
    error = (message) => {
        this.setState({errorState: 1, errorMessage: message});
    }

    sendUserData = async(data) => {
        await axios.post(this.props.routes.updateaccount, data)
        .then(res => {
            if(res.data.error === true){
                if(res.data.message === 'duplicate'){
                    this.error('Username already exists');
                }
            }else{
                localStorage.setItem('user', JSON.stringify(res.data.message));
                this.props.tabHandler(0)
            }

        })
    }

    userExit = async() =>{
        var error = false; //set true if any error, don't continue
        var currentusername = document.getElementsByClassName('MuiInputBase-input')[0].value;
        var currentPassword = document.getElementsByClassName('MuiInputBase-input')[1].value;
        var currentSubjects = this.state.genres;
        var currentLearningLength = this.state.learningLength;
        if(currentusername.length <= 3){
            this.error('Please enter a username longer than 3 characters');
            error = true;
        }
        if(currentPassword.length <= 3){
            this.error('Please enter a password longer than 3 characters');
            error = true;
        }

        if(!error){
            var currentUser = JSON.parse(localStorage.getItem('user'))
            currentUser.username = currentusername;
            currentUser.password = currentPassword;
            currentUser.subjects = currentSubjects;
            currentUser.learningLength = currentLearningLength;
            await this.sendUserData(currentUser)
            
        }
    }

    handleUserAdd = () =>{
        if(this.state.addState === 1){
            var genreInput = document.getElementsByClassName('MuiInputBase-input')[2];
            if(genreInput.value.length > 0){
                var currentGenres = this.state.genres;
                currentGenres.push(genreInput.value);
                genreInput.value = '';
                this.setState({addState: 0, currentGenres: currentGenres});
            }else{
                this.setState({addState: 0});
            }
        }else{
            this.setState({addState: 1});
        }
    }

    render(){
        this.state.genresDisplay = [] // eslint-disable-line
        for(var i = 0; i < this.state.genres.length; i++){
            this.state.genresDisplay.push( // eslint-disable-line
                <SubjectItem deleteHandler={this.handleUserDelete} index={i} name={this.state.genres[i]}/>
            )
        }
        return(
            <div id='settingsTabContainer'>
                <div id='backContainer'>
                    <IconButton onClick={() => this.userExit()} aria-label="delete">
                        <img alt='' id='backIcon' src={BackSVG}></img>
                    </IconButton>
                </div>
                <p className='tabTitle'>User Settings</p>
                <p className={this.state.errorClasses[this.state.errorState]}>{this.state.errorMessage}</p>
                <p className='subSettingsTitle'>Account</p>
                <div id='inputContainer'>
                    <TextField id="InputContainerUserName" label="Username" variant="outlined" />
                    <TextField style={{marginTop: 20}} className="InputContainerPassword" type='Password' label="Password" variant="outlined" />
                </div>
                <p className='subSettingsTitle subSettingsTitleBottom'>Subjects</p>
                <div id='subjectsContainer'>
                    {this.state.genresDisplay}
                    <div id='addContainer'>
                        <div className={this.state.addIDs[this.state.addState]}>
                            <TextField style={{backgroundColor: 'white'}} label="Subject Name" defaultValue='' variant="outlined" />
                        </div>
                        <img alt='' onClick={() => this.handleUserAdd()} id='addGenreBtn' src={PlusSVG}></img>
                    </div>
                </div>
                <p className='subSettingsTitle subSettingsTitleBottom'>Learning Time</p>
                <p>Hours</p>
                <DropdownTime changeHandler={this.handleUserChangeLearningLength}/>
            </div>
        )
    }
}

export default Settings;