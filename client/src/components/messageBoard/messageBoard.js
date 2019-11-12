import React, { useState, useEffect } from 'react';
import './messageBoard.css';

import { Layout, Table, Row, Button } from 'antd';
import 'antd/dist/antd.css';
import DataService, { Data } from '../../utilities/data';
import Pubsub from '../../utilities/pubsub';
import { NOTIF } from '../../utilities/constants';


const { Header, Content } = Layout;

function MessageBoard(props) {

  const [leagueName, setLeagueName] = useState('Test Name');
  const [topicList, setTopicList] = useState([]);

  useEffect(() => {
    Pubsub.subscribe(NOTIF.MESSAGE_BOARD_TOPICS_DOWNLOADED, MessageBoard, topicsDownloaded);

    DataService.getMessageBoardTopics(props.leagueId);

    return (() => {
      Pubsub.unsubscribe(NOTIF.MESSAGE_BOARD_TOPICS_DOWNLOADED, MessageBoard);
    });
  }, []);

  const topicsDownloaded = () => {
    setTopicList(Data.messageBoardTopics);
  }

  const topicClicked = (topicId) => {
    // navigate to the MessageThread component
    console.log('topic: ' + topicId);
  }

  const userClicked = (userId) => {
    // navigate to the User's page
    console.log('user: ' + userId);
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
                onClick={() => userClicked(topicObj.authorId)}
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
      width: 250
    },
    {
      title: 'Last Post',
      dataIndex: 'lastPost',
      align: 'left',
      width: 250,
      render: lastPostObj => {
        return (
          <div className='lastPost'>
            <p className='margin-0'>{lastPostObj.created}</p>
            <p className='margin-0'>
              by 
              <Button
                type='link'
                size='small'
                onClick={() => userClicked(lastPostObj.authorId)}
              >
                {lastPostObj.author}  
              </Button>
            </p>
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