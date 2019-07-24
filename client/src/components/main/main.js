import React from 'react';
import { Row, Col, Button } from 'antd';
import 'antd/dist/antd.css';

import LeagueTable from '../leagueTable/leagueTable';
import LeagueModal from '../leagueModal/leagueModal';

import { NOTIF, LEAGUE_FORM_TYPE } from '../../utilities/constants';
import Pubsub from '../../utilities/pubsub';
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
        <Button type='primary' onClick={newLeague} style={{ margin: '20px 12px' }}>Start a League</Button>
        <Button type='primary' onClick={joinLeague} style={{ margin: '20px 12px' }}>Join a League</Button>
      </Row>
      <Row type='flex' justify='center'>
        <LeagueTable type='in-progress' list={[]} />
      </Row>
      <LeagueModal />
    </div>
  );
}

export default Main;