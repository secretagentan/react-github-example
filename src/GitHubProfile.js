import React, { Component } from 'react';

class GitHubProfile extends Component {
  render() {
    const avatar = this.props.profile.avatar_url;
    const avatarStyle = {
      height: '100px',
      width: '100px',
      borderRadius: '4px'
    }
    return (
      <div>
        <h1>GitHub Profile</h1>
        <p>{this.props.profile.login} </p>
        <img style={avatarStyle} src={avatar}/>
      </div>
    );
  }
}

export default GitHubProfile;
