import React, {Component} from 'react';
import '../App.css';

class Index extends Component {

    render() {
        return (
            <div className="innerWrapper">
                <br/>
                <h1>Information</h1>
                <br/>
                <img src={require('../img/Sports-Running-icon.png')} alt="Logo" width={200}/>
                <h2>You are Logged In!</h2><br/>
                <br/><br/>
            </div>
        )
    }
}

export default Index;
