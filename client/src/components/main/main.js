import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'antd';
import 'antd/dist/antd.css';

import LeagueTable from '../leagueTable/leagueTable';
import LeagueModal from '../leagueModal/leagueModal';

import { NOTIF, LEAGUE_FORM_TYPE } from '../../utilities/constants';
import Pubsub from '../../utilities/pubsub';
import { User } from '../../firebase/authService';
import { Data } from '../../utilities/data';

function Main() {

  const [leagueSummaries, setLeagueSummaries] = useState([]);

  useEffect(() => {
    Pubsub.subscribe(NOTIF.SIGN_IN, this, handleSignin);
    Pubsub.subscribe(NOTIF.SIGN_OUT, this, handleSignout);

    return (() => {
      Pubsub.unsubscribe(NOTIF.SIGN_IN, this);
      Pubsub.unsubscribe(NOTIF.SIGN_OUT, this);
    });
  }, []);

  // copy the summary info from Data into local state, which triggers a rerender
  const handleNewLeagueInfo = () => {
    setLeagueSummaries(
      (() => {
        return Data.leagues.map(league => {
          return {
            name: league.league_name,
            buyIn: league.buy_in || '$0.00',
            payout: league.payout || '$0.00',
            return: league.return || '$0.00',
            key: league.league_id
          };
        });
      })()
    );
  }

  // loads in league summary info from global state
  // and rerenders the table on the main page
  const handleSignin = () => {
    handleNewLeagueInfo();
  }

  // empties league summaries info on signout,
  // which triggers a rerender to show the default table on the main page
  const handleSignout = () => {
    setLeagueSummaries([]);
  }

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
        <LeagueTable type='in-progress' list={leagueSummaries} />
      </Row>
      <LeagueModal />
    </div>
  );
}

export default Main;