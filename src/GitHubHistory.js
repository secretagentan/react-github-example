import React from 'react';

const GitHubHistory = (props) => {
  console.log(props)
  console.log(props.searchHistory);

  if (props.searchHistory.length === 0 ) {
    return (
    <div>
      <h1>Search History</h1>
      <p>No Search History</p>
    </div>
    )
  }

  const pStyle = {
    display: 'block',
    width: '100%',
    textAlign: 'center'
  }

  const results = props.searchHistory.map((name, i) => <p style={pStyle} key={i}>{name}</p>);
  return (
    <div>
      <h1>Search History</h1>
      <button onClick={props.sort}>Sort</button>
      <div>
        {results}
      </div>
    </div>
  )
}

export default GitHubHistory;
