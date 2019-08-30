import React, { useState, useEffect } from 'react';
import './messageBoard.css';

import { Layout, Table, Row, Button } from 'antd';
import 'antd/dist/antd.css';


const { Header, Content } = Layout;

function MessageBoard(props) {

  const [leagueName, setLeagueName] = useState('Test Name');
  const [topicList, setTopicList] = useState([]);

  useEffect(() => {
    setTopicList([
      {
        topic: {
          title: 'Test Dummy Data',
          author: 'Burke',
          id: 1
        },
        created: new Date().toLocaleTimeString(),
        lastPost: {
          author: 'Burke',
          created: new Date().toLocaleTimeString()
        },
        postCount: 69
      }
    ])
  });

  const topicClicked = (topicId) => {
    // navigate to the MessageThread component
    console.log('topic: ' + topicId);
  }

  const columns = [
    {
      title: 'Topic',
      dataIndex: 'topic',
      align: 'left',
      width: 300,
      render: topicObj => {
        return (
          <div className='topicTitle' style={{ textAlign: 'left' }}>
            <Button 
              type='link'
              style={{ display: 'block', padding: '0' }}
              size='small'
              onClick={() => topicClicked(topicObj.id)}
            >
              {topicObj.title}
            </Button>
            <span>
              by 
              <Button 
                type='link'
                size='small'
              >
                {topicObj.author}
              </Button>
            </span>
          </div>
        );
      }
    },
    {
      title: 'Created',
      dataIndex: 'created',
      align: 'left',
      width: 150
    },
    {
      title: 'Last Post',
      dataIndex: 'lastPost',
      align: 'left',
      width: 150,
      render: lastPostObj => {
        return (
          <div className='lastPost'>
            <p className='margin-0'>{lastPostObj.created}</p>
            <p className='margin-0'>by {lastPostObj.author}</p>
          </div>
        )
      }
    },
    {
      title: 'Posts',
      dataIndex: 'postCount',
      align: 'center',
      width: 100
    }
  ];

  return (
    <div>
      <Layout>
        <Header style={{ background: 'none', textAlign: 'center' }}>
          <h1 style={{ fontSize: '32px' }}>{leagueName} Message Board</h1>
        </Header>
        <Content>
          <Row type='flex' justify='center'>
            <Table 
              columns={columns}
              dataSource={topicList}
              size='small'
              pagination={false}
            />
          </Row>
        </Content>
      </Layout>
    </div>
  );
}

export default MessageBoard;