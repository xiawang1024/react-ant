import axios from 'axios'

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
          setTimeout(() => {
            cancelFlag = false
          }, 1000)
        //路由跳转到登录页
      }
    }

    return Promise.reject(error)
  }
)
