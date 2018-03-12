import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

const Router = new VueRouter({
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({ y: 0 }),
  routes
})

Router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({ path: '/login' })
      // next()
    }
  } else {
    next()
  }
})

export default Router
