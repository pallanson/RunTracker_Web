import React, {Component} from 'react';
import { withRouter } from 'react-router';
import '../App.css';
import axios from 'axios';
import Modal from 'react-awesome-modal';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            username: '',
            pass: '',
            isLogged: false,
        };
    }

    openModal() {
        this.setState({
            visible: true
        });
    }

    closeModal() {
        this.setState({
            visible: false
        });
    }

    loginUser(event) {
        event.preventDefault();
        axios.post('/api/loginUser', {
            email: this.state.username,
            password: this.state.password
        })
            .then(res => {
                localStorage.setItem('jwt_access', res.headers.authorization);
                let today = new Date();
                today.setDate(today.getDate() + 12);
                document.cookie = "jwt_access" + res.headers.authorization + "; expires=" + today;
                window.location.reload();
            })
            .catch(error => {
                console.log("Log In Failed.")
            })
    }

    render() {
        return (
            <header className="header">
                <div className="innerWrapper">
                    <h1>
                        Run Away
                    </h1>

                    <div>
                        <button type="button" value="open" className="btn_login" onClick={() => this.openModal()}>

                            <img src={require('../img/login_icon.png')} alt="Login Icon" />
                        </button>
                        <Modal
                            visible={this.state.visible}
                            width="400"
                            height="450"
                            effect="fadeInDown"
                            onClickAway={() => this.closeModal()}
                        >
                            <div className="login">
                                <form onClick={this.loginUser.bind(this)}>
                                    <div className="modalLogo">
                                        <img src={require('../img/Sports-Running-icon.png')} alt="Run Away Logo" />
                                    </div>
                                    <div className="singleInput">
                                        <p>Username</p><br/>
                                        <input type="text" ref={(userInput) => this.username = userInput} />
                                    </div>
                                    <div className="singleInput">
                                        <p>Password</p><br/>
                                        <input type="text" ref={(userInput) => this.password = userInput}/>
                                    </div>
                                    <input type="submit" value="Sign In"/>
                                    <div className="modalFooter">
                                        <a href="/ForgotPassword/">Forgot Password?</a> | <a href="/CreateAccount/">Create Account</a>
                                    </div>
                                </form>
                            </div>
                        </Modal>
                    </div>

                </div>
            </header>
        );
    }
}

export default Nav;
