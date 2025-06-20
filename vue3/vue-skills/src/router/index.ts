/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-12-03 20:34:48
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-06-17 11:34:23
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

export const routes = [
  {
    path: '/',
    name: '异步组件',
    component: HomeView
  },
  {
    path: '/use-mitt',
    name: '事件总线',
    component: () => import('../views/UseMittPage.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/pinia',
    name: 'pinia',
    component: () => import('../views/PiniaPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
