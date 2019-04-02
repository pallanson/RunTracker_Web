import React, {Component} from 'react';
import '../App.css';
import axios from "axios";
import jwt_decode from "jwt-decode";
import {MdDelete} from "react-icons/md";

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            runs: [],
            users: [],
            currentUser: jwt_decode(localStorage.getItem('jwt_access')).username,
        };
    }

    componentWillMount() {
        //Check if User is Admin
        if (jwt_decode(localStorage.getItem('jwt_access')).isAdmin) {
            // Get List of Groups
            axios.get('http://ec2-13-53-172-93.eu-north-1.compute.amazonaws.com:5000/group/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt_access'),
                },
            })
                .then(res => {
                    // Create a list of groups
                    const groups = res.data;
                    this.setState({groups});
                    console.log(groups);
                })
                .catch(error => {
                    console.log("Retrieving Groups Failed." + error)
                });
            // Get List of Runs
            axios.get('http://ec2-13-53-172-93.eu-north-1.compute.amazonaws.com:5000/run/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt_access'),
                },
            })
                .then(res => {
                    // Create a list of groups
                    const runs = res.data;
                    this.setState({runs});
                    console.log(runs);
                })
                .catch(error => {
                    console.log("Retrieving Groups Failed." + error)
                });
            // Get List of Users
            axios.get('http://ec2-13-53-172-93.eu-north-1.compute.amazonaws.com:5000/user/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt_access'),
                },
            })
                .then(res => {
                    // Create a list of groups
                    const users = res.data;
                    this.setState({users});
                    console.log(users);
                })
                .catch(error => {
                    console.log("Retrieving Groups Failed." + error)
                });
        } else {
            // Go back to previous page / index page
        }
    }

    deleteGroup = (event) => {
        console.log(this.state.currentUser);
        console.log(event);
        axios.delete('http://ec2-13-53-172-93.eu-north-1.compute.amazonaws.com:5000/group/' + event, {
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
                console.log("Deleting Group Failed." + error)
            });
    }

    deleteRun = (event) => {
        console.log(event);
        axios.delete('http://ec2-13-53-172-93.eu-north-1.compute.amazonaws.com:5000/run/' + event, {
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
                console.log("Deleting Run Failed." + error)
            });
    }

    deleteUser = (event) => {
        console.log(event);
        axios.delete('http://ec2-13-53-172-93.eu-north-1.compute.amazonaws.com:5000/user/' + event, {
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
                console.log("Deleting User Failed." + error)
            });
    }

    render() {
        return (
            <div className="adminPage">
                <div className="adminTable">
                    <h2>Groups</h2>
                    <table>
                        <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Admin</th>
                            <th>Delete</th>
                        </tr>
                        {this.state.groups.map((item, i) => (<tr>
                            <td>{item.groupName}</td>
                            <td>{item.admin}</td>
                            <td>
                                <button type="button" value="open" className="btn_list"
                                        onClick={(event) => this.deleteGroup(item.group_id, event)}>
                                    <MdDelete/>
                                </button>
                            </td>
                        </tr>))}
                        </tbody>
                    </table>
                </div>
                <div className="adminTable">
                    <h2>Runs</h2>
                    <table>
                        <tbody>
                        <tr>
                            <th>ID</th>
                            <th>User</th>
                            <th>Delete</th>
                        </tr>
                        {this.state.runs.map((item, i) => (<tr>
                            <td>{item.run_id}</td>
                            <td>{item.user}</td>
                            <td>
                                <button type="button" value="open" className="btn_list"
                                        onClick={(event) => this.deleteRun(item.run_id, event)}>
                                    <MdDelete/>
                                </button>
                            </td>
                        </tr>))}
                        </tbody>
                    </table>
                </div>
                <div className="adminTable">
                    <h2>Users</h2>
                    <table>
                        <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Delete</th>
                        </tr>
                        {this.state.users.map((item, i) => (<tr>
                            <td>{item.name}</td>
                            <td>{item.username}</td>
                            <td>
                                <button type="button" value="open" className="btn_list"
                                        onClick={(event) => this.deleteUser(item.username, event)}>
                                    <MdDelete/>
                                </button>
                            </td>
                        </tr>))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default AdminPage;