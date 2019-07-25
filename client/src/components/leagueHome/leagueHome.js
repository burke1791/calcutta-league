import React, { useState, useEffect } from 'react';

import { Layout, Table, Row } from 'antd';
import 'antd/dist/antd.css';

const { Header, Content } = Layout;

const columns = [
  {
    title: 'Rank',
    dataIndex: 'rank',
    align: 'center',
    width: 75
  },
  {
    title: 'Name',
    dataIndex: 'name',
    align: 'center',
    width: 250
  },
  {
    title: 'Buy In',
    dataIndex: 'buyIn',
    align: 'center',
    width: 150
  },
  {
    title: 'Current Payout',
    dataIndex: 'payout',
    align: 'center',
    width: 150
  },
  {
    title: 'Net Return',
    dataIndex: 'return',
    align: 'center',
    width: 150
  }
];

function LeagueHome(props) {
  
  const [leagueName, setLeagueName] = useState('test league name');
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    // grab league user summary info
  })

  return (
    <Layout>
      <Header style={{ background: 'none', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px' }}>{leagueName}</h1>
      </Header>
      <Content>
        <Row type='flex' justify='center'>
          <Table
            columns={columns}
            dataSource={userList}
            size='middle'
            pagination={false}
            onRow={
              (record, index) => {
                return {
                  onClick: (event) => {
                    console.log('user page coming soon');
                  }
                };
              }
            }
          />
        </Row>
        <Row>
          {/* Pie chart of auction breakdown (after auction is complete) */}
        </Row>
      </Content>
    </Layout>
  );
}

export default LeagueHome;