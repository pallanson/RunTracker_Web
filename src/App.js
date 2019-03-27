import React, {Component} from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Nav from "./components/Nav";
import LoginIndex from "./components/LoginIndex";
import NavLoggedIn from "./components/NavLoggedIn";

class App extends Component {
    componentWillMount() {
        if (localStorage.getItem('jwt_access') !== null) {
            axios.get('https://clouddevdb.cpvkbdcnilcb.eu-west-2.rds.amazonaws.com/user/login', {
                headers: {
                    Authorization: localStorage.getItem('jwt_access')
                }
            })
                .then(res => {
                })
                .catch(error => {
                    localStorage.removeItem('jwt_access');
                    window.location.href = "/";
                })
        }
    }

    render() {
        if (localStorage.getItem('jwt_access') !== null) {
            // Logged In
            return (
                <Router>
                    <div className="wrapper">
                        <NavLoggedIn/>
                        <div className="innerWrapper">
                        </div>
                    </div>
                </Router>
            )
        } else {
            //Logged Out
            return (
                <Router>
                    <div className="wrapper">
                        <Nav/>
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
