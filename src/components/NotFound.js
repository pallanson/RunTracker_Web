import React, {Component} from 'react';
import '../App.css';

class NotFound extends Component {

    render() {
        return (
            <div className="innerWrapper">
                <br/>
                <h1>404</h1>
                <br/>
                <img src={require('../img/Sports-Running-icon.png')} alt="Logo" width={200}/>
                <h2>This is not the page you were looking for.</h2><br/>
            </div>
        )
    }
}

export default NotFound;
