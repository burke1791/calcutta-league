import React, { useEffect, useState } from 'react';
import './messageThread.css';

import { Layout, Row, Button, Comment, List, Form, Input, Avatar } from 'antd';
import 'antd/dist/antd.css';
import DataService, { Data } from '../../utilities/data';
import Pubsub from '../../utilities/pubsub';
import { NOTIF } from '../../utilities/constants';

const { Header, Content } = Layout;
const { TextArea } = Input;

function MessageThread(props) {
  
  const [topicName, setTopicName] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessageContent, setNewMessageContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    Pubsub.subscribe(NOTIF.MESSAGE_THREAD_DOWNLOADED, MessageThread, messagesDownloaded);

    DataService.downloadMessageThread(props.topicId);

    return (() => {
      Pubsub.unsubscribe(NOTIF.MESSAGE_THREAD_DOWNLOADED, MessageThread);
    });
  }, []);

  const messagesDownloaded = () => {
    setMessages(Data.messageThread);
  }

  const userClicked = (userId) => {
    // navigate to the user's profile page
    console.log('user: ' + userId);
  }

  const handleNewMessageChange = (event) => {
    setNewMessageContent(event.target.value);
  }

  const submitNewMessage = () => {
    // perform validation then send to server
    console.log('submit new message');
    setSubmitting(true);
  }
  
  return (
    <div>
      <Layout>
        <Header style={{ background: 'none', textAlign: 'center' }}>
          <h1 style={{ fontSize: '32px' }}>{topicName}</h1>
        </Header>
        <Content>
          <Row type='flex' justify='center'>
            <List
              className="chat-window"
              // header={`${data.length} replies`}
              itemLayout="horizontal"
              dataSource={messages}
              renderItem={item => (
                <li>
                  <Comment
                    //actions={item.actions}
                    author={<Button type='link' size='small' onClick={() => userClicked(item.authorId)}>{item.author}</Button>}
                    avatar={
                      <Avatar icon='user' />
                    }
                    content={
                      <p>
                        {item.content}
                      </p>
                    }
                    datetime={
                      <span>{item.created}</span>
                    }
                  />
                </li>
              )}
            />
          </Row>
          <Row type='flex' justify='center'>
            <div>
              <Form.Item>
                <TextArea rows={4} onChange={handleNewMessageChange} value={newMessageContent} />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" loading={submitting} onClick={submitNewMessage} type="primary">
                  Send Message
                </Button>
              </Form.Item>
            </div>
          </Row>
        </Content>
      </Layout>
    </div>
  );
}

export default MessageThread;