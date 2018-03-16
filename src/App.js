import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import { RoomList } from './components/RoomList';
import { MessageList } from './components/MessageList';
import { User } from './components/User';

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
      this.state = {activeRoom: '', user: null};
      this.activeRoom = this.activeRoom.bind(this);
      this.setUser = this.setUser.bind(this);
  }

  activeRoom(room) {
    this.setState({ activeRoom: room });
  }

  setUser(user) {
    this.setState({ user: user });
  }

  render() {
    const currentUser = this.state.user === null ? "Guest" : this.state.user.displayName;

    return (
      <div>
        <div id="sideNavBar">
          <h1>BLOC CHAT</h1>
          <User firebase={firebase} setUser={this.setUser} greeting={currentUser}/>
          <RoomList firebase={firebase} activeRoom={this.activeRoom} />
        </div>
        <div id="roomInfo">
          <h1>{this.state.activeRoom.name || "Select A Room"}</h1>
          {this.state.activeRoom &&
          <MessageList firebase={firebase} activeRoom={this.state.activeRoom.key} user={currentUser}/>
          }
        </div>
      </div>
    );
  }
}

export default App;
