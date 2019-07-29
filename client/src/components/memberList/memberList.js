import React from 'react';

import { Row, Col, Card, Table } from 'antd';
import 'antd/dist/antd.css';

import { formatMoney } from '../../utilities/helper';

const columns = [
  {
    title: 'Member',
    dataIndex: 'user',
    key: 'user'
  },
  {
    title: 'Total Paid',
    dataIndex: 'buyIn',
    key: 'buyIn',
    render: (value) => formatMoney(value)
  }
];

function MemberList(props) {
  return (
    <Row style={{ height: 'calc(50vh - 70px)' }}>
      <Card style={{ height: '100%' }}>
        <Table
          columns={columns}
          dataSource={props.users}
          pagination={false}
        />
      </Card>
    </Row>
  );
}

export default MemberList;