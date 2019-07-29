import React, { useState, useEffect } from 'react';
import './auctionChat.css';

import { formatTimestamp } from '../../utilities/helper';

import { Row, Col, List, Card, Input, Button } from 'antd'
import 'antd/dist/antd.css';

const { Search } = Input;

function AuctionChat(props) {
  
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        author: 'kwedass',
        timestamp: 465454236,
        content: 'Bow down to your admiral, you plebs'
      },
      {
        author: 'marty',
        timestamp: 894354245,
        content: 'I never have, nor will I ever bod down to you Ben Kwedar. In fact, you need to bow down to me!'
      }
    ]);
  }, []);

  const sendMessage = (value) => {
    console.log(value);
  }
  
  return (
    <Row style={{ height: 'calc(50vh - 70px)', marginTop: '12px' }} className='flex-growVert-parent'>
      <Card size='small' className='flex-growVert-child' bodyStyle={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <Row>
          <List
            dataSource={messages}
            style={{ overflow: 'auto' }}
            renderItem={message => (
              <div className='chat-message'>
                <span className='author'>{message.author}</span>
                <span className='timestamp'>{formatTimestamp(message.timestamp)}</span>
                <span className='content'>{message.content}</span>
              </div>
            )}
          />
        </Row>
        <Row style={{ marginTop: '6px' }}>
          <Search
            placeholder='Trash talk is encouraged..'
            enterButton='Send'
            size='default'
            onSearch={sendMessage}
          />
        </Row>
      </Card>
    </Row>
  );
}

export default AuctionChat;