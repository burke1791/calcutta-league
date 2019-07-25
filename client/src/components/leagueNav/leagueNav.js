import React from 'react';
import { Menu } from 'antd';
import 'antd/dist/antd.css';
import { navigate } from '@reach/router';

function LeagueNav(props) {

  const handleLeagueNavClick = (event) => {
    if (event.key == 'leagueHome') {
      navigate(`/leagues/${props.leagueId}`);
    } else if (event.key == 'auction') {
      navigate(`/leagues/${props.leagueId}/auction`);
    }
  }

  return (
    <nav className='leaguenav'>
      <Menu mode='horizontal' onClick={handleLeagueNavClick} style={{ lineHeight: '48px', padding: '0 70px' }}>
        <Menu.Item key='leagueHome'>
          League Home
        </Menu.Item>
        <Menu.Item key='auction'>
          Auction
        </Menu.Item>
      </Menu>
    </nav>
  );
}

export default LeagueNav;