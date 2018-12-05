import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import {
  InputItem,
  WingBlank,
  WhiteSpace,
  Button,
  Flex,
  Toast
} from 'antd-mobile'
import { createForm } from 'rc-form'

//验证码间隔时间
const COUNT_DOWN = 20

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      codeText: '发送验证码',
      signUpLoading: false
    }
  }
  postCode = () => {
    if (this.countTimer) {
      return false
    } else {
      Toast.info('验证码发送成功', 1)
      this.countDown()
    }
  }
  countDown = () => {
    let s = COUNT_DOWN
    this.countTimer = setInterval(() => {
      let codeText = `重新发送 (${s}s)`
      if (s === 0) {
        clearInterval(this.countTimer)
        this.countTimer = null
        codeText = '发送验证码'
      }
      this.setState({
        codeText
      })
      s--
    }, 1000)
  }

  singUpHandler = () => {
    this.props.form.validateFields((error, value) => {
      if (!error) {
        this.setState({
          signUpLoading: true
        })

        this.postData(value)
      } else {
        Toast.info('请填写完整信息', 2)
      }
    })
  }
  postData = data => {
    setTimeout(() => {
      console.log(data)
      this.setState({
        signUpLoading: false
      })
      Toast.success('注册成功，去登录', 2, () => {
        this.props.history.push('/signIn')
      })
    }, 2000)
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form
    let { codeText } = this.state
    return (
      <WingBlank style={{ marginTop: '80px' }}>
        <Flex justify='center'>
          <h2>注册</h2>
        </Flex>
        <WhiteSpace size='xl' />
        <form>
          <InputItem
            error={getFieldError('phone') ? true : false}
            {...getFieldProps('phone', { rules: [{ required: true }] })}
            type='phone'
            placeholder='186 1234 1234'
          >
            手机号
          </InputItem>

          <InputItem
            error={getFieldError('password') ? true : false}
            {...getFieldProps('password', { rules: [{ required: true }] })}
            type='password'
            placeholder='****'
          >
            密码
          </InputItem>
          <InputItem
            error={getFieldError('code') ? true : false}
            {...getFieldProps('code', { rules: [{ required: true }] })}
            placeholder='验证码'
            extra={codeText}
            onExtraClick={this.postCode}
          />
        </form>
        <WhiteSpace size='xl' />
        <Button
          type='primary'
          loading={this.state.signUpLoading}
          onClick={this.singUpHandler}
        >
          注册
        </Button>
      </WingBlank>
    )
  }
}

export default withRouter(createForm()(SignUp))
