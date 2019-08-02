import React from 'react';

import { Row, Card, Table } from 'antd';
import 'antd/dist/antd.css';

import { formatMoney } from '../../utilities/helper';

const columns = [
  {
    title: 'Team',
    dataIndex: 'team_name',
    key: 'name'
  },
  {
    title: 'Paid',
    dataIndex: 'price',
    key: 'price',
    render: (value) => formatMoney(value)
  }
];

function MyTeams(props) {
  return (
    <Row style={{ height: 'calc(50vh - 70px)' }}>
      <Card style={{ height: '100%' }} bodyStyle={{ padding: '0' }} size='small'>
        <Table
          columns={columns}
          dataSource={props.myTeams}
          pagination={false}
          size='small'
          bordered={false}
          style={{ border: 'none' }}
        />
      </Card>
    </Row>
  );
}

export default MyTeams;