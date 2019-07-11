import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';

function App() {
  const [test, setTest] = useState('no');

  useEffect(() => {
    axios.get('/api/getData').then(response => {
      console.log(response);
      setTest(response.data.message);
    });
  });
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          Did the GET request work? {test}
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
