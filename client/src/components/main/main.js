import React from 'react';
import { Row, Col, Button } from 'antd';
import 'antd/dist/antd.css';

import axios from 'axios';
import { API_POST } from '../../utilities/constants';

function Main() {

  const newLeague = () => {
    console.log('new league clicked');
    let leagueObj = {
      name: 'Test',
      password: 'test',
      year: 2019
    };
    axios.post(API_POST.create_league, leagueObj).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    })
  }

  const joinLeague = () => {
    console.log('join league clicked');
  }

  return (
    <div>
      <Row type='flex' justify='center'>
        <Col span={4} style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type='primary' onClick={newLeague} style={{ margin: '0 12px' }}>Start a League</Button>
          <Button type='primary' onClick={joinLeague} style={{ margin: '0 12px' }}>Join a League</Button>
        </Col>
      </Row>
    </div>
  );
}

export default Main;