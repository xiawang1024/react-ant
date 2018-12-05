import React, { Component } from 'react'

import { InputItem, WingBlank, WhiteSpace, Button, Flex } from 'antd-mobile'
import { createForm } from 'rc-form'

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { getFieldProps, getFieldError } = this.props.form
    return (
      <WingBlank style={{ marginTop: '80px' }}>
        <Flex justify='center'>
          <h2>登录</h2>
        </Flex>
        <WhiteSpace size='xl' />
        <form>
          <InputItem
            error={getFieldError('phone') ? true : false}
            {...getFieldProps('phone', { rules: [{ required: true }] })}
            type='phone'
            placeholder='186 1234 1234'
          >
            手机号码
          </InputItem>

          <InputItem
            error={getFieldError('password') ? true : false}
            {...getFieldProps('password', { rules: [{ required: true }] })}
            type='password'
            placeholder='****'
          >
            密码
          </InputItem>
        </form>
        <WhiteSpace size='xl' />
        <Button type='primary'>登录</Button>
        <div
          style={{
            marginTop: '50px',
            width: '100%',
            height: '1px',
            background: '#ccc'
          }}
        />
        <WhiteSpace size='xl' />
        <Button type='primary'>注册</Button>
      </WingBlank>
    )
  }
}

export default createForm()(SignIn)
