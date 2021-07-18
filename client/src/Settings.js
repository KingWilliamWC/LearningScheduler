import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

import './Settings.css';

import PlusSVG from './SVG/plus-circle-solid.svg';
import BackSVG from './SVG/chevron-left-solid.svg';

import SubjectItem from './SubjectItem';
import DropdownTime from './DropdownTime';

class Settings extends Component{
    constructor(props){
        super(props);

        this.state = {
            genres: ['Science', 'Maths'],
            genresDisplay: [],
            addIDs: ['addGenreInputContainerHide', 'addGenreInputContainerHide addGenreInputContainer'],
            addState: 0,
        }
    }

    componentDidMount(){
        console.log(document.getElementsByClassName('MuiInputBase-input')[0].value);
    }

    handleUserDelete = (index) =>{
        var currentGenres = this.state.genres;
        currentGenres.splice(index, 1);
        this.setState({genres: currentGenres});
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
        this.state.genresDisplay = []
        for(var i = 0; i < this.state.genres.length; i++){
            this.state.genresDisplay.push(
                <SubjectItem deleteHandler={this.handleUserDelete} index={i} name={this.state.genres[i]}/>
            )
        }
        return(
            <div id='settingsTabContainer'>
                <div id='backContainer'>
                    <IconButton onClick={() => this.props.tabHandler(0)} aria-label="delete">
                        <img id='backIcon' src={BackSVG}></img>
                    </IconButton>
                </div>
                <p className='tabTitle'>User Settings</p>
                <p className='subSettingsTitle'>Account</p>
                <div id='inputContainer'>
                    <TextField id="InputContainerUserName" label="Username" defaultValue='William' variant="outlined" />
                    <TextField style={{marginTop: 20}} className="InputContainerPassword" type='Password' label="Password" defaultValue='Password' variant="outlined" />
                </div>
                <p className='subSettingsTitle subSettingsTitleBottom'>Subjects</p>
                <div id='subjectsContainer'>
                    {this.state.genresDisplay}
                    <div id='addContainer'>
                        <div className={this.state.addIDs[this.state.addState]}>
                            <TextField style={{backgroundColor: 'white'}} label="Subject Name" defaultValue='' variant="outlined" />
                        </div>
                        <img onClick={() => this.handleUserAdd()} id='addGenreBtn' src={PlusSVG}></img>
                    </div>
                </div>
                <p className='subSettingsTitle subSettingsTitleBottom'>Learning Time</p>
                <p>Hours</p>
                <DropdownTime />
            </div>
        )
    }
}

export default Settings;