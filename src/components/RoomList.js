import React, { Component } from 'react';

export class RoomList extends Component {
  constructor(props) {
    super(props);
      this.state = { name: '', rooms: [] };
      this.roomsRef = this.props.firebase.database().ref('rooms');
      this.handleChange = this.handleChange.bind(this);
      this.createRoom = this.createRoom.bind(this);
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) })
    });
  }

  createRoom(e) {
    e.preventDefault();
    this.roomsRef.push({ name: this.state.name });
    this.setState({ name: '' });
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  selectRoom(room) {
    this.props.activeRoom(room);
  }

  render() {
    const roomForm = (
      <form onSubmit={this.createRoom}>
        <input type='text' value={this.state.name} placeholder='Enter New Room Name' onChange={this.handleChange} />
        <input type='submit' value='Create' />
      </form>
    );

    const roomList = this.state.rooms.map((room) =>
      <li key={room.key} onClick= {(e) => this.selectRoom(room, e) } >{room.name}</li>
  );
    return (
      <div>
        <div>{roomForm}</div>
        <ul>{roomList}</ul>
      </div>
    );
  }
}
