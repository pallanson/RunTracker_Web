import React, {Component} from 'react';
import '../App.css';

class LoginCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
            username: '',
            password: '',
        };

        this.loginUser = this.loginUser.bind(this);
    }

    handleInput(event) {
        this.setState({username: this.state.username, password: this.state.password});
        event.preventDefault();
    }

    loginUser(event) {
        alert('Username: ' + this.state.username + '  |  Password: ' + this.state.password);
        event.preventDefault();
    }

    showLogin(event) {
        event.preventDefault();

        this.setState({
            showMenu: true,
            username: '',
            password: '',
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.showLogin}>
                    Image HERE
                </button>

                {
                    this.state.showLogin
                    ? (
                            <div className="login">
                                <form onSubmit={this.loginUser}>
                                    <label>
                                        Username
                                        <input type="text" value={this.state.username} onChange={this.handleInput}/>
                                        <input type="text" value={this.state.password} />
                                    </label>
                                    <input type="submit" value="Sign In"/>
                                </form>
                            </div>
                        )
                        : (
                            null
                        )
                }
            </div>
        )
    }
}

export default LoginCard;