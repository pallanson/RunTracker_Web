import React, {Component} from 'react';
import {withRouter} from 'react-router';
import '../App.css';
import axios from 'axios';

class NavLoggedIn extends Component {
    state = {
        "email": null,
        "password": null
    };

    // Logs the user out
    logoutUser = (event) => {
        event.preventDefault();
    };

    render() {
        return (
            <header className="header">
                <div className="innerWrapper">
                    <h1>
                        Run Away
                    </h1>

                    <div>
                        <button type="button" value="open" className="btn_logout" onClick={() => this.logoutUser()}>
                            <img src={require('../img/login_icon.png')} alt="Logout Icon"/>
                        </button>
                    </div>
                </div>
            </header>
        );
    }
}

export default withRouter(NavLoggedIn);
