import React, { useState } from 'react';
import { Router } from '@reach/router';

import LeagueNav from '../leagueNav/leagueNav';
import LeagueHome from '../leagueHome/leagueHome';
import LeagueAuction from '../leagueAuction/leagueAuction';

import { Layout } from 'antd';
import 'antd/dist/antd.css';

const { Header } = Layout;

function League(props) {
  const [auctionId, setAuctionId] = useState(props.location.state.auctionId);

  return (
    <Layout>
      <LeagueNav leagueId={props.leagueId} />
      <Router>
        <LeagueHome path='/' />
        <LeagueAuction path='auction' auctionId={auctionId} />
      </Router>
    </Layout>
  );
}

export default League;