// sort-imports-ignore
import { createApp } from 'vue'

import ElementPlus from 'element-plus'

import App from './App.vue'
import router from './router'

import './assets/main.scss'

const app = createApp(App)

app.use(router).use(ElementPlus)

app.mount('#app')
