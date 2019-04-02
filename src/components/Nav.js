import React, {Component} from 'react';
import {withRouter} from 'react-router';
import { MdPerson } from "react-icons/md";
import '../App.css';
import axios from 'axios';
import Modal from 'react-awesome-modal';

class Nav extends Component {
    state = {
        "email": null,
        "password": null,
        "isLogged": null
    };

    openModal() {
        this.setState({
            visible: true,
            visibleRegister: false
        });
    }

    closeModal() {
        this.setState({
            visible: false
        });
    }

    openRegisterModal() {
        this.setState({
            visible: false,
            visibleRegister: true
        });
    }

    closeRegisterModal() {
        this.setState({
            visibleRegister: false
        });
    }

    handleChange = (event) => {
        const target = event.target;
        let id = target.id;
        let value = target.value;
        if (id === 'email') {
            this.setState({
                email: value
            })
        } else if (id === 'username') {
            this.setState({
                username: value
            })
        } else if (id === 'name') {
            this.setState({
                name: value
            })
        } else if (id === 'password') {
            this.setState({
                password: value
            })
        }
    };

    loginUser = (event) => {
        event.preventDefault();
        axios.post('http://ec2-13-53-172-93.eu-north-1.compute.amazonaws.com:5000/user/login', {
            headers: {
                'Content-Type': 'application/json',
            },
            usernameOrEmail: this.state.email,
            password: this.state.password
        })
            .then(res => {
                console.log(res.data.token);
                localStorage.setItem('jwt_access', res.data.token);
                let today = new Date();
                today.setDate(today.getDate() + 1200);
                document.cookie = "jwt_access" + res.data.token + "; expires=" + today;
                window.location.reload();
            })
            .catch(error => {
                console.log("Log In Failed." + error)
            });
    };

    createUser = (event) => {
        event.preventDefault();
        axios.post('http://ec2-13-53-172-93.eu-north-1.compute.amazonaws.com:5000/user/', {
            headers: {
                'Content-Type': 'application/json'
            },
            username: this.state.username,
            email: this.state.email,
            name: this.state.name,
            password: this.state.password,
            isAdmin: false
        })
            .then(res => {
                console.log("User Registered!");
                console.log(res);
                localStorage.setItem('jwt_access', res.headers.authorization);
                let today = new Date();
                today.setDate(today.getDate() + 1200);
                document.cookie = "jwt_access" + res.headers.authorization + "; expires=" + today;
                window.location.reload();
            })
            .catch(error => {
                console.log("User Register Failed: " + error);
            });
    };

    render() {
        return (
            <header className="header">
                <div className="innerWrapper">
                    <h1>
                        RunTracker
                    </h1>

                    <div>
                        <button type="button" value="open" className="btn_nav" onClick={() => this.openModal()}>
                            <MdPerson/>
                        </button>
                        <Modal
                            visible={this.state.visible}
                            width="400"
                            height="475"
                            effect="fadeInDown"
                            onClickAway={() => this.closeModal()}
                        >
                            <div className="modal">
                                <form onSubmit={this.loginUser.bind(this)}>
                                    <h1>Login</h1>
                                    <div className="modalLogo">
                                        <img src={require('../img/Sports-Running-icon.png')} alt="Run Away Logo"/>
                                    </div>
                                    <div className="singleInput">
                                        <p>Username or Email</p><br/>
                                        <input type="text" id="email" onChange={this.handleChange}/>
                                    </div>
                                    <div className="singleInput">
                                        <p>Password</p><br/>
                                        <input type="text" id="password" onChange={this.handleChange}/>
                                    </div>
                                    <input type="submit" value="Sign In"/>
                                    <div className="modalFooter">
                                        <button type="button" value="open"
                                                onClick={() => this.openRegisterModal()}> Register Account
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Modal>
                        <Modal
                            visible={this.state.visibleRegister}
                            width="400"
                            height="600"
                            effect="fadeInDown"
                            onClickAway={() => this.closeRegisterModal()}
                        >
                            <div className="modal">
                                <form onSubmit={this.createUser.bind(this)}>
                                    <h1>Register</h1>
                                    <div className="modalLogo">
                                        <img src={require('../img/Sports-Running-icon.png')} alt="Run Away Logo"/>
                                    </div>
                                    <div className="singleInput">
                                        <p>Email</p><br/>
                                        <input type="text" id="email" onChange={this.handleChange}/>
                                    </div>
                                    <div className="singleInput">
                                        <p>Username</p><br/>
                                        <input type="text" id="username" onChange={this.handleChange}/>
                                    </div>
                                    <div className="singleInput">
                                        <p>Full Name</p><br/>
                                        <input type="text" id="name" onChange={this.handleChange}/>
                                    </div>
                                    <div className="singleInput">
                                        <p>Password</p><br/>
                                        <input type="text" id="password" onChange={this.handleChange}/>
                                    </div>
                                    <input type="submit" value="Register"/>
                                    <div className="modalFooter">
                                        <button type="button" value="open" onClick={() => this.openModal()}> Log In
                                        </button>
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
