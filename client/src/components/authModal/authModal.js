import React, { useState, useEffect } from 'react';

import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';

import { AUTH_MODAL_TYPE, NOTIF } from '../../utilities/constants';
import Pubsub from '../../utilities/pubsub';
import WrappedSigninForm from '../signinForm/signinForm';

function AuthModal(props) {
  /* props = {
    open: Boolean - whether or not the modal should be displayed
    toggle: Function to update props.open
    close: Function to set props.open to false
    label: String - either 'Sign In' or 'Create an Account'
    type: String - either 'signin' or 'signup'
  } */

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    Pubsub.subscribe(NOTIF.AUTH_MODAL_SHOW, this, showModal);

    return (() => {
      Pubsub.unsubscribe(NOTIF.AUTH_MODAL_SHOW, this);
    });
  });

  const showModal = () => {
    setVisible(true);
  }

  const handleOk = () => {
    setConfirmLoading(true);
  }

  const handleCancel = () => {
    setVisible(false);
    setConfirmLoading(false);
  }
  
  const toCreateAccount = () => {
    console.log('switch to create account form');
  }

  return (
    <Modal
      title='Sign In'
      visible={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      style={{maxWidth: '348px'}}
      footer={[
        <Button key='createAccount' type='link' onClick={toCreateAccount} style={{float: 'left'}}>Create an Account</Button>,
        <Button key='signinBtn' type='primary' loading={confirmLoading} onClick={handleOk}>Sign In</Button>
      ]}
    >
      <WrappedSigninForm />
    </Modal>
  );
}

export default AuthModal;