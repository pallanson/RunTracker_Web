import React, {Component} from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Nav from "./components/Nav";
import LoginIndex from "./components/LoginIndex";
import Index from "./components/Index";
import Groups from "./components/Groups";
import Settings from "./components/Settings";
import NavLoggedIn from "./components/NavLoggedIn";

class App extends Component {
    componentWillMount() {
        if (localStorage.getItem('jwt_access') !== null) {
            axios.get('https://clouddevdb.cpvkbdcnilcb.eu-west-2.rds.amazonaws.com/user/login', {
                headers: {
                    Authorization: localStorage.getItem('jwt_access')
                }
            })
                .then(res => {})
                .catch(error => {
                    localStorage.removeItem('jwt_access');
                    window.location.href = "/";
                })
        }
    }

    render() {
        let nav;

        if (localStorage.getItem('jwt_access') !== null) {
            // Logged In
            nav = <NavLoggedIn/>;
            return (
                <Router>
                    <div className="wrapper">
                        {nav}
                        <div className="innerWrapper">
                            <Route exact path="/" component={Index}/>
                            <Route exact path="/groups" component={Groups}/>
                            <Route exact path="/settings" component={Settings}/>
                        </div>
                    </div>
                </Router>
            )
        } else {
            //Logged Out
            nav = <Nav/>;
            return (
                <Router>
                    <div className="wrapper">
                        {nav}
                        <div className="innerWrapper">
                            <Route exact path="/" component={LoginIndex}/>
                        </div>
                    </div>
                </Router>
            );
        }
    }
}

export default App;
