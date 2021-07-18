import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';

import DeleteSVG from './SVG/minus-circle-solid.svg';

class SubjectItem extends Component {
    render(){
        return(
            <Paper style={{height: 50}} elevation={1}>
                <div className='subjectContainer'>
                    <p className='subjectName'>{this.props.name}</p>
                    <img alt='' onClick={() => this.props.deleteHandler(this.props.index)} className='subjectDeleteIcon' src={DeleteSVG}></img>
                </div>
            </Paper>
        )
    }
}

export default SubjectItem;