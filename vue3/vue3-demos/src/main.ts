import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 引入全局样式
import '@/assets/reset.css'
import '@/assets/main.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('.demos-app-root')
