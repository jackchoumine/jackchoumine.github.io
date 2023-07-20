import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import MyButton2 from './components/MyButton2.jsx'
const VueApp = createApp(App)
VueApp.component('MyButton2', MyButton2)
VueApp.mount('#app')
