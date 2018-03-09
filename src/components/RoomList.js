import React, { Component } from 'react';

export class RoomList extends Component {
  constructor(props) {
    super(props);
      this.state = { name: '', rooms: [] };
      this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  createRoom(e) {
    e.preventDefault();
    this.roomsRef.push({ name: this.state.name });
    this.setState({ name: '' });
  }

  handleChange(e) {
    this.setState({ name: e.target.value })
  }

  render() {
    const roomList = this.state.rooms.map((room) =>
      <li key={room.key}>{room.name}</li>
  );
    return (
      <div id="roomListData">
        <ul>{roomList}</ul>
        <form onSubmit={ (e) => this.createRoom(e) }>
          <input type='text' value={ this.state.name } placeholder='Enter New Room Name Here' onChange={ (e) => this.handleChange(e) }/>
          <input type='submit' />
        </form>
      </div>
    );
  }
}
