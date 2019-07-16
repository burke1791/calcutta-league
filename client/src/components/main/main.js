import React from 'react';
import { Row, Col, Button } from 'antd';
import 'antd/dist/antd.css';

function Main() {

  const newLeague = () => {
    console.log('new league clicked');
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