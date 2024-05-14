/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-02-19 17:36:55
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-05-14 11:22:29
 * @Description :
 */
import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
const app = createApp(App)

import '../dist/css/index.css'
// @ts-ignore
import ESUI from '../dist'
app.use(ESUI)

// import '../components/Button/button.scss'
// // @ts-ignore
// import { JButton } from '../dist/es-ui'
// app.use(JButton)

// import '../components/Toggle/toggle.scss'
// // // @ts-ignore
// import { JToggle } from '../dist/es-ui'
// app.use(JToggle)

// import '../components/Button/button.scss'
// // @ts-ignore
// import { JButton } from '../dist/es-ui'
// app.use(JButton)

// import '../components/Toggle/toggle.scss'
// // // @ts-ignore
// import { JToggle, JButton } from '../dist'
// app.use(JToggle)
// app.use(JButton)

app.mount('#app')
