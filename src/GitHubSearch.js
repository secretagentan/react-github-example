import React, { Component } from 'react';
import GitHubProfile from './GitHubProfile';
import GitHubHistory from './GitHubHistory';

class GitHubSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      profile: null,
      searchHistory: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sort = this.sort.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const username = this.state.query;
    this.searchGithub(username);
    this.setState({
      searchHistory: this.state.searchHistory.concat(username)
    })
  }

  handleChange(evt) {
    this.setState({
      query: evt.target.value
    })
  }

  searchGithub(username) {
    // construct URL for github
    const access_token = '228207330963ddb199de39e5784d9089c7973c16';
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

  sort() {
    this.state.searchHistory.sort( (a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    })
    this.setState({
    // searchHistory: searchHistory
    // WHY DOES IT NOT WORK WITH THIS???
    })
  }

  render () {
    const result = this.state.profile
      ? <GitHubProfile profile={this.state.profile} />
      : <p>No Results</p>;
    return (
      <div>
        <h1>GitHub Search </h1>
        <form onSubmit={this.handleSubmit} >
          <input type="text" onChange={this.handleChange} />
          <button>Search</button>
        </form>
        {result}
        <GitHubHistory
          sort={this.sort}
          searchHistory={this.state.searchHistory}
        />
      </div>
    );
  }
}

export default GitHubSearch;
