import React, {Component} from 'react';
import '../App.css';
import LoginCard from "./LoginCard";

class Header extends Component {
    render() {
        return (
            <div className="wrapper">
            <header className="header">
                <h1>
                    Login
                </h1>
                <LoginCard />
            </header>
            </div>
        );
    }
}

export default Header;
