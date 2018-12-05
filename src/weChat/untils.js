import wx from 'weixin-js-sdk'
import axios from 'axios'
import Qs from 'qs'
import { appId, shareLink, shareTitle, shareDesc, shareImg } from './config'

const SHARE_URL = 'https://a.weixin.hndt.com/boom/at/sign'
const CODE_URL = 'https://a.weixin.hndt.com/boom/wx/access/subscribe'

class WeChat {
  constructor() {
    this.baseUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?'
    this.appId = appId
    this.redirect_uri = shareLink
    this.response_type = 'code'
    this.scope = 'snsapi_userinfo' //snsapi_base 只获取openId ， snsapi_userinfo 获取用户信息;
    this.state = Date.parse(new Date())
    this.weChat_Redirect = '#wechat_redirect'
  }
  getQueryString(name) {
    var url = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var newUrl = window.location.search.substr(1).match(url)
    if (newUrl != null) {
      return unescape(newUrl[2])
    } else {
      return false
    }
  }
  redirectUrl() {
    let url =
      this.baseUrl +
      'appid=' +
      this.appId +
      '&redirect_uri=' +
      encodeURIComponent(this.redirect_uri) +
      '&response_type=' +
      this.response_type +
      '&scope=' +
      this.scope +
      '&state=' +
      this.state +
      this.weChat_Redirect
    window.location = url
  }
  hasCode() {
    if (!this.getQueryString('code')) {
      this.redirectUrl()
    } else {
      this.getOpenId()
    }
  }
  getOpenId() {
    axios({
      method: 'post',
      url: CODE_URL,
      data: Qs.stringify({
        code: this.getQueryString('code'),
        state: this.appId,
        subscribe: false
      })
    })
      .then(res => {
        let data = res.data
        if (data.status == 'ok') {
          this.setStorage('WXHNDTOPENID', JSON.stringify(data.data))
        } else {
          this.redirectUrl()
        }
      })
      .catch(() => {
        this.redirectUrl()
      })
  }
  getStorage(name) {
    return localStorage.getItem(name)
  }
  setStorage(name, value) {
    return localStorage.setItem(name, value)
  }
}

class WeChatConf extends WeChat {
  constructor(props) {
    super(props)
  }
  init() {
    this.hasCode()
    this.initShare()
  }
  initShare() {
    axios
      .post(SHARE_URL, Qs.stringify({ url: window.location.href }))
      .then(res => {
        let data = res.data
        wx.config({
          debug: false,
          appId: data.appId,
          timestamp: data.timestamp,
          nonceStr: data.nonceStr,
          signature: data.signature,
          jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'chooseImage',
            'uploadImage',
            'previewImage',
            'startRecord',
            'playVoice',
            'stopRecord',
            'downloadVoice',
            'uploadVoice',
            'stopVoice',
            'openLocation'
          ]
        })
        wx.ready(() => {
          wx.onMenuShareTimeline({
            title: shareTitle,
            link: shareLink,
            imgUrl: shareImg,
            success: function() {},
            cancel: function() {}
          })
          wx.onMenuShareAppMessage({
            title: shareTitle,
            link: shareLink,
            imgUrl: shareImg,
            desc: shareDesc,
            type: '',
            dataUrl: '',
            success: function() {},
            cancel: function() {}
          })
        })
      })
  }
}
export { WeChat, WeChatConf }
