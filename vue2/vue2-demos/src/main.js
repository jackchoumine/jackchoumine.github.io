import Vue from 'vue'

import App from './App.vue'
import './assets/main.css'
import router from './router'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
