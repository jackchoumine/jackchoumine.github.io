/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-06-08 13:37:54
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-06-09 10:22:30
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// 引入全局样式
import '@/assets/reset.css'
import '@/assets/main.scss'

const app = createApp(App)

const globalAge = window.age
console.log('全局变量 age:', globalAge)
app.use(createPinia())
app.use(router)

app.mount('.demos-app-root')
