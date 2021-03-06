import React, { Component } from 'react';

export class User extends Component {
  constructor(props) {
    super(props);
      this.signIn = this.signIn.bind(this);
      this.signOut = this.signOut.bind(this);
  }

  signIn() {
      const provider = new this.props.firebase.auth.GoogleAuthProvider();
      this.props.firebase.auth().signInWithPopup(provider).then((result) => {
        const user = result.user;
        this.props.setUser(user);
      });
  }

  signOut() {
    this.props.firebase.auth().signOut().then(() => {
      this.props.setUser(null);
    });
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
    });
  }

  render () {
    return (
      <div>
        <h2>Hello, {this.props.greeting}</h2>
        { this.props.greeting === "Guest" ?
          <button id='userSignInButton' onClick={this.signIn}>Sign In</button>
          :
          <button id='userSignOutButton' onClick={this.signOut}>Sign Out</button>
        }
      </div>
    )
  }

}
