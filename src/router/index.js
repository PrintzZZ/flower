import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  { // 路由跟组件时映射关系
    path: '/home',
    name: 'home',
    // 路由的懒加载
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/kind',
    name: 'kind',
    component: () => import('@/views/kind/index.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/cart/index.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user/index.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
