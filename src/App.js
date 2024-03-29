import React, {Component} from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import './App.css';
import Nav from "./components/Nav";
import Runs from "./components/Runs";
import Groups from "./components/Groups";
import Settings from "./components/Settings";
import LoginIndex from "./components/LoginIndex";
import AdminPage from "./components/AdminPage";
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
                                <Route exact path="/" component={Runs}/>
                                <Route exact path="/runs" component={Runs}/>
                                <Route exact path="/groups" component={Groups}/>
                                <Route exact path="/settings" component={Settings}/>
                                <Route exact path="/admin" component={AdminPage}/>
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
                            <Route exact path="/runs" component={LoginIndex}/>
                            <Route exact path="/groups" component={LoginIndex}/>
                            <Route exact path="/settings" component={LoginIndex}/>
                            <Route exact path="/admin" component={LoginIndex}/>
                        </div>
                    </div>
                </Router>
            );
        }
    }
}

export default App;
