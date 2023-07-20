/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-06-25 15:30:36
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-20 14:43:04
 * @Description :
 */
import Vue from 'vue'
import App from './App.vue'

// 开发期间
// 按需引入
// import '../components/Button/button.scss'
// import '../components/Toggle/toggle.scss'
// import '../components/Tabs/tabs.scss'
// import { JButton, JToggle } from '../components'
// Vue.use(JButton).use(JToggle) //.use(JTabs)
// 全局引入
import '../components/index.scss'
import jackUI from '../components'
Vue.use(jackUI)

// 打包后
// 全局引入
// import '../dist/css/index.css'
// import jackUI from '../dist'
// Vue.use(jackUI)

// 按需引入
// import '../dist/css/button.css'
// import { JButton } from '../dist'
// Vue.use(JButton)
// import '../dist/css/toggle.css'
// import { JToggle } from '../dist'
// Vue.use(JToggle)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
