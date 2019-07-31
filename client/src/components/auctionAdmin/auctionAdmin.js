import React from 'react';

import { Button } from 'antd';
import 'antd/dist/antd.css';

const btnStyle = {
  marginTop: '4px'
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between'
};

function AuctionAdmin(props) {
  
  const generateStartStopButton = () => {
    if (props.inProgress) {
      return (
        <Button type='danger' style={btnStyle}>Stop Auction</Button>
      );
    } else {
      return (
        <Button type='primary' style={btnStyle}>Start Auction</Button>
      );
    }
  }
  
  return (
    <div className='admin-actions' style={containerStyle}>
      {generateStartStopButton()}
      <Button type='primary' style={btnStyle}>Next Item</Button>
      <Button type='primary' style={btnStyle}>Reset Clock</Button>
    </div>
  );
}

export default AuctionAdmin;