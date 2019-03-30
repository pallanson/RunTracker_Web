import React, {Component} from 'react';
import '../App.css';

class Groups extends Component {
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
                <h1>Groups Page!</h1>
                <br/>
                <img src={require('../img/Sports-Running-icon.png')} alt="Logo" width={200}/>
                <h2>You are Grouped In!</h2><br/>
            </div>
        )
    }
}

export default Groups;
