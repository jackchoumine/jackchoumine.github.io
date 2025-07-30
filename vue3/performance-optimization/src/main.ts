import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import './assets/main.css'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router).use(ElementPlus)

app.mount('#app')
