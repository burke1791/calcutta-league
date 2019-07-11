import React, { useState, useEffect } from 'react';
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
      
    </div>
  );
}

export default App;
