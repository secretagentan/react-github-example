import React, { Component } from 'react';

const SearchHistory = ({history, sort}) => {
  const pStyle = {
    display: 'block',
    width: '100%',
    textAlign: 'center'
  }
  const results = history.map((name, i) => <p style={pStyle} key={i}>{name}</p>);
  if (history.length === 0 ) {
    return (
    <div>
      <h1>Search History</h1>
      <p>No Search History</p>
    </div>
    )
  } else {
    return (
      <div>
        <h1>Search History</h1>
        <button onClick={sort}>Sort</button>
        <div>
          {results}
        </div>
      </div>
    )
  }
}

export default SearchHistory;
