import React, { Component } from 'react';
import SearchHistory from './SearchHistory';

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
      query: '',
      profile: null,
      history: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sort = this.sort.bind(this);
  }

  sort() {
    this.state.history.sort( (a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    })
    this.setState({
      history: history
    })
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const username = this.state.query;
    this.searchGithub(username);
    this.setState({
      history: this.state.history.concat(username)
    })
  }

  searchGithub(username) {
    // construct URL for github
    const access_token = '0eb42a3740ffa12dfc17bd3662a079f109d4bfdf';
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
    const result = this.state.profile
      ? <GitHubProfile profile={this.state.profile} />
      : <p>No Results</p>;
    const history = this.state.history
      ? <SearchHistory history={this.state.history} />
      : <p>No Search History</p>;
    return (
      <div>
        <h1>GitHub Search </h1>
        <form onSubmit={this.handleSubmit} >
          <input type="text" onChange={this.handleChange} />
          <button>Search</button>
        </form>
        {result}
        <SearchHistory
          sort={this.sort}
          history={this.state.history}
        />
      </div>
    );
  }
}

export default GitHubSearch;
