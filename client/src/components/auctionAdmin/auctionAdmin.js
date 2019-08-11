import React from 'react';

import { Button } from 'antd';
import 'antd/dist/antd.css';
import { AUCTION_STATUS } from '../../utilities/constants';
import DataService from '../../utilities/data';

const btnStyle = {
  marginTop: '4px'
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between'
};

function AuctionAdmin(props) {
  
  const generateStartStopButton = () => {
    let btnText = 'Start Auction';
    let btnType = 'primary';
    let disabled = false;
    let name = 'start';

    if (props.status === AUCTION_STATUS.IN_PROGRESS || props.status === AUCTION_STATUS.ITEM_COMPLETE) {
      btnText = 'Stop Auction';
      btnType = 'danger';
      name = 'stop'
    } else if (props.status === AUCTION_STATUS.END) {
      btnText = 'Auction Complete';
      btnType = 'primary'
      disabled = true;
      name = 'n/a';
    }

    return <Button type={btnType} disabled={disabled} style={btnStyle} onClick={startStopClick} name={name}>{btnText}</Button>
  }

  const startStopClick = (event) => {
    event.preventDefault();
    let name = event.target.name;

    if (name == 'start') {
      // Start auction
      console.log('auction start clicked');
      DataService.startAuction(props.auctionId, props.leagueId /* , teamObj */);
    } else if (name == 'stop') {
      DataService.stopAuction(props.auctionId, props.leagueId);
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