import React, { useState, useEffect } from 'react';
import './auctionActions.css';

import AuctionAdmin from '../auctionAdmin/auctionAdmin';

import { Button, Card, Statistic, Row, Col, InputNumber } from 'antd';
import 'antd/dist/antd.css';

import { formatMoney } from '../../utilities/helper';

const { Countdown } = Statistic;

function AuctionActions(props) {
  
  const [teamName, setTeamName] = useState('');
  const [highBid, setHighBid] = useState(0);
  const [highBidder, setHighBidder] = useState('n/a');
  const [totalSpent, setTotalSpent] = useState(0);
  const [bidVal, setBidVal] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(Date.now() + 15 * 1000);
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    // TEST DATA
    setTeamName('Illinois');
  }, []);

  const itemComplete = () => {
    console.log('Item complete');
  }

  const bidChange = (value) => {
    setBidVal(value);
  }

  const generateAdminButtons = () => {
    if (props.role === 'creator' || props.role === 'admin') {
      return (
        <AuctionAdmin inProgress={inProgress} />
      );
    } else {
      return null;
    }
  }
  
  return (
    <Row>
      <Card size='small'>
        <div className='team-name'>
          <span>{teamName}</span>
        </div>
        {generateAdminButtons()}
        <Row type='flex' justify='space-between' gutter={8} style={{ marginTop: '6px' }}>
          <Col span={12} className='flex-growVert-parent'>
            <Card size='small' bodyStyle={{ textAlign: 'center' }} className='flex-growVert-child'>
              <Statistic title='High Bid' value={formatMoney(highBid)} />
              <Statistic title='By' value={highBidder} />
            </Card>
          </Col>
          <Col span={12} className='flex-growVert-parent'>
            <Card size='small' bodyStyle={{ textAlign: 'center' }} className='flex-growVert-child'>
              <Countdown title='Time Remaining' value={timeRemaining} onFinish={itemComplete} />
            </Card>
          </Col>
        </Row>
        <Row type='flex' justify='space-between' gutter={8} style={{ marginTop: '6px' }}>
          <Col span={12} className='flex-growVert-parent'>
            <Card size='small' bodyStyle={{ textAlign: 'center' }} className='flex-growVert-child'>
              <Statistic title='Total Spent' value={formatMoney(totalSpent)} />
            </Card>
          </Col>
          <Col span={12} className='flex-growVert-parent'>
            <Card size='small' className='flex-growVert-child'>
              <Row type='flex' justify='space-around' gutter={8}>
                <InputNumber
                  min={0}
                  formatter={value => `\$ ${value}`}
                  parser={value => value.replace(/\$\s?/g, '')}
                  onChange={bidChange}
                  style={{ width: '50%' }}
                />
                <Button type='primary' style={{ width: '30%' }}>Bid</Button>
              </Row>
              <Row style={{ textAlign: 'center', marginTop: '6px' }} gutter={8}>
                <Button type='primary' style={{ width: '90%' }}>{highBid + 1} (Min Bid)</Button>
              </Row>
            </Card>
          </Col>
        </Row>
      </Card>
    </Row>
  );
}

export default AuctionActions;