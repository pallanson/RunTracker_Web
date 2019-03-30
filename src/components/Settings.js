import React, {Component} from 'react';
import '../App.css';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            pass: '',
        };
    }

    render() {
        return (
            <div className="innerWrapper">
                <br/>
                <h1>Settings Page!</h1>
                <br/>
                <img src={require('../img/Sports-Running-icon.png')} alt="Logo" width={200}/>
                <h2>You are Settings Paged In!</h2><br/>
            </div>
        )
    }
}

export default Settings;
