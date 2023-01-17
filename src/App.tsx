import React from 'react';
import logo from './logo.svg';
import './App.css';

import LinksWidget from './LinksWidget';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <LinksWidget
          name="Dartur links"
          links={[
            { name: "Google", url: "https://google.com" },
            { name: "Facebook", url: "https://facebook.com" },
            { name: "Twitter", url: "https://twitter.com" },
          ]}
        />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
