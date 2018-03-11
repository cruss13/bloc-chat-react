import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import { RoomList } from './components/RoomList';
import { MessageList } from './components/MessageList';

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
      this.state = {activeRoom: '' };
      this.activeRoom = this.activeRoom.bind(this);
  }

  activeRoom(room) {
    this.setState({ activeRoom: room })
  }


  render() {
    const showMessages = this.state.activeRoom;
    return (
      <div>
          <h1>{this.state.activeRoom.name || "Select A Room"}</h1>
          <RoomList firebase={firebase} activeRoom={this.activeRoom} />
          { showMessages ?
          (<MessageList firebase={firebase} activeRoom={this.state.activeRoom.key}/>)
          : (null)
          }
      </div>
    );
  }
}

export default App;
