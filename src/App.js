import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyATyYnx7GM6zaCvGUvdl14qHFsuXoRRdgM",
    authDomain: "bloc-chat-react-f0816.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-f0816.firebaseio.com",
    projectId: "bloc-chat-react-f0816",
    storageBucket: "bloc-chat-react-f0816.appspot.com",
    messagingSenderId: "698673929646"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    
  }

  handleRooms = (rooms) => {
    this.setState({rooms: rooms});
  }

  render() {
    return (
      <div className="App">
        <h1>Bloc Chat</h1>
        <RoomList rooms={this.handleRooms} firebase={firebase} />
      </div>
    );
  }
}

export default App;
