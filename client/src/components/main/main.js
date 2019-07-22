import React from 'react';
import { Row, Col, Button } from 'antd';
import 'antd/dist/antd.css';

import axios from 'axios';
import { API_POST, NOTIF, LEAGUE_FORM_TYPE } from '../../utilities/constants';
import Pubsub from '../../utilities/pubsub';
import LeagueModal from '../leagueModal/leagueModal';
import { User } from '../../firebase/authService';

function Main() {

  const newLeague = () => {
    console.log('new league clicked');
    if (User.user_id) {
      Pubsub.publish(NOTIF.LEAGUE_MODAL_SHOW, LEAGUE_FORM_TYPE.CREATE);
    } else {
      alert('Please sign in to create a league');
    }
  }

  const joinLeague = () => {
    console.log('join league clicked');
    if (User.user_id) {
      Pubsub.publish(NOTIF.LEAGUE_MODAL_SHOW, LEAGUE_FORM_TYPE.JOIN);
    } else {
      alert('Please sign in to join a league');
    }
  }

  return (
    <div>
      <Row type='flex' justify='center'>
        <Col span={4} style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type='primary' onClick={newLeague} style={{ margin: '0 12px' }}>Start a League</Button>
          <Button type='primary' onClick={joinLeague} style={{ margin: '0 12px' }}>Join a League</Button>
        </Col>
      </Row>
      <LeagueModal />
    </div>
  );
}

export default Main;