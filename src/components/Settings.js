import React, {Component} from 'react';
import '../App.css';
import jwt_decode from "jwt-decode";

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            pass: '',
            currentUser: jwt_decode(localStorage.getItem('jwt_access'))
        };
    }

    componentWillMount() {
        console.log(this.state.currentUser);
    }

    render() {
        return (
            <div className="innerWrapper">
                <br/>
                <h1>Your Profile</h1>
                <br/>
                <img src={require('../img/Sports-Running-icon.png')} alt="Logo" width={200}/>
                <h2><b>Username:</b> {this.state.currentUser.username}</h2><br/>
                <h2><b>Email:</b> {this.state.currentUser.email}</h2><br/>
            </div>
        )
    }
}

export default Settings;
