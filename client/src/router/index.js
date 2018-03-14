import Vue from 'vue'
import Router from 'vue-router'
import Todo from '@/components/Todo'
import Login from '@/components/Login'

Vue.use(Router)

// export default new Router({
const router = new Router({
  mode: 'history',
  routes: [
    {
      meta: { auth: true },
      path: '/',
      name: 'TodoComponent',
      component: Todo
    },
    {
      path: '/login',
      name: 'LoginComponent',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({ name: 'LoginComponent' })
    }
  } else {
    next()
  }
})

export default router
