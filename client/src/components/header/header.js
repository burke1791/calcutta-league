import React, { useState } from 'react';

import AuthModal from '../authModal/authModal';

import Menu from 'antd/es/menu';
import 'antd/es/menu/style/css';
import Button from 'antd/es/button';
import 'antd/es/button/style/css';


import { AUTH_MODAL_TYPE, NOTIF } from '../../utilities/constants';
import Pubsub from '../../utilities/pubsub';

function Header() {

  const generateAuthMenu = () => {
    return (
      <Menu.Item key='signin' style={{float: 'right'}}>
        Sign In
      </Menu.Item>
    );
  }

  const handleMenuItemClicked = (event) => {
    console.log(event);
    if (event.key === 'signin') {
      Pubsub.publish(NOTIF.AUTH_MODAL_SHOW, null);
    }
  }

  return (
    <nav className='topnav'>
      <Menu mode='horizontal' selectable={false} onClick={handleMenuItemClicked}>
        <Menu.Item key='brand'>
          Calcutta
        </Menu.Item>
        {generateAuthMenu()}
      </Menu>
      <AuthModal />
    </nav>
  );
}

export default Header;