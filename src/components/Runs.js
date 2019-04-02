import React, {Component} from 'react';
import '../App.css';
import axios from "axios";
import {MdDelete, MdZoomIn} from 'react-icons/md';
import jwt_decode from 'jwt-decode';
import Modal from 'react-awesome-modal';

class Runs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            runs: [],
            visible: false,
            id: '0',
            date: '',
            duration: '',
        };
    }

    componentDidMount() {
        //Get list of user's runs
        console.log(localStorage.getItem('jwt_access'));
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

    openModal = (event) => {
        this.setState({
            visible: true,
            id: event.run_id,
            date: event.startTime.substring(0, 10),
            duration: event.timeInSeconds,
        });
        console.log(event)
        // Set state here?
    }

    closeModal() {
        this.setState({
            visible: false
        });
    }

    deleteRun = (event) => {
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
                        <th>Date</th>
                        <th>Duration</th>
                        <th>Delete</th>
                        <th>View</th>
                    </tr>
                    {this.state.runs.map((item, i) => (<tr>
                        <td>{item.run_id}</td>
                        <td>{item.startTime.substring(0, 10)}</td>
                        <td>{item.timeInSeconds} Seconds</td>
                        <td>
                            <button type="button" value="open" className="btn_list"
                                    onClick={(event) => this.deleteRun(item.run_id, event)}>
                                <MdDelete/>
                            </button>
                        </td>
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
                        <h1>Run #{this.state.id}</h1><br/><br/>
                        <p>Google Maps Image Here</p><br/>
                        <p><b>Date:</b> {this.state.date}</p><br/>
                        <p><b>Run Duration:</b> {this.state.duration} Seconds</p>
                        <div className="modalFooter">
                            <button type="button" value="open" className="btn_list"
                                    onClick={(event) => this.deleteRun(this.state.id, event)}>
                                <MdDelete/>
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Runs;
