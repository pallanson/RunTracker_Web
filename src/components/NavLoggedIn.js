import React, {Component} from 'react';
import {withRouter} from 'react-router';
import '../App.css';

class NavLoggedIn extends Component {
    state = {
        "email": null,
        "password": null
    };

    // Logs the user out
    logoutUser = (event) => {
        console.log("Why hello there");
        localStorage.removeItem('jwt_access');
        window.location.reload();
    };

    render() {
        return (
            <header className="header">
                <div className="innerWrapper">
                    <h1>
                        Run Away
                    </h1>

                    <div>
                        <button type="button" value="open" className="btn_nav" onClick={() => this.logoutUser()}>
                            <img src={require('../img/login_icon.png')} alt="Logout Icon"/>
                        </button>
                    </div>
                </div>
            </header>
        );
    }
}

export default withRouter(NavLoggedIn);
