import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Wrapper from '@/containers/Wrapper.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Client Orders',
    component: Wrapper
  },
  {
    path: '/documentation',
    name: 'Documentation',
    component: () => import(/* webpackChunkName: "about" */ '@/containers/Documentation.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
