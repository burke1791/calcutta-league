import React from 'react';
import { Router } from '@reach/router';

import LeagueNav from '../leagueNav/leagueNav';
import LeagueHome from '../leagueHome/leagueHome';
import LeagueAuction from '../leagueAuction/leagueAuction';

import { Layout } from 'antd';
import 'antd/dist/antd.css';

const { Header } = Layout;

function League(props) {

  return (
    <Layout>
      <LeagueNav leagueId={props.leagueId} />
      <Router>
        <LeagueHome path='/' />
        <LeagueAuction path='auction' />
      </Router>
    </Layout>
  );
}

export default League;