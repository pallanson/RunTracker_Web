import React, {Component} from 'react';
import '../App.css';
import axios from "axios";
import jwt_decode from "jwt-decode";
import {MdAdd, MdDelete, MdZoomIn} from "react-icons/md";
import Modal from 'react-awesome-modal';

class Groups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            visible: false,
            groupVisible: false,
            id: '0',
            name: '',
            admin: '',
            members: [],
            currentUser: jwt_decode(localStorage.getItem('jwt_access')).username,
        };
    }

    componentWillMount() {
        //Get list of user's groups
        axios.get('http://ec2-13-53-40-173.eu-north-1.compute.amazonaws.com:5000/group/user/' + jwt_decode(localStorage.getItem('jwt_access')).username, {
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
    }

    openModal = (event) => {
        this.setState({
            visible: true,
            groupVisible: false,
            id: event.group_id,
            name: event.groupName,
            admin: event.admin,
            members: event.members,
        });
        console.log(event)
        // Set state here?
    }

    closeModal() {
        this.setState({
            visible: false,
        });
    }

    createGroup = (event) => {
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt_access'),
        };
        let data = {
            username: jwt_decode(localStorage.getItem('jwt_access')).username,
            groupName: this.state.groupName
        };
        axios.post('http://ec2-13-53-40-173.eu-north-1.compute.amazonaws.com:5000/group', data, {headers : headers})
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(error => {
                console.error("Creating Group Failed!" + error)
            });
    };

    handleChange = (event) => {
        const target = event.target;
        let id = target.id;
        let value = target.value;
        if (id === 'username') {
            this.setState({
                groupName: value
            })
        }
    };

    deleteGroup = (event) => {
        console.log(this.state.currentUser);
        console.log(this.state.id);
        console.log(this.state.admin);
        if (this.state.currentUser === this.state.admin) {
            axios.delete('http://ec2-13-53-40-173.eu-north-1.compute.amazonaws.com:5000/group/' + this.state.id, {
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
        } else {
            console.error("You are not an admin in this group.");
        }
    }

    deleteMember = (event) => {
        console.log(this.state.currentUser);
        console.log(this.state.id);
        console.log(event);
        if (this.state.currentUser === this.state.admin) {
            axios.delete('http://ec2-13-53-40-173.eu-north-1.compute.amazonaws.com:5000/group/' + this.state.id + "/" + event, {
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
        } else {
            console.error("You are not an admin in this group.");
        }
    }

    render() {
        return (
            <div className="innerWrapper">
                <br/>
                <h1>Groups</h1>
                <br/>
                <img src={require('../img/Sports-Running-icon.png')} alt="Logo" width={200}/>
                <p className="label_create">Group Name</p>
                <input type="text" id="username" className="text_create" onChange={this.handleChange}/>
                <button className="btn_create" onClick={this.createGroup.bind(this)}>
                    Create Group
                </button>
                <br/><br/>
                <table>
                    <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Group Name</th>
                        <th>Group Admin</th>
                        <th>Number of Members</th>
                        <th>View</th>
                    </tr>
                    {this.state.groups.map((item, i) => (<tr>
                        <td>{item.group_id}</td>
                        <td>{item.groupName}</td>
                        <td>{item.admin}</td>
                        <td>{item.members.length}</td>
                        <td>
                            <button type="button" value="open" className="btn_list"
                                    onClick={(event) => this.openModal(item, event)}>
                                <MdZoomIn/>
                            </button>
                        </td>
                    </tr>))}
                    </tbody>
                </table>
                <Modal
                    visible={this.state.visible}
                    width="400"
                    height="475"
                    effect="fadeInDown"
                    onClickAway={() => this.closeModal()}
                >
                    <div className="modal">
                        <h1>Group {this.state.id}</h1>
                        <h2>{this.state.name}</h2><br/><br/>
                        <p><b>Members:</b></p>
                        {this.state.members.map((member, i) =>
                                <p className="modalList">{member}</p>
                        )}<br/>
                        <p><b>Admin:</b> {this.state.admin}</p>
                        <div className="modalFooter">
                            <button type="button" value="open" className="btn_list"
                                    onClick={(event) => this.deleteGroup(this, event)}>
                                <MdDelete/>
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Groups;
