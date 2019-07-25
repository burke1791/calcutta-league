import React from 'react';
import { Router } from '@reach/router';

import LeagueNav from '../leagueNav/leagueNav';
import LeagueHome from '../leagueHome/leagueHome';
import LeagueAuction from '../leagueAuction/leagueAuction';

function League(props) {

  return (
    <div>
      <LeagueNav leagueId={props.leagueId} />
      <Router>
        <LeagueHome path='/' />
        <LeagueAuction path='auction' />
      </Router>
    </div>
  );
}

export default League;