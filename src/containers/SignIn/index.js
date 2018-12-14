import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as signInActions from '../../store/actions/signIn'
import { fetchSignIn } from '../../api'

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
    this.state = {
      signInLoading: false
    }
  }
  checkPhone() {
    var phone = document.getElementById('phone').value
    if (!/^1(3|4|5|7|8)\d{9}$/.test(phone)) {
      return false
    } else {
      return true
    }
  }
  signInHandler = () => {
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
      } else {
        this.postData(value)
      }
    })
  }
  postData = data => {
    let { signInActions } = this.props
    let postData = {
      mobile: parseInt(data.phone.split(' ').join('')),
      password: data.password
    }

    fetchSignIn(postData).then(res => {
      let { status, data } = res.data
      if (status === 'ok') {
        this.setState({
          signInLoading: false
        })
        let token = `Bearer ${data}`
        signInActions.login({ authToken: token })
        Toast.success('登录成功', 2, () => {
          localStorage.setItem('authToken', token)
          console.log('准备跳转到报料')
          this.props.history.push('/home')
        })
      } else {
        Toast.info('账号密码错误！', 2)
      }
    })
  }
  toSignUpHandler = () => {
    this.props.history.push('/signUp')
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
        </form>
        <WhiteSpace size='xl' />
        <Button
          type='primary'
          loading={this.state.signInLoading}
          onClick={this.signInHandler}
        >
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

const mapStateToProps = state => {
  return {
    signIn: state.signIn
  }
}

const mapDispatchToProps = dispatch => {
  return { signInActions: bindActionCreators(signInActions, dispatch) }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(createForm()(SignIn))
)
