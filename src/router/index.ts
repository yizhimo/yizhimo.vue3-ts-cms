import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
// import store from '@/store'

import localCache from '@/utils/cache'
// import { mapMenusToRoutes } from '@/utils/map-menus'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
    // children: [] -> 根据userMenus来动态渲染-> children
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'nat-found',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

// 判断登录是否过期
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }

    // console.log(router.getRoutes())
    // console.log(to) // route对象

    // // userMenus => routes(动态渲染)
    // const userMenus = (store.state as any).login.userMenus
    // const routes = mapMenusToRoutes(userMenus)

    // // 将routes => router.main.children
    // routes.forEach((route) => {
    //   router.addRoute('main', route)
    // })
  }
})

export default router
