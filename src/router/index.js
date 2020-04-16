import Vue from 'vue'
import VueRouter from 'vue-router'
import Footer from '@/components/Footer'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    components: {
      default: () => import('@/views/home/index.vue'),
      footer: Footer
    }
  },
  {
    path: '/kind',
    name: 'kind',
    components: {
      default: () => import('@/views/kind/index.vue'),
      footer: Footer
    }
    // meta: {
    //   keepAlive: true
    // }
  },
  {
    path: '/cart',
    name: 'cart',
    components: {
      default: () => import('@/views/cart/index.vue'),
      footer: Footer // yad 觉得去掉不好,偷摸加回来 11.9 14:45
    }
  },
  {
    path: '/user',
    name: 'user',
    components: {
      default: () => import('@/views/user/index.vue'),
      footer: Footer
    }
  },
  {
    path: '/userinfo',
    name: 'userinfo',
    components: {
      default: () => import('@/views/userinfo/index.vue')
    }
  },
  {
    path: '/myaddress',
    name: 'myaddress',
    components: {
      default: () => import('@/views/myaddress/index.vue')
    }
  },
  {
    path: '/addaddress',
    name: 'addaddress',
    components: {
      default: () => import('@/views/addaddress/index.vue')
    }
  },
  {
    path: '/upadd',
    name: 'upadd',
    components: {
      default: () => import('@/views/updateaddress/index.vue')
    }
  },
  {
    path: '/vipcard',
    name: 'vipcard',
    components: {
      default: () => import('@/views/vipcard/index.vue')
    }
  },
  {
    path: '/login',
    name: 'login',
    components: {
      default: () => import('@/views/login/index.vue')
    }
  },
  {
    path: '/register',
    name: 'register',
    components: {
      default: () => import('@/views/register/index.vue')
    }
  },
  {
    path: '/orderlist',
    name: 'orderlist',
    components: {
      default: () => import('@/views/orderlist/index.vue')
    }
  },
  {
    path: '/coupons',
    name: 'coupons',
    components: {
      default: () => import('@/views/coupons/index.vue')
    }
  },
  {
    path: '/pro-list',
    name: 'pro-list',
    components: {
      default: () => import('@/views/pro-list/index.vue')
    }
  },
  {
    path: '/detail',
    name: 'detail',
    components: {
      default: () => import('@/views/detail/index.vue')
    }
  },
  {
    path: '/pay',
    name: 'pay',
    components: {
      default: () => import('@/views/pay/index.vue')
    }
  },
  {
    path: '/orderdetail',
    name: 'orderdetail',
    components: {
      default: () => import('@/views/orderdetail/index.vue')
    }
  },
  {
    path: '/orderProgress',
    name: 'orderProgress',
    components: {
      default: () => import('@/views/orderProgress/index.vue')
    }
  },
  {
    path: '/about',
    name: 'about',
    components: {
      default: () => import('@/views/about/index.vue')
    }
  },
  {
    path: '/comments',
    name: 'comments',
    components: {
      default: () => import('@/views/comments/index.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
