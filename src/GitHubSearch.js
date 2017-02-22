console.log('')
import React, { Component } from 'react';

class SearchHistory extends Component {
  render() {
    // const usernames = [];
    // usernames.push(this.props.profile.login);
    // console.log(usernames);
    const results = history.map( (name, i) => <li key={i}>{name}</li> );
    return (
      <div>
        <h1>Search History</h1>
        <ul>
          {results}
        </ul>
      </div>
    )
  }
  // render() {
  //   const SearchHistory = ({history}) => {
  //     const results = history.map( (name, i) => <li key={i}>{name}</li>;
  //   }
  //     return (
  //       <div>
  //         <h1>Search History</h1>
  //         <ul>
  //           {results}
  //         </ul>
  //       </div>
  //     )
  //   // }
  // }
}


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
    const access_token = '5eb66dbee37ff2f75dba1c3bdea22a96783e109b';
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
    const history = this.state.profile ?
      <SearchHistory profile={this.state.profile} /> :
      <p>No Search History</p>;
    return (
      <div>
        <h1>GitHub Search </h1>
        <form onSubmit={this.handleSubmit} >
          <input type="text" onChange={this.handleChange} />
          <button>Search</button>
        </form>
        {result}
        {history}
      </div>
    );
  }
}

export default GitHubSearch;
