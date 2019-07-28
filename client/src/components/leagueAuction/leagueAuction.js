import React, { useState, useEffect } from 'react';
import AuctionTeams from '../auctionTeams/auctionTeams';
import AuctionActions from '../auctionActions/auctionActions';
import AuctionChat from '../auctionChat/auctionChat';

import { Row, Col } from 'antd';
import 'antd/dist/antd.css';

function LeagueAuction(props) {

  const [teams, setTeams] = useState([]);

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
  }, [])
  // AuctionTeams
    // list of teams: name, price, purchaser, logo url
  // AuctionActions
    // firebase auctionId
  // Chat
    // firebase auctionId
  // MyTeams
    // list of teams I purchased: name, price
  // MemberList
    // list of users in this league with total spent

  return (
    <Row>
      <Col span={8}>
        <AuctionTeams teams={teams} />
      </Col>
      <Col span={8}>
        <AuctionActions auctionId={props.auctionId} />
        <AuctionChat auctionId={props.auctionId} />
      </Col>
      <Col span={8}>
        {/* My Teams List */}
        {/* Member List */}
      </Col>
    </Row>
  );
}

export default LeagueAuction;