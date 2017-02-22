import React, { Component } from 'react';
import GitHubProfile from './GitHubProfile';
import SearchHistory from './SearchHistory';

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

  handleSubmit(evt) {
    evt.preventDefault();
    const username = this.state.query;
    this.searchGithub(username);
    this.setState({
      history: this.state.history.concat(username)
    })
  }

  handleChange(evt) {
    console.log(evt.target.value);
    this.setState({
      query: evt.target.value
    })
  }

  searchGithub(username) {
    // construct URL for github
    const access_token = '8230e944e56cedc25f4c8145b48f8df51489f711';
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
    this.state.history.sort( (a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    })
    this.setState({
      history: history
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
          history={this.state.history}
          sort={this.sort}
        />
      </div>
    );
  }
}

export default GitHubSearch;
