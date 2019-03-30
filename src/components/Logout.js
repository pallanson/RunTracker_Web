import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'

class Logout extends Component {
    componentWillMount() {
        localStorage.removeItem('jwt_access');
    }

    render() {
        window.location.reload();
        return <Redirect to='/'/>;
    }
}

export default (Logout);