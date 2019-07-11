import React, { useState } from 'react';

import {
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  FormInput,
  Button
} from 'shards-react';
import { AUTH_MODAL_TYPE } from '../../utilities/constants';

function AuthModal(props) {
  /* props = {
    open: Boolean - whether or not the modal should be displayed
    toggle: Function to update props.open
    close: Function to set props.open to false
    label: String - either 'Sign In' or 'Create an Account'
    type: String - either 'signin' or 'signup'
  } */

  const [emailVal, setEmailVal] = useState('');

  const handleEmailChange = (event) => {
    console.log(event.target.value);
    setEmailVal(event.target.value);
  }

  const generateForm = () => {
    if (props.type === AUTH_MODAL_TYPE.signin) {
      return (
        <Form>
          <FormGroup>
            <label htmlFor='#email'>Email Address</label>
            <FormInput type='email' id='#email' placeholder='Email' value={emailVal} onChange={handleEmailChange} />
          </FormGroup>
          <FormGroup>
            <label htmlFor='#password'>Password</label>
            <FormInput type='password' id='#password' placeholder='Password' />
          </FormGroup>
        </Form>
      );
    } else if (props.type === AUTH_MODAL_TYPE.signup) {
      return (
        <Form>
          <FormGroup>
            <label htmlFor='#username'>Username</label>
            <FormInput type='text' id='#username' placeholder='Username' />
          </FormGroup>
          <FormGroup>
            <label htmlFor='#email'>Email Address</label>
            <FormInput type='email' id='#email' placeholder='Email' />
          </FormGroup>
          <FormGroup>
            <label htmlFor='#password'>Password</label>
            <FormInput type='password' id='#password' placeholder='Password' />
          </FormGroup>
          <FormGroup>
            <label htmlFor='#confirmPassword'>Confirm Password</label>
            <FormInput type='password' id='#confirmPassword' placeholder='Password' />
          </FormGroup>
        </Form>
      );
    }
  }

  return (
    <Modal open={props.open} toggle={props.toggle}>
      <ModalHeader toggle={props.close}>
        {props.label}
      </ModalHeader>
      <ModalBody>
        {generateForm()}
        <Button theme='primary'>Submit</Button>
      </ModalBody>
    </Modal>
  );
}

export default AuthModal;