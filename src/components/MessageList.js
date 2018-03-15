import React, { Component } from 'react';

export class MessageList extends Component {
  constructor(props) {
    super(props);
      this.state = { user: '', content: '', sentAt: '', roomId: '', messages: [] }
      this.messagesRef = this.props.firebase.database().ref('messages');
      this.handleChange = this.handleChange.bind(this);
      this.createMessage = this.createMessage.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      user: this.props.user,
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom
    });
  }

  createMessage(e) {
    e.preventDefault();
    this.messagesRef.push({
      user: this.state.user,
      content: this.state.content,
      sentAt: this.state.sentAt,
      roomId: this.state.roomId
    });
    this.setState({ user: '', content: '', sentAt: '', roomId: ''});
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) })
    });
  }

  render() {
    const activeRoom = this.props.activeRoom;

    const messageBar = (
      <form onSubmit={this.createMessage}>
        <input type='text' value={this.state.content} placeholder='Enter New Message' onChange={this.handleChange} />
        <input type='submit' value='Send' />
      </form>
    );

    const messageList = (
      this.state.messages.map((message) => {
        if (message.roomId === activeRoom) {
          return <li key={message.key}>
          <span className="userName">{message.user}: {message.content}</span>
          <span className="timeStamp">{message.sentAt}</span>
          </li>
        }
        return null;
      })
    );

    return (
      <div>
        <div>
          <span>{messageList}</span>
        </div>
          <div>{messageBar}</div>
      </div>
    );
  }
}
