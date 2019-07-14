import React, { useState, useEffect} from 'react';

import { Form, Icon, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';

function SigninForm(props) {

  const { getFieldDecorator } = props.form;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    console.log('form submitted');
  }

  return (
    <Form onSubmit={handleSubmit} className='login-form' style={{maxWidth: '300px'}}>
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Please input your username!'}],
        })(
          <Input 
            prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} 
            placeholder='username' 
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your password!'}],
        })(
          <Input 
            prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} 
            type='password'
            placeholder='password' 
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true,
        })(<Checkbox>Remember me</Checkbox>)}
        <a className='login-form-forgot' href='' style={{float: 'right'}}>
          Forgot password
        </a>
      </Form.Item>
    </Form>
  );
}

const WrappedSigninForm = Form.create({ name: 'signin_form' })(SigninForm);

export default WrappedSigninForm;