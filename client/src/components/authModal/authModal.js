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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Pubsub.subscribe(NOTIF.AUTH_MODAL_SHOW, this, showModal);

    return (() => {
      Pubsub.unsubscribe(NOTIF.AUTH_MODAL_SHOW, this);
    });
  });

  const showModal = () => {
    setVisible(true);
  }

  const handleCancel = () => {
    setVisible(false);
    setLoading(false);
  }

  const toggleLoading = () => {
    setLoading(!loading);
  }

  return (
    <Modal
      title='Sign In'
      visible={visible}
      onCancel={handleCancel}
      style={{maxWidth: '348px'}}
      footer={null}
    >
      <WrappedSigninForm loading={loading} toggleLoading={toggleLoading} />
    </Modal>
  );
}

export default AuthModal;