import React, { useState, useEffect } from 'react';
import AuctionTeams from '../auctionTeams/auctionTeams';
import AuctionActions from '../auctionActions/auctionActions';
import AuctionChat from '../auctionChat/auctionChat';

import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import MyTeams from '../myTeams/myTeams';
import MemberList from '../memberList/memberList';
import DataService, { Data } from '../../utilities/data';
import Pubsub from '../../utilities/pubsub';
import { NOTIF } from '../../utilities/constants';
import { User } from '../../firebase/authService';

function LeagueAuction(props) {

  const [teams, setTeams] = useState([]);
  const [prizepool, setPrizepool] = useState(0);
  const [myTeams, setMyTeams] = useState([]);
  const [leagueUsers, setLeagueUsers] = useState([]);

  useEffect(() => {
    // API call to fetch teams
    // DataService.getAuctionTeams(props.leagueId);
    fetchAuctionTeams(true);
    DataService.startAuctionListener(props.auctionId);

    Pubsub.subscribe(NOTIF.AUCTION_TEAMS_DOWNLOADED, this, auctionTeamsDownloaded);
    Pubsub.subscribe(NOTIF.NEW_AUCTION_DATA, this, fetchAuctionTeams);

    setLeagueUsers([
      {
        user: 'burkcules',
        buyIn: 12,
      },
      {
        user: 'kwedass',
        buyIn: 0
      },
      {
        user: 'marty',
        buyIn: 0
      }
    ]);

    return (() => {
      Pubsub.unsubscribe(NOTIF.AUCTION_TEAMS_DOWNLOADED, this);
      Pubsub.unsubscribe(NOTIF.NEW_AUCTION_DATA, this);

      DataService.killAuctionListener();
    });
  }, []);

  const auctionTeamsDownloaded = () => {
    setTeams(Data.auctionTeams);

    let totalBid = 0;
    const myTeamsArr = Data.auctionTeams.filter(team => {
      totalBid += team.price;
      if (team.user_id === User.user_id) {
        return team;
      }
    });
    setMyTeams(myTeamsArr);
    setPrizepool(totalBid);
  }

  const fetchAuctionTeams = (newItem) => {
    if (newItem) {
      DataService.getAuctionTeams(props.leagueId);
    }
  }

  return (
    <Row style={{ height: 'calc(100vh - 114px)' }}>
      <Col span={8}>
        <AuctionTeams teams={teams} prizepool={prizepool} />
      </Col>
      <Col span={10} style={{ height: 'calc(100vh - 114px)' }} className='flex-growVert-parent'>
        <AuctionActions auctionId={props.auctionId} role={props.role} leagueId={props.leagueId} />
        <AuctionChat auctionId={props.auctionId} />
      </Col>
      <Col span={6}>
        <MyTeams myTeams={myTeams} />
        <MemberList users={leagueUsers} />
      </Col>
    </Row>
  );
}

export default LeagueAuction;