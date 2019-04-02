import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import {MdExitToApp, MdGroup, MdDirectionsRun, MdSettings, MdHome, MdVpnKey} from 'react-icons/md';
import '../App.css';

class NavLoggedIn extends Component {

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
                        <button type="button" value="open" className="btn_nav"
                                onClick={this.logoutUser}>
                            <MdExitToApp/>
                        </button>
                        <Link to="/settings">
                            <button type="button" value="open" className="btn_nav">
                                <MdSettings/>
                            </button>
                        </Link>
                        <Link to="/groups">
                            <button type="button" value="open" className="btn_nav">
                                <MdGroup/>
                            </button>
                        </Link>
                        <Link to="/runs">
                            <button type="button" value="open" className="btn_nav">
                                <MdDirectionsRun/>
                            </button>
                        </Link>
                        <Link to="/">
                            <button type="button" value="open" className="btn_nav">
                                <MdHome/>
                            </button>
                        </Link>
                        <Link to="/admin">
                            <button type="button" value="open" className="btn_nav">
                                <MdVpnKey/>
                            </button>
                        </Link>
                    </div>
                </div>
            </header>
        );
    }
}

export default withRouter(NavLoggedIn);
