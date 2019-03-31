import React, {Component} from 'react';
import '../App.css';
import axios from "axios";
import {MdDelete, MdGroup, MdZoomIn} from 'react-icons/md';
import jwt_decode from 'jwt-decode';
import {Link} from "react-router-dom";

class Runs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            runs: [],
        };
    }

    componentWillMount() {
        //Get users information
        axios.get('http://ec2-13-53-172-93.eu-north-1.compute.amazonaws.com:5000/run/' + jwt_decode(localStorage.getItem('jwt_access')).username, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt_access'),
            },
        })
            .then(res => {
                // Create a list of runs
                const runs = res.data;
                this.setState({runs});
            })
            .catch(error => {
                console.log("Retrieving Runs Failed." + error)
            });
    }

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

    deleteRun() {
        axios.delete('http://ec2-13-53-172-93.eu-north-1.compute.amazonaws.com:5000/run/' + this.run_id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt_access'),
            },
        })
            .then(res => {
                console.log(res);
                window.location.reload();
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
                    <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Location</th>
                        <th>Start Time</th>
                        <th>Duration</th>
                        <th>Delete</th>
                        <th>View</th>
                    </tr>
                    {this.state.runs.map(item => (<tr>
                        <td>{item.run_id}</td>
                        <td>Hell</td>
                        <td>{item.startTime}</td>
                        <td>{item.timeInSeconds}</td>
                        <td>
                            <button type="button" value="open" className="btn_list" onClick={this.deleteRun.bind(item)}>
                                <MdDelete/>
                            </button>
                        </td>
                        <td>
                            <button type="button" value="open" className="btn_list">
                                <MdZoomIn/>
                            </button>
                        </td>
                    </tr>))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Runs;
