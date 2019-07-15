import React, { useState, useEffect } from 'react';

import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';

import { AUTH_FORM_TYPE, NOTIF } from '../../utilities/constants';
import Pubsub from '../../utilities/pubsub';
import WrappedSigninForm from '../signinForm/signinForm';
import WrappedSignupForm from '../signupForm/signupForm';

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
  const [formType, setFormType] = useState(AUTH_FORM_TYPE.SIGN_IN);

  useEffect(() => {
    Pubsub.subscribe(NOTIF.AUTH_MODAL_SHOW, this, showModal);

    return (() => {
      Pubsub.unsubscribe(NOTIF.AUTH_MODAL_SHOW, this);
    });
  }, []);

  const showModal = () => {
    setVisible(true);
  }

  const handleFormToggle = (type) => {
    setFormType(type);
  }

  const handleCancel = () => {
    setVisible(false);
    setLoading(false);
  }

  const toggleLoading = () => {
    setLoading(!loading);
  }

  const generateForm = () => {
    if (formType === AUTH_FORM_TYPE.SIGN_IN) {
      return (
        <WrappedSigninForm loading={loading} toggleLoading={toggleLoading} toggleAuthForm={handleFormToggle} />
      );
    } else if (formType === AUTH_FORM_TYPE.SIGN_UP) {
      return (
        <WrappedSignupForm loading={loading} toggleLoading={toggleLoading} toggleAuthForm={handleFormToggle} />
      );
    }
  }

  return (
    <Modal
      title={formType}
      visible={visible}
      onCancel={handleCancel}
      style={{maxWidth: '348px'}}
      footer={null}
    >
      {generateForm()}
    </Modal>
  );
}

export default AuthModal;