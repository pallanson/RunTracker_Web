import React, {Component} from 'react';
import '../App.css';

class LoginIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            username: '',
            pass: '',
        };
    }

    render() {
        return (
            <div className="innerWrapper">
                <br/><br/>
                <img src={require('../img/Sports-Running-icon.png')} alt="Logo" width={300}/>
                <h2>Welcome to RunTracker!</h2><br/>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis mi eu dolor tristique imperdiet
                    consequat auctor ipsum. Pellentesque non tincidunt neque. Morbi convallis nulla et bibendum
                    bibendum. Phasellus accumsan blandit dolor, vel sagittis enim placerat vitae. Cras id eros ultricies
                    odio tincidunt aliquam. Nullam at dolor ac ante lacinia feugiat id ut est. Sed tempus elementum
                    nisl, ullamcorper dictum orci placerat a. Aliquam dapibus quam id augue semper, dictum porta erat
                    volutpat.

                    Aliquam et metus pellentesque, scelerisque ipsum sit amet, vulputate sapien. Mauris pharetra ipsum
                    eget neque egestas, vel suscipit nibh feugiat. Vivamus ante erat, ultrices id arcu condimentum,
                    aliquet commodo nunc. Fusce quis lacus nisi. Vivamus ut odio molestie, pulvinar quam eget, elementum
                    metus. Cras consectetur rhoncus egestas. Sed ac volutpat massa. Etiam a eros pretium, malesuada mi
                    vel, varius elit. Suspendisse commodo congue odio et vulputate. Duis finibus condimentum mi, at
                    faucibus tellus dignissim sed. Vivamus sed elit vel ex molestie ultrices. Sed odio orci, iaculis
                    molestie faucibus a, tempus sed magna.</p>
            </div>
        )
    }
}

export default LoginIndex;
