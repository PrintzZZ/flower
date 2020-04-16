/* eslint-disable no-undef */
import Vue from 'vue'
import { Toast } from 'vant'

Vue.use(Toast)

document.addEventListener('plusready', function () {
  var webview = plus.webview.currentWebview()
  var first = null
  plus.key.addEventListener('backbutton', function () {
    webview.canBack(function (e) {
      if (e.canBack) {
        webview.back(-1)
      } else {
        // 首页返回键处理
        // 处理逻辑：3秒内，连续两次按返回键，则退出应用；

        // 首次按键，提示‘再按一次退出应用’
        if (new Date().getTime() - first < 3000) {
          // console.log("关闭程序")
          plus.runtime.quit()
        } else {
          // 自定义的弹窗 （引入的vant.js 的toast）

          Toast({
            message: '再按一次退出应用',
            position: 'bottom'
          })
          first = new Date().getTime()
        }
      }
    })
  })
})
