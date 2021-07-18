import React, { Component } from 'react';

// page structure
import './App.css';

// component imports
import Bartop from './Bartop';
import Home from './Home';
import Settings from './Settings';

class App extends Component{
    constructor(props){
        super(props);

        this.state = {
            Tabs: [<Home />, <Settings tabHandler={this.HandleTabChange}/>],
            TabState: 0,
        }
    }
    
    
    HandleTabChange = (Tabindex) => {
        this.setState({TabState: Tabindex});
    }
    
    render(){
        return(
            <div>
                <Bartop tabHandler={this.HandleTabChange}/>
                {this.state.Tabs[this.state.TabState]}
            </div>
        )
    }
}

export default App;