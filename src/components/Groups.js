import React, {Component} from 'react';
import '../App.css';
import axios from "axios";
import jwt_decode from "jwt-decode";
import {Link} from "react-router-dom";
import {MdDelete, MdZoomIn} from "react-icons/md";

class Groups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
        };
    }

    componentWillMount() {
        //Get users information
        axios.get('http://ec2-13-53-172-93.eu-north-1.compute.amazonaws.com:5000/group/user/' + jwt_decode(localStorage.getItem('jwt_access')).username, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt_access'),
            },
        })
            .then(res => {
                // Create a list of runs
                const groups = res.data;
                this.setState({groups});
                console.log(groups);
            })
            .catch(error => {
                console.log("Retrieving Runs Failed." + error)
            });
    }

    render() {
        return (
            <div className="innerWrapper">
                <br/>
                <h1>Groups Page!</h1>
                <br/>
                <img src={require('../img/Sports-Running-icon.png')} alt="Logo" width={200}/>
                <h2>You are Grouped In!</h2><br/>
                <table>
                    <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Group Name</th>
                        <th>Group Admin</th>
                        <th>Number of Members</th>
                        <th>Delete</th>
                        <th>View</th>
                    </tr>
                    {this.state.groups.map(item => (<tr>
                        <td>{item.group_id}</td>
                        <td>{item.groupName}</td>
                        <td>{item.admin}</td>
                        <td>{item.members.length}</td>
                        <td>
                            <button type="button" value="open" className="btn_list">
                                <MdDelete/>
                            </button>
                        </td>
                        <td>
                            <Link to="/view_run">
                                <button type="button" value="open" className="btn_list">
                                    <MdZoomIn/>
                                </button>
                            </Link>
                        </td>
                    </tr>))}
                    </tbody>
                </table>

            </div>
        )
    }
}

export default Groups;
