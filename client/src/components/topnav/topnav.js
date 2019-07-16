import React, { useState, useEffect } from 'react';

import AuthModal from '../authModal/authModal';

import { Menu, Button, Icon } from 'antd';
import 'antd/dist/antd.css';

import { AUTH_MODAL_TYPE, NOTIF } from '../../utilities/constants';
import Pubsub from '../../utilities/pubsub';
import AuthService from '../../firebase/authService';

const { SubMenu } = Menu;

function Topnav() {

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    Pubsub.subscribe(NOTIF.SIGN_IN, this, handleSignin);
    Pubsub.subscribe(NOTIF.SIGN_OUT, this, handleSignout);

    return (() => {
      Pubsub.unsubscribe(NOTIF.SIGN_IN, this);
      Pubsub.unsubscribe(NOTIF.SIGN_OUT, this);
    });
  }, []);

  const handleSignin = () => {
    setAuthenticated(true);
  }

  const handleSignout = () => {
    setAuthenticated(false);
  }

  const generateAuthMenu = () => {
    if (authenticated) {
      return (
        <SubMenu
          title={
            <span className="submenu-title-wrapper">
              <Icon type="setting" />
              My Account
            </span>
          }
          style={{ float: 'right' }}
        >
          <Menu.Item key='signout' style={{textAlign: 'center'}}  >
            <Button 
              type='danger' 
              onClick={() => AuthService.signout()}
            >
              Sign Out
            </Button>
          </Menu.Item>
        </SubMenu>
      );
    } else {
      return (
        <Menu.Item key='signin' style={{ float: 'right' }}>
          Sign In
        </Menu.Item>
      );
    }
  }

  const handleMenuItemClicked = (event) => {
    console.log(event);
    if (event.key === 'signin') {
      Pubsub.publish(NOTIF.AUTH_MODAL_SHOW, null);
    }
  }

  return (
    <nav className='topnav'>
      <Menu theme='dark' mode='horizontal' selectable={false} onClick={handleMenuItemClicked} style={{ lineHeight: '64px' }}>
        <Menu.Item key='brand' style={{ fontSize: '32px' }}>
          <span  >Calcutta</span>
        </Menu.Item>
        {generateAuthMenu()}
      </Menu>
      <AuthModal />
    </nav>
  );
}

export default Topnav;