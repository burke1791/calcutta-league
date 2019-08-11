import React from 'react';

import { Button } from 'antd';
import 'antd/dist/antd.css';
import { AUCTION_STATUS } from '../../utilities/constants';

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

    return <Button type={btnType} disabled={disabled} style={btnStyle} onClick={startStopClick}>{btnText}</Button>
  }

  const startStopClick = (event) => {
    event.preventDefault();
    let name = event.target.name;

    if (name == 'start') {
      // Start auction
    } else if (name == 'stop') {
      // Stop auction
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