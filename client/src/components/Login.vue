<template>
  <div>
    <div id=container>
      Make
      <div id=flip>
        <div><div>wOrK</div></div>
        <div><div>lifeStyle</div></div>
        <div><div>EverytHing</div></div>
      </div>
      With ToDo-Fancy!

      <div>
        <button class="btn btn-primary" :id="btnLogin" @click="getStatusFB()" type="button"><i class="fa fa-facebook-official"></i> {{btnLogin}}</button>
        <!-- <div class="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false"></div> -->
      </div>
    </div>
    <p class="text-center"><a href="https://github.com/eksant/todo-fancy-api" target="_blank">https://github.com/eksant/todo-fancy-api</a></p>
  </div>
</template>

<script>
import axios from 'axios'
let url = 'http://localhost:3000/api/users'

export default {
  data () {
    return {
      btnLogin: 'Login With Facebook',
      token: localStorage.getItem('token') || null
    }
  },
  methods: {
    getStatusFB () {
      this.loginFB(e => {
        this.getProfileFB()
      })
    },
    loginFB (callback) {
      window.FB.login(function (response) {
        if (response.authResponse) {
          localStorage.setItem('fbtoken', response.authResponse.accessToken)
          callback(response)
        } else {
          console.log('Unknow connected facebook')
        }
      }, { scope: 'email,public_profile' })
    },
    getProfileFB () {
      console.log('fbtoken : ', localStorage.getItem('fbtoken'))
      axios.get(`${url}/login-fb`, {
        headers: {
          fbtoken: localStorage.getItem('fbtoken')
        }
      }).then(response => {
        // console.log('data : ', response.data)
        this.token = response.data.apptoken
        localStorage.setItem('token', response.data.apptoken)
        localStorage.setItem('name', response.data.name)
        localStorage.setItem('email', response.data.email)
        localStorage.setItem('profileUrl', response.data.profileUrl)
        // this.$router.push({ path: '/' })
        // this.$router.push({ name: 'TodoComponent' })
        window.location.href = '/'
      }).catch(err => console.error(err))
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:700');

#text-center {
  text-align:center;
}
#container {
  margin:0px;
  font-family:'Roboto';
  text-align:center;
  color:#999;
  text-transform: uppercase;
  font-size:36px;
  font-weight:bold;
  padding-top:200px;
  position:fixed;
  width:100%;
  bottom:45%;
  display:block;
}
#flip {
  height:50px;
  overflow:hidden;
}
#flip > div > div {
  color:#fff;
  padding:4px 12px;
  height:45px;
  margin-bottom:45px;
  display:inline-block;
}
#flip div:first-child {
  animation: show 5s linear infinite;
}
#flip div div {
  background:#42c58a;
}
#flip div:first-child div {
  background:#4ec7f3;
}
#flip div:last-child div {
  background:#DC143C;
}
@keyframes show {
  0% {margin-top:-270px;}
  5% {margin-top:-180px;}
  33% {margin-top:-180px;}
  38% {margin-top:-90px;}
  66% {margin-top:-90px;}
  71% {margin-top:0px;}
  99.99% {margin-top:0px;}
  100% {margin-top:-270px;}
}
p {
  position:fixed;
  width:100%;
  bottom:30px;
  font-size:12px;
  color:#999;
  margin-top:200px;
}
</style>
