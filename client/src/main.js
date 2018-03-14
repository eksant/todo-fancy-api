import Vue from 'vue'
import App from './App'
import router from './router'
// import FBSdk from './fbsdk'
import '@/assets/css/bootstrap.css'
import '@/assets/font-awesome/css/font-awesome.css'
import '@/assets/css/style.css'

(function (d, s, id) {
  var js
  var fjs = d.getElementsByTagName(s)[0]
  if (d.getElementById(id)) return
  js = d.createElement(s); js.id = id
  js.src = 'https://connect.facebook.net/en_US/sdk.js'
  fjs.parentNode.insertBefore(js, fjs)
}(document, 'script', 'facebook-jssdk'))

window.fbAsyncInit = function () {
  window.FB.init({
    appId: '389643448127142',
    cookie: true,
    xfbml: true,
    version: 'v2.12'
  })
  // window.FB.init(options)
  Vue.FB = window.FB
}

Vue.config.productionTip = false
// Vue.use(FBSdk)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
