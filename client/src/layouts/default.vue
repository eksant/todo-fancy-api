<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary" glossy>
        <q-icon name="fas fa-check-square fa-2x" />

        <q-toolbar-title>
          Todo Fancy
          <div slot="subtitle">Hacktiv8 Platinum Fox</div>
        </q-toolbar-title>

        <div
          class="fb-login-button"
          data-max-rows="1"
          data-size="large"
          data-button-type="login_with"
          data-show-faces="false"
          data-auto-logout-link="true"
          data-use-continue-as="false"
          onlogin="checkLoginState()"
          scope="public_profile,email,"
          @click="checkLoginState()">
        </div>

        <q-btn glossy label="Login" color="tertiary" icon="fab fa-facebook-square" @click="loginFB()" v-if="!token" />
        <q-btn glossy label="Logout" color="negative" icon="fab fa-facebook-square" @click="logout" v-else />
        <q-btn flat icon="fas fa-info" @click="rightDrawer = !rightDrawer"/>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer v-model="rightDrawer" side="right" content-class="bg-grey-2">
      <q-list no-border link inset-delimiter>
        <q-item @click.native="openURL('https://github.com/eksant/todo-fancy-api')">
          <q-item-side icon="fab fa-github-square" />
          <q-item-main label="GitHub" sublabel="github.com/eksant/todo-fancy-api" />
        </q-item>
        <q-item @click.native="openURL('mailto:eksant@gmail.com')">
          <q-item-side icon="fas fa-at" />
          <q-item-main label="Eksa" sublabel="eksant@gmail.com" />
        </q-item>
        <q-list-header>&copy; 2018 Todo Fancy</q-list-header>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0]
  if (d.getElementById(id)) return
  js = d.createElement(s)
  js.id = id
  js.src = 'https://connect.facebook.net/en_US/sdk.js'
  fjs.parentNode.insertBefore(js, fjs)
})(document, 'script', 'facebook-jssdk')

import { openURL } from 'quasar'
let url = 'http://localhost:3000/api/users/login-fb'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      rightDrawer: false,
      statusLogin: false,
      token: localStorage.getItem('token') || null
    }
  },
  methods: {
    openURL,
    loginFB () {
      this.login(e => {
        console.log('loginFB ', e)
        this.getProfile()
      })
      // window.FB.login(function (response) {
      //   console.log('Response FB login')
      // }, {
      //   scope: 'name, email, picture, public_profile'
      // })
    },
    login (callback) {
      window.FB.login(response => {
        console.log('FB.login ', response)
        if (response.authResponse) {
          console.log('Login Facebook connect ', response)
          localStorage.setItem('fbtoken', response.authResponse.accessToken)
          callback(response)
        } else {
          console.log(response, 'Unknow Facebook connect')
        }
      }, {
        scope: 'name, email, picture, public_profile'
        // return_scopes: true
      })
    },
    logout () {
      window.FB.logout(e => {
        console.log(e)
        localStorage.clear()
        window.location = '/'
      })
    },
    getProfile () {
      this.$axios.get(`${url}`, {
        headers: { fbtoken: localStorage.getItem('fbtoken') }
      }).then(data => {
        console.log('Data Masuk ', data)
      }).catch(err => {
        console.error(err)
      })
    },
    checkLoginState: function () {
      let localthis = this
      window.FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
          // console.log('dfsf')
          localStorage.accessToken = response.authResponse.accessToken
          localthis.token = response.authResponse.accessToken
          localStorage.userId = response.authResponse.userID
          this.$axios({
            method: 'post',
            url: `${url}`,
            data: {
              userId: response.authResponse.userID,
              accessToken: response.authResponse.accessToken
            }
          }).then(function (resp) {
            // console.log(resp);
            localthis.$emit('token', resp.data.token)
            localthis.$emit('email', resp.data.data.email)
          }).catch(function (error) {
            console.log(error)
          })
        } else if (response.status === 'not_authorized' || response.status === 'unknown') {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('UserId')
          localthis.token = null
          // localthis.$emit('token', null)
          // localthis.$emit('email', null)
        }
      })
    }
  },
  created () {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '389643448127142',
        cookie: true,
        status: true,
        xfbml: true,
        version: 'v2.12'
      })
      // window.checkLoginState = this.checkLoginState
      // this.token = localStorage.getItem('accessToken')

      // window.FB.AppEvents.logPageView()
      // window.FB.getLoginStatus(response => {
      //   if (response.status === 'connected') {
      //     console.log('FB getLoginStatus', response)
      //     localStorage.setItem('fbtoken', response.authResponse.accessToken)
      //   }
      // })
    }
    // this.statusLogin = window.FB.getLoginStatus()
  }
}
</script>

<style>
</style>
