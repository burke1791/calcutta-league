import React, { useState, useEffect } from 'react';
import './auctionTeams.css';

import { Row, Col, List } from 'antd';
import 'antd/dist/antd.css';
import { formatMoney } from '../../utilities/helper';

function AuctionTeams(props) {
  
  return (
    <div style={{ padding: '0 6px' }}>
      <Row type='flex' justify='space-between' style={{ padding: '6px 10px' }}>
        <h3>Auction Order</h3>
        <h3>Prizepool: $69.69</h3>
      </Row>
      <Row>
        <List
          bordered={true}
          itemLayout='horizontal'
          dataSource={props.teams}
          style={{ padding: '6px 10px' }}
          renderItem={team => (
            <List.Item className={team.price ? 'purchased' : ''} style={{ justifyContent: 'space-between' }}>
              <h3>{team.name}</h3>
              <h4>{team.price ? formatMoney(team.price) : 'undrafted'}</h4>
            </List.Item>
          )}
        />
      </Row>
    </div>
  );
}

export default AuctionTeams;