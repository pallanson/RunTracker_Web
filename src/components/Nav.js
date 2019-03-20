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

    handleChange = (event) => {
        const target = event.target;
        let id = target.id;
        let value = target.value;
        if (id === 'username') {
            this.setState({
                username: value
            })
        } else if (id === 'password') {
            this.setState({
                password: value
            })
        }
    };

    loginUser = (event) => {
        event.preventDefault();
        axios.post('localhost:5000/user/login', {
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
            });
    };

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
            <header className="header">
                <div className="innerWrapper">
                    <h1>
                        Run Away
                    </h1>

                    <div>
                        <button type="button" value="open" className="btn_login" onClick={() => this.openModal()}>

                            <img src={require('../img/login_icon.png')} alt="Login Icon"/>
                        </button>
                        <Modal
                            visible={this.state.visible}
                            width="400"
                            height="450"
                            effect="fadeInDown"
                            onClickAway={() => this.closeModal()}
                        >
                            <div className="login">
                                <form onSubmit={this.loginUser.bind(this)}>
                                    <div className="modalLogo">
                                        <img src={require('../img/Sports-Running-icon.png')} alt="Run Away Logo"/>
                                    </div>
                                    <div className="singleInput">
                                        <p>Email</p><br/>
                                        <input type="email" id="email" onChange={this.handleChange}/>
                                    </div>
                                    <div className="singleInput">
                                        <p>Password</p><br/>
                                        <input type="password" id="password" onChange={this.handleChange}/>
                                    </div>
                                    <input type="submit" value="Sign In"/>
                                    <div className="modalFooter">
                                        <a href="/ForgotPassword/">Forgot Password?</a> | <a href="/CreateAccount/">Create
                                        Account</a>
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

export default withRouter(Nav);
