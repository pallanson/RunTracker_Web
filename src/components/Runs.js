import React, {Component} from 'react';
import '../App.css';
import axios from "axios";
import jwt_decode from 'jwt-decode';

class Runs extends Component {
    componentWillMount() {
        axios.get('http://ec2-13-53-172-93.eu-north-1.compute.amazonaws.com:5000/run/pallanson', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt_access'),
            },
            username: "pallanson"
        })
            .then(res => {
                console.log(res);
                console.log(jwt_decode(localStorage.getItem("jwt_access")))
            })
            .catch(error => {
                console.log("Retrieving Runs Failed." + error)
            });
    }

    render() {
        return (
            <div className="innerWrapper">
                <br/>
                <h1>Runs Page!</h1>
                <br/>
                <img src={require('../img/Sports-Running-icon.png')} alt="Logo" width={200}/>
                <h2>You are Run Paged In!</h2><br/><br/><br/>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Location</th>
                        <th>Start Time</th>
                        <th>Duration</th>
                    </tr>

                </table>
            </div>
        )
    }
}

export default Runs;
