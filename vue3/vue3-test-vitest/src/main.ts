/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-02-19 17:36:55
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-03-24 18:33:42
 * @Description :
 */
// import './assets/main.css'

import { createApp, ref, readonly } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import { age_key } from './components/07-provide-inject/provide_keys'
// import './components/06-render/render'
const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

const age = ref(19)
const changeAge = () => {
  age.value = 100 * Math.random()
}

app.provide(age_key, {
  age: readonly(age),
  changeAge
})

setupWorker().then(() => {
  app.mount('#app')
})

async function setupWorker() {
  const { worker } = await import('../mocks/browser')
  return worker.start()
}
