import React, {Component} from 'react';
import {withRouter} from 'react-router';
import '../App.css';
import axios from 'axios';
import Modal from 'react-awesome-modal';

class Nav extends Component {
    state = {
        "email": null,
        "password": null,
        "isLogged": null
    };

    baseState = this.state;

    getUser = (event) => {
        event.preventDefault();
        const user = event.target.elements.username.value;
        axios.get('localhost:5000/user/${user}')
            .then((res) => {
                this.setState({ res });
            })
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">HTTP Calls in React</h1>
                </header>
                <UserForm getUser={this.getUser} />
                { this.state.repos ? <p>Number of repos: { this.state.repos }</p> : <p>Please enter a username.</p> }
            </div>
        );
    }
}

export default withRouter(Nav);
