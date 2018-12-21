import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { fetchSendCode, fetchSignUp } from '../../api'

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

  countDown = () => {
    let s = COUNT_DOWN
    this.countTimer = setInterval(() => {
      let codeText = `等待 (${s}s)`
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
      if (error) {
        if (error.phone) {
          Toast.info(error.phone.errors[0].message)
          return
        }
        if (error.password) {
          Toast.info(error.password.errors[0].message)
          return
        }
        if (error.code) {
          Toast.info(error.code.errors[0].message)
          return
        }
      } else {
        this.postData(value)
      }
    })
  }
  postData = data => {
    let userInfo = localStorage.getItem('wxUserInfo')
    if (userInfo) {
      let { appId, openId } = userInfo
      data = Object.assign(data, { appId, openId })
    }
    let postData = {
      mobile: parseInt(data.phone.split(' ').join('')),
      password: data.password,
      code: data.code,
      appId: data.appId || 'wx5f789dea59c6c2c5',
      openId: data.openId || 'oaYgpwAWb44JGI4rdW8NCEgEMnJ8'
    }
    fetchSignUp(postData).then(res => {
      let { status } = res.data
      if (status === 'ok') {
        this.setState({
          signUpLoading: false
        })
        Toast.success('注册成功，去登录', 1, () => {
          this.props.history.push('/signIn')
        })
      } else {
        Toast.info('注册失败，请稍候再试', 1)
      }
    })
  }
  postCode = () => {
    let { getFieldValue, getFieldError } = this.props.form
    let errMsg = getFieldError('phone')

    if (errMsg) {
      Toast.info(errMsg[0], 1)
      return false
    }

    if (this.countTimer) {
      return false
    } else {
      let phone = getFieldValue('phone')
      phone = phone.split(' ').join('')
      fetchSendCode(parseInt(phone)).then(res => {
        let { status } = res.data
        if (status === 1) {
          this.countDown()
          Toast.info('验证码发送成功', 1)
        } else {
          Toast.info('验证码发送失败，请稍候再试', 2)
        }
      })
    }
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
            {...getFieldProps('phone', {
              rules: [
                { required: true, message: '请输入手机号' },
                {
                  pattern: /1\d{2}\s*\d{4}\s*\d{4}$/,
                  message: '请输入正确的手机号'
                }
              ]
            })}
            type='phone'
            placeholder='186 1234 1234'
          >
            手机号
          </InputItem>

          <InputItem
            error={getFieldError('password') ? true : false}
            {...getFieldProps('password', {
              rules: [{ required: true, message: '请输入密码' }]
            })}
            type='password'
            placeholder='****'
          >
            密码
          </InputItem>
          <InputItem
            error={getFieldError('code') ? true : false}
            {...getFieldProps('code', {
              rules: [
                { required: true, message: '请输入验证码' },
                {
                  pattern: /\d+/,
                  message: '请输入正确的验证码'
                }
              ]
            })}
            placeholder='验证码'
            type='number'
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
