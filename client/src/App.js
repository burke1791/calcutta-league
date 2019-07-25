import React, { useState, useEffect } from 'react';
import './App.css';
import { Router } from '@reach/router';

import Topnav from './components/topnav/topnav';
import Main from './components/main/main';

import axios from 'axios'; // testing

import { Layout } from 'antd';

const { Header, Footer, Content } = Layout;

function App() {
  const [test, setTest] = useState('no');

  useEffect(() => {
    axios.get('/api/getData').then(response => {
      console.log(response);
      setTest(response.data.message);
    });
  }, []);

  return (
    <div className="App">
      <Layout style={{ height: '100vh' }}>
        <Header>
          <Topnav />
        </Header>
        <Content style={{ margin: '16px 0' }}>
          <Router>
            <Main exact path='/' />
          </Router>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
