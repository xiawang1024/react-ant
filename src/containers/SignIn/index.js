import React, { Component } from 'react'

import {
  InputItem,
  WingBlank,
  WhiteSpace,
  Button,
  Flex,
  Toast
} from 'antd-mobile'
import { createForm } from 'rc-form'

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  signInHandler = () => {
    this.props.form.validateFields((error, value) => {
      if (!error) {
        this.setState({
          signUpLoading: true
        })

        this.postData(value)
      } else {
        Toast.info('请填写账号和密码', 2)
      }
    })
  }
  postData = data => {
    setTimeout(() => {
      console.log(data)
      this.setState({
        signUpLoading: false
      })
      Toast.success('登录成功', 2, () => {
        console.log('准备跳转到报料')
      })
    }, 2000)
  }
  toSignUpHandler = () => {
    console.log('signUp')
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
        <Button type='primary' onClick={this.signInHandler}>
          登录
        </Button>
        <div
          style={{
            marginTop: '50px',
            width: '100%',
            height: '1px',
            background: '#ccc'
          }}
        />
        <WhiteSpace size='xl' />
        <Button type='primary' onClick={this.toSignUpHandler}>
          注册
        </Button>
      </WingBlank>
    )
  }
}

export default createForm()(SignIn)
