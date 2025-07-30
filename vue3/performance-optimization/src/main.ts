/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-07-31 00:15:16
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-07-31 01:36:54
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import './assets/main.css'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

if (import.meta.env.DEV) {
  console.log('开发环境全量加载')
  import('element-plus/dist/index.css')
  import('element-plus').then(({ default: ElementPlus }) => {
    app.use(ElementPlus)
  })
}

app.mount('#app')
