import React, { useState, useEffect } from 'react';
import AuctionTeams from '../auctionTeams/auctionTeams';
import AuctionActions from '../auctionActions/auctionActions';
import AuctionChat from '../auctionChat/auctionChat';

import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import MyTeams from '../myTeams/myTeams';
import MemberList from '../memberList/memberList';

function LeagueAuction(props) {

  const [teams, setTeams] = useState([]);
  const [myTeams, setMyTeams] = useState([]);
  const [leagueUsers, setLeagueUsers] = useState([]);

  useEffect(() => {
    // API call to fetch teams
    
    // TEST DATA
    setTeams([
      {
        name: 'Illinois',
        price: null,
        owner: null
      },
      {
        name: 'Ohio State',
        price: 12,
        owner: 'burkcules'
      }
    ]);

    setMyTeams([
      {
        name: 'Ohio State',
        price: 12,
        owner: 'burkcules'
      }
    ]);

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
  }, [])
  // AuctionTeams
    // list of teams: name, price, purchaser, logo url
  // AuctionActions
    // firebase auctionId, user role
  // Chat
    // firebase auctionId
  // MyTeams
    // list of teams I purchased: name, price
  // MemberList
    // list of users in this league with total spent

  return (
    <Row style={{ height: 'calc(100vh - 114px)' }}>
      <Col span={8}>
        <AuctionTeams teams={teams} />
      </Col>
      <Col span={10} style={{ height: 'calc(100vh - 114px)' }} className='flex-growVert-parent'>
        <AuctionActions auctionId={props.auctionId} role={props.role} />
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