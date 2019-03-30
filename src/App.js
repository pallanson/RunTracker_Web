import React, {Component} from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import './App.css';
import Nav from "./components/Nav";
import Runs from "./components/Runs";
import Groups from "./components/Groups";
import Settings from "./components/Settings";
import Logout from "./components/Logout";
import LoginIndex from "./components/LoginIndex";
import Index from "./components/Index";
import NavLoggedIn from "./components/NavLoggedIn";

class App extends Component {
    /*componentWillMount() {
        if (localStorage.getItem('jwt_access') !== null) {
            axios.post('http://clouddevdb.cpvkbdcnilcb.eu-west-2.rds.amazonaws.com/user/login', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('jwt_access')
                }
            })
                .then(res => {
                    console.log(res);
                })
                .catch(error => {
                    localStorage.removeItem('jwt_access');
                    window.location.href = "/";
                })
        }
    }*/

    render() {
        if (localStorage.getItem('jwt_access') !== null) {
            // Logged In
            return (
                <Router>
                    <div className="wrapper">
                        <NavLoggedIn/>
                        <div className="innerWrapper">
                            <Switch>
                                <Route exact path="/" component={Index}/>
                                <Route exact path="/runs" component={Runs}/>
                                <Route exact path="/groups" component={Groups}/>
                                <Route exact path="/settings" component={Settings}/>
                                <Route exact path="/logout" component={Logout}/>
                                <Route component={404}/>
                            </Switch>
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
