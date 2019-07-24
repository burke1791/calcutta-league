import React from 'react';

import { Table } from 'antd';
import 'antd/dist/antd.css';

function LeagueTable(props) {

  let columns = [
    {
      title: 'League Name',
      dataIndex: 'name',
      align: 'left'
    },
    {
      title: 'Buy In',
      dataIndex: 'buyIn',
      align: 'center'
    },
    {
      title: 'Current Payout',
      dataIndex: 'payout',
      align: 'center'
    },
    {
      title: 'Net Return',
      dataIndex: 'return',
      align: 'center'
    }
  ];

  const renderTable = () => {
    if (props.list.length) {
      return (
        <Table 
          columns={columns} 
          dataSource={props.list} 
          size='middle' 
          pagination={false} 
          onRow={
            (record, index) => {
              return {
                onClick: (event) => {
                  // utilize the router to go to the league page
                  console.log('clicked this row');
                }
              };
            }
          }
        />
      );
    } else {
      let data = [
        {
          key: 1,
          name: 'You haven\'t joined any leagues yet',
          buyIn: '',
          payout: '',
          return: ''
        }
      ];
      return (
        <Table 
          columns={columns} 
          dataSource={data} 
          size='middle' 
          pagination={false} 
        />
      );
    }
  }

  return (
    <div>
      {renderTable()}
    </div>    
  );
}

export default LeagueTable;