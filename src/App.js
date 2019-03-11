import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Nav from "./components/Nav";
import LoginIndex from "./components/LoginIndex";
import Index from "./components/Index";
import Groups from "./components/Groups";
import Settings from "./components/Settings";
import CreateAccount from "./components/CreateAccount";
import ForgotPassword from "./components/ForgotPassword";
import NavLoggedIn from "./components/NavLoggedIn";

class App extends Component {
    componentWillMount() {
        if (localStorage.getItem('jwt_access') !== null) {
            axios.get('/api/verify-user', {
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
                <BrowserRouter>
                    <div className="wrapper">
                        {nav}
                        <div className="innerWrapper">
                            <Route exact path="/" component={Index}/>
                            <Route exact path="/groups" component={Groups}/>
                            <Route exact path="/settings" component={Settings}/>
                        </div>
                    </div>
                </BrowserRouter>
            )
        } else {
            //Logged Out
            nav = <Nav/>;
            return (
                <BrowserRouter>
                    <div className="wrapper">
                        {nav}
                        <div className="innerWrapper">
                            <Route exact path="/" component={LoginIndex}/>
                            <Route exact path="/create-account" component={CreateAccount}/>
                            <Route exact path="/forgot-password" component={ForgotPassword}/>
                        </div>
                    </div>
                </BrowserRouter>
            );
        }
    }
}

export default App;
