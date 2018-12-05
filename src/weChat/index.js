import { WeChatConf } from './util'

const weChatConf = new WeChatConf()

function isWeixinBrowser() {
  var agent = navigator.userAgent.toLowerCase()
  if (agent.match(/MicroMessenger/i) == 'micromessenger') {
    return true
  } else {
    return false
  }
}

if (isWeixinBrowser()) {
  weChatConf.init()
}
