
export default [
  {
    path: '/',
    // name: 'HomePage',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/todo'), meta: { requiresAuth: true } },
      { path: 'login', component: () => import('pages/login') }
    ]
  },
  // {
  //   path: '/login',
  //   // name: 'LoginPage',
  //   component: () => import('layouts/login')
  // },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
