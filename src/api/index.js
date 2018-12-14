import axios from 'axios'
import { Toast } from 'antd-mobile'
import Qs from 'qs'

// axios.defaults.baseURL = `https://a.weixin.hndt.com/boom/openapi`
axios.defaults.headers.common['Authorization'] =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOlsidXNlcm5hbWUiLCIxODUzMDAzMDMwNSJdLCJleHAiOjE1NDQ3NTU3MzAsInVzZXJuYW1lIjoiMTg1MzAwMzAzMDUifQ.1-rupUs4SQgORir_KLKNtVH5MG3ccZ_DVd4kEpGStgU'

// window.localStorage.getItem(
//   'authToken'
// )

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
      let status = error.response.data.message
      console.log(typeof status)
      switch (status) {
        case '401':
          console.log('------------------------------------')
          console.log(11)
          console.log('------------------------------------')
          if (cancelFlag) return Promise.reject(error)
          cancelFlag = true
          localStorage.token = ''
          Toast.info('会话已过期，请重新登录', 2, () => {
            cancelFlag = false
            //路由跳转到登录页
            window.location = '#/signIn'
          })
          break
        // eslint-disable-next-line no-fallthrough
        default:
          Toast.info('系统异常，请稍后重试！')
      }
    }

    return Promise.reject(error)
  }
)
/**
 * 全局配置 qs.stringify
 */
// axios.defaults.transformRequest = [data => Qs.stringify(data)]
/**
 *登录
 * @param {*} mobile 手机号
 * @param {*} password 密码
 */
const fetchSignIn = ({ mobile, password }) =>
  axios.post(
    `/user/login`,
    Qs.stringify({
      mobile,
      password
    })
  )
/**
 * 验证码发送
 * @param {*} mobile 手机号
 */
const fetchSendCode = mobile =>
  axios.post(`/user/send/code`, Qs.stringify({ mobile }))
/**
 * 注册
 * @param {*} mobile 手机号
 * @param {*} password 密码
 * @param {*} code 验证码
 * @param {*} appId 公众号appId
 * @param {*} openId 公众号openId
 */
const fetchSignUp = ({ mobile, password, code, appId, openId }) =>
  axios.post(`/user/register`, { mobile, password, code, appId, openId })
/**
 * 验证码登录
 * @param {*} mobile 手机号
 * @param {*} code 验证码
 */
const fetchSignInByCode = (mobile, code) =>
  axios.post(`/user/code/login`, { mobile, code })
/**
 * 获取当前登录用户信息
 */
const fetchUserInfo = () => axios.get(`/user/current`)
/**
 * 热线提交
 * @param {*} title 热线标题
 * @param {*} content 热线具体内容
 * @param {*} area 地区
 * @param {*} occurTime 时间
 * @param {Array} attachments 图片
 */
const fetchPostForm = (title, content, area, occurTime, attachments) =>
  axios.post(`/clue/create`, { title, content, area, occurTime, attachments })
/**
 * 获取历史热线
 */
const fetchHotLineList = () => axios.get(`/clue/history`)

/**
 * upload image
 * @param {*} formData
 */
const fetchUploadImage = formData =>
  axios.post(`/clue/file/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

export {
  fetchSignIn,
  fetchSendCode,
  fetchSignUp,
  fetchSignInByCode,
  fetchUserInfo,
  fetchPostForm,
  fetchHotLineList,
  fetchUploadImage
}
