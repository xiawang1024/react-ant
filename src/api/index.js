import axios from 'axios'
import { Toast } from 'antd-mobile'

//拦截器
axios.interceptors.request.use(
  config => {
    let token = window.localStorage.token
    if (token) {
      config.headers.Authorization = `token ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
let cancelFlag = false
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      // eslint-disable-next-line default-case
      switch (error.response.status) {
        case 401:
          if (cancelFlag) return Promise.reject(error)
          cancelFlag = true
          localStorage.token = ''
          Toast.info('会话已过期，请重新登录', 1, () => {
            cancelFlag = false
            //路由跳转到登录页
          })
        // eslint-disable-next-line no-fallthrough
        default:
          Toast.error('系统异常，请稍后重试！')
      }
    }

    return Promise.reject(error)
  }
)
