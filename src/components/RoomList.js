import React, { Component } from 'react';
import App from './App.js';

class RoomList extends Component {
  constructor(prop) {
    super(props);
      this.state = { rooms: [] };
      this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  render() {
    return (
      <div className='roomList'>
        <ul>
          { this.state.rooms.map( (room, key) =>
            <room key={ room.key} />
          )};
        </ul>
      </div>
    );
  }
}

export default RoomList;