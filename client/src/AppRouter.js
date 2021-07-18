import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import App from './App';
import Register from './Register';

class AppRouter extends Component{
    render(){
        var urlBase = 'https://localhost'
        var routes = {
            'signin': `${urlBase}/api/signin`,
            'signup': `${urlBase}/api/signup`,
            'signPage': `https://localhost/`,
            'user': `${urlBase}/api/user`,
            'updateaccount': `${urlBase}/api/updateaccount`,
            'app': `https://localhost/app`,
        }
        
        return(
            <Router>
                <Switch>
                    <Route exact path='/app' render={() => (
                        <App routes={routes} />
                    )}/>
                    <Route exact path='/' render={() => (
                        <Register routes={routes} />
                    )} />
                </Switch>
            </Router>
        )
    }
}

export default AppRouter;
