import React, {Component} from 'react';
import '../App.css';
import axios from "axios";
import {MdDelete, MdZoomIn} from 'react-icons/md';
import jwt_decode from 'jwt-decode';
import Modal from 'react-awesome-modal';
import {GoogleApiWrapper, Map, Polyline} from 'google-maps-react';

class Runs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            runs: [],
            visible: false,
            id: '0',
            date: '',
            duration: '',
            locations: [],
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
        let fixedLocations = event.locations;
        // Make Location Data Usable with Google Maps
        for (let i = 0; i < event.locations.length; i++) {
            event.locations[i].lat = event.locations[i].latitude;
            delete event.locations[i].latitude;
            event.locations[i].lng = event.locations[i].longitude;
            delete event.locations[i].longitude;
            delete event.locations[i].timestamp;
        }
        console.log(fixedLocations);
        this.setState({
            visible: true,
            id: event.run_id,
            date: event.startTime.substring(0, 10),
            duration: event.timeInSeconds,
            locations: event.locations,
            x: fixedLocations[0].lat,
            y: fixedLocations[0].lng,
        });
        console.log(event.locations);
    }

    closeModal() {
        this.setState({
            visible: false
        });
    }

    deleteRun = (event) => {
        console.log(this.state.x);
        console.log(this.state.y);
        console.log(this.state.locations);
    }

    render() {
        return (
            <div className="innerWrapper">
                <br/>
                <h1>Runs</h1>
                <br/>
                <img src={require('../img/Sports-Running-icon.png')} alt="Logo" width={200}/>
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
                    width="900"
                    height="800"
                    effect="fadeInDown"
                    onClickAway={() => this.closeModal()}
                >
                    <div className="modal">
                        <h1>Run #{this.state.id}</h1>
                        <button type="button" value="open" className="btn_list"
                                onClick={(event) => this.deleteRun(this.state.id, event)}>
                            <MdDelete/>
                        </button>
                        <br/>
                        <div className="googleMap">
                            <Map google={this.props.google}
                                 style={{width: '600px', height: '600px'}}
                                 center={{
                                     lat: this.state.x,
                                     lng: this.state.y
                                 }}
                                 zoom={16}>
                                <Polyline
                                    path={this.state.locations}
                                    geodesic={true}
                                    strokeColor="#00b99f"
                                    strokeOpacity={1}
                                    strokeWeight={4}/>
                            </Map>
                        </div>
                        <p><b>Date:</b> {this.state.date}</p>
                        <p><b>Run Duration:</b> {this.state.duration} Seconds</p>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyCLdiT7JPD6NYsNzTtIqq4K_HNG66f-UvQ')
})(Runs);
