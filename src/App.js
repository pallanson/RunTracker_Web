import React, { Component } from 'react';
import './App.css';
import Header from "./components/Header";

class App extends Component {
    state = {
        login: [
            {
                id: 1,
                username: 'Username',
                password: 'Password'
            },
            {
                id: 2,
                username: 'Username',
                password: 'Password'
            },
            {
                id: 3,
                username: 'Username',
                password: 'Password'
            },

        ]
    }

  render() {
        console.log(this.state.login)
    return (
      <div className="App">
        <Header />
      </div>
    );
  }
}

export default App;
