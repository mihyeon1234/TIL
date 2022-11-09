import Vue from 'vue'
import VueRouter from 'vue-router'
import FirstView from '@/views/FirstView'
import SecondView from '@/views/SecondView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/first',
    name: 'FirstView',
    component: FirstView
  },
  {
    path: '/second',
    name: 'SecondView',
    component:SecondView
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
