console.log('')
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

class GitHubSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const username = this.state.query;
    this.searchGithub(username);
  }

  searchGithub(username) {
    // construct URL for github
    const access_token = '1ae2a3617cc07bc9ae81cc3f1c5d59a576cbb19b';
    const url = `https://api.github.com/users/${username}?access_token=${access_token}`;
    // do a fetch request
    // parse the json response
    fetch(url).then( res => res.json() ).then( profile => {
    // set state to result
      this.setState({
        profile: profile
      })
    })
  }

  handleChange(evt) {
    console.log(evt.target.value);
    this.setState({
      query: evt.target.value
    })
  }

  render () {
    const result = this.state.profile ?
      <GitHubProfile profile={this.state.profile} /> :
      <p>No Results</p>;
    return (
      <div>
        <h1>GitHub Search </h1>
        <form onSubmit={this.handleSubmit} >
          <input type="text" onChange={this.handleChange} />
          <button>Search</button>
        </form>
        {result}
      </div>
    );
  }
}

export default GitHubSearch;
